// Neural Dance mural runtime (studio-tracker #794).
// Closed loop: band onsets + a sticker map → this pulse network → a projector.
// Kick / bass / snare-mid / hi-hat-treble are dancer types 0..3.
// The page supplies the mic spectrum (or calls nd_hit from another detector)
// and sticker positions. Preferred install is an iPhone driving a projector:
// room mic in, UV-camera sticker map in, projection out. The traced points
// stand in for that UV map. A phone camera is not the sticker sensor.
// Drawing and projector corner-pin stay outside this module.

constexpr int MAX_DANCERS = 48;
constexpr int MAX_PULSES = 48;
constexpr int MAX_TRAIL = 10;
constexpr int MAX_BINS = 2048;
constexpr int HIST = 15;
constexpr int WARMUP = 6;
constexpr float LINK_R = 82.f;
constexpr float RATES[4] = {1.f, 0.5f, 1.5f, 2.f};
constexpr int PULSE_STRIDE = 28;

struct Dancer {
  int id;
  float x, y;
  int k;
  float phase;
  float a;
  float rest;
  float peak;
  float ref;
};

struct Pulse {
  int a;
  int b;
  int k;
  float age;
  float duration;
  int trail_len;
  float trail_x[MAX_TRAIL];
  float trail_y[MAX_TRAIL];
};

struct Band {
  float lo, hi;
  float ratio;
  float min_flux;
  float refractory_ms;
  float hist[HIST];
  int hist_n;
  int hist_i;
  double last_ms;
  int samples;
  float level;
};

static const float BAND_LO[4] = {40.f, 120.f, 300.f, 5000.f};
static const float BAND_HI[4] = {120.f, 300.f, 2500.f, 14000.f};
static const float BAND_RATIO[4] = {1.8f, 1.75f, 1.6f, 1.5f};
static const float BAND_MIN[4] = {10.f, 9.f, 8.f, 8.f};
static const float BAND_REF[4] = {150.f, 160.f, 110.f, 90.f};

static Dancer dancers[MAX_DANCERS];
static Pulse pulses[MAX_PULSES];
static int count = 0;
static int pulse_count = 0;
static int next_id = 1;
static float bpm = 120.f;
static float sim_time = 0.f;
static int low_power = 0;
static int was_listening = 0;
static int pending_hits = 0;
static int clock_on = 1;
static float sticker_in[MAX_DANCERS * 4];

static int queue[MAX_DANCERS];
static int qn = 0;
static unsigned char emitted[MAX_DANCERS];
static float received[MAX_DANCERS];
static int tone_mask = 0;

static unsigned char spectrum[MAX_BINS];
static unsigned char prev_spec[MAX_BINS];
static int prev_bins = 0;
static Band bands[4];
static int bands_ready = 0;

static float dancer_view[MAX_DANCERS * 6];
static float pulse_view[MAX_PULSES * PULSE_STRIDE];
static float levels[4];

extern "C" void* memcpy(void* dst, const void* src, unsigned long n) {
  unsigned char* d = (unsigned char*)dst;
  const unsigned char* s = (const unsigned char*)src;
  for (unsigned long i = 0; i < n; i++) d[i] = s[i];
  return dst;
}

extern "C" void* memset(void* dst, int c, unsigned long n) {
  unsigned char* d = (unsigned char*)dst;
  for (unsigned long i = 0; i < n; i++) d[i] = (unsigned char)c;
  return dst;
}

static float clampf(float v, float lo, float hi) {
  if (v < lo) return lo;
  if (v > hi) return hi;
  return v;
}

static float nd_sin(float x) {
  const float pi = 3.14159265358979323846f;
  const float tau = 6.28318530717958647692f;
  float turns = x / tau;
  float n = (float)(int)(turns >= 0.f ? turns + 0.5f : turns - 0.5f);
  float y = x - n * tau;
  if (y > pi) y -= tau;
  if (y < -pi) y += tau;
  float y2 = y * y;
  return y * (1.f + y2 * (-0.1666666716f + y2 * (0.008333333768f + y2 * (-0.0001984127011f + y2 * 0.000002755731429f))));
}

static void path_point(float ax, float ay, float bx, float by, float t, float* ox, float* oy) {
  float dx = bx - ax;
  float dy = by - ay;
  float amp = dx < 0.f ? -dx : dx;
  amp *= 0.15f;
  if (amp > 18.f) amp = 18.f;
  *ox = ax + dx * t;
  *oy = ay + dy * t - nd_sin(3.14159265358979323846f * t) * amp;
}

static void setup_bands() {
  if (bands_ready) return;
  bands_ready = 1;
  for (int i = 0; i < 4; i++) {
    bands[i].lo = BAND_LO[i];
    bands[i].hi = BAND_HI[i];
    bands[i].ratio = BAND_RATIO[i];
    bands[i].min_flux = BAND_MIN[i];
    bands[i].refractory_ms = BAND_REF[i];
    bands[i].hist_n = 0;
    bands[i].hist_i = 0;
    bands[i].last_ms = -1.0e300;
    bands[i].samples = 0;
    bands[i].level = 0.f;
    for (int h = 0; h < HIST; h++) bands[i].hist[h] = 0.f;
  }
}

static void reset_onsets() {
  setup_bands();
  prev_bins = 0;
  for (int i = 0; i < 4; i++) {
    bands[i].hist_n = 0;
    bands[i].hist_i = 0;
    bands[i].last_ms = -1.0e300;
    bands[i].samples = 0;
    bands[i].level = 0.f;
    for (int h = 0; h < HIST; h++) bands[i].hist[h] = 0.f;
  }
}

static int iceil(float x) {
  int i = (int)x;
  if (x > 0.f && (float)i < x) i++;
  return i;
}

// Half-open [lo, hi) in FFT bins. Returns 0 when the band is above Nyquist.
static int band_range(int band, float sample_rate, int fft_size, int bin_count, int* i0, int* i1) {
  if (band < 0 || band > 3 || !(sample_rate > 0.f) || fft_size <= 0 || bin_count < 2) return 0;
  float hz = sample_rate / (float)fft_size;
  int a = iceil(bands[band].lo / hz - 1.0e-4f);
  int b = iceil(bands[band].hi / hz - 1.0e-4f) - 1;
  if (a < 1) a = 1;
  if (b > bin_count - 1) b = bin_count - 1;
  if (b < a) return 0;
  *i0 = a;
  *i1 = b;
  return 1;
}

static float median_of(float* tmp, int n) {
  for (int i = 1; i < n; i++) {
    float v = tmp[i];
    int j = i - 1;
    while (j >= 0 && tmp[j] > v) {
      tmp[j + 1] = tmp[j];
      j--;
    }
    tmp[j + 1] = v;
  }
  int mid = n >> 1;
  if (n & 1) return tmp[mid];
  return (tmp[mid - 1] + tmp[mid]) * 0.5f;
}

// Peak rise inside each band, against a short median. A held tone or a flat
// noise floor has ~0 flux, so dancers fire on attacks rather than loudness.
static int detect_onsets(int bin_count, float sample_rate, int fft_size, double now_ms, int* hits) {
  if (bin_count > MAX_BINS) bin_count = MAX_BINS;
  if (bin_count < 2) return 0;
  if (prev_bins != bin_count) {
    for (int i = 0; i < bin_count; i++) prev_spec[i] = spectrum[i];
    prev_bins = bin_count;
    return 0;
  }
  int n_hits = 0;
  for (int b = 0; b < 4; b++) {
    int i0 = 0, i1 = 0;
    float peak = 0.f;
    float loud = 0.f;
    if (band_range(b, sample_rate, fft_size, bin_count, &i0, &i1)) {
      for (int i = i0; i <= i1; i++) {
        int v = spectrum[i];
        int d = v - (int)prev_spec[i];
        if ((float)d > peak) peak = (float)d;
        if ((float)v > loud) loud = (float)v;
      }
      for (int i = i0; i <= i1; i++) prev_spec[i] = spectrum[i];
    }
    bands[b].level = loud > 56.f ? 1.f : loud / 56.f;
    float med = 0.f;
    if (bands[b].hist_n > 0) {
      float tmp[HIST];
      for (int i = 0; i < bands[b].hist_n; i++) tmp[i] = bands[b].hist[i];
      med = median_of(tmp, bands[b].hist_n);
    }
    bands[b].samples++;
    float threshold = bands[b].min_flux + med * bands[b].ratio;
    if (bands[b].samples > WARMUP && peak > threshold &&
        (now_ms - bands[b].last_ms) >= (double)bands[b].refractory_ms) {
      bands[b].last_ms = now_ms;
      hits[n_hits++] = b;
    }
    bands[b].hist[bands[b].hist_i] = peak;
    bands[b].hist_i++;
    if (bands[b].hist_i >= HIST) bands[b].hist_i = 0;
    if (bands[b].hist_n < HIST) bands[b].hist_n++;
  }
  return n_hits;
}

static void copy_pulse(Pulse* d, const Pulse* s) {
  d->a = s->a;
  d->b = s->b;
  d->k = s->k;
  d->age = s->age;
  d->duration = s->duration;
  d->trail_len = s->trail_len;
  for (int t = 0; t < MAX_TRAIL; t++) {
    d->trail_x[t] = s->trail_x[t];
    d->trail_y[t] = s->trail_y[t];
  }
}

static void remove_pulse_at(int index) {
  for (int j = index; j < pulse_count - 1; j++) copy_pulse(&pulses[j], &pulses[j + 1]);
  pulse_count--;
}

static int pulse_cap() { return low_power ? 24 : MAX_PULSES; }

static void publish() {
  for (int i = 0; i < count; i++) {
    float* o = dancer_view + i * 6;
    o[0] = dancers[i].x;
    o[1] = dancers[i].y;
    o[2] = dancers[i].a;
    o[3] = dancers[i].rest;
    o[4] = (float)dancers[i].k;
    o[5] = (float)dancers[i].id;
  }
  for (int i = 0; i < pulse_count; i++) {
    Pulse* p = &pulses[i];
    float ax = dancers[p->a].x, ay = dancers[p->a].y;
    float bx = dancers[p->b].x, by = dancers[p->b].y;
    float t = 0.f;
    if (p->duration > 0.f) t = clampf(p->age / p->duration, 0.f, 1.f);
    float hx = ax, hy = ay;
    path_point(ax, ay, bx, by, t, &hx, &hy);
    float* o = pulse_view + i * PULSE_STRIDE;
    o[0] = (float)p->a;
    o[1] = (float)p->b;
    o[2] = (float)p->k;
    o[3] = p->age;
    o[4] = p->duration;
    o[5] = hx;
    o[6] = hy;
    o[7] = (float)p->trail_len;
    for (int t_i = 0; t_i < MAX_TRAIL; t_i++) {
      o[8 + t_i * 2] = p->trail_x[t_i];
      o[9 + t_i * 2] = p->trail_y[t_i];
    }
  }
  for (int i = 0; i < 4; i++) levels[i] = bands_ready ? bands[i].level : 0.f;
}

static void enqueue(int index) {
  if (emitted[index]) return;
  emitted[index] = 1;
  if (qn < MAX_DANCERS) queue[qn++] = index;
}

static void arm(int index) {
  Dancer* d = &dancers[index];
  if (d->rest > 0.f) return;
  float next = d->a + 0.25f;
  if (next < 0.95f) next = 0.95f;
  if (next > 2.f) next = 2.f;
  d->a = next;
  enqueue(index);
}

static void spawn_pulse(int ai, int bi, float dist) {
  if (pulse_count >= pulse_cap()) return;
  Pulse* p = &pulses[pulse_count++];
  p->a = ai;
  p->b = bi;
  p->k = dancers[ai].k;
  p->age = 0.f;
  p->duration = 0.3f + dist / 170.f;
  p->trail_len = 0;
  for (int t = 0; t < MAX_TRAIL; t++) {
    p->trail_x[t] = 0.f;
    p->trail_y[t] = 0.f;
  }
}

extern "C" {

int nd_api(void) { return 1; }

int nd_spectrum_cap(void) { return MAX_BINS; }

unsigned char* nd_spectrum(void) { return spectrum; }

int nd_dancer_stride(void) { return 6; }

int nd_pulse_stride(void) { return PULSE_STRIDE; }

int nd_count(void) { return count; }

int nd_pulse_count(void) { return pulse_count; }

float* nd_dancers(void) { return dancer_view; }

float* nd_pulses(void) { return pulse_view; }

float* nd_levels(void) { return levels; }

float* nd_sticker_in(void) { return sticker_in; }

void nd_hit(int type) {
  if (type < 0 || type > 3) return;
  pending_hits |= 1 << type;
}

void nd_set_bpm(float next) { bpm = next > 0.f ? next : 0.f; }

// Hard gate for the built-in beat. Listening passes this as well as the
// per-frame flag, so a missed argument cannot keep the synthetic rhythm.
void nd_set_clock(int on) {
  int next = on ? 1 : 0;
  if (next == clock_on) return;
  clock_on = next;
  if (!clock_on) {
    pulse_count = 0;
    for (int i = 0; i < count; i++) {
      dancers[i].a = 0.f;
      dancers[i].peak = 0.f;
    }
    publish();
  }
}

void nd_set_low(int on) {
  low_power = on ? 1 : 0;
  int cap = pulse_cap();
  while (pulse_count > cap) pulse_count--;
  publish();
}

void nd_clear(void) {
  count = 0;
  pulse_count = 0;
  next_id = 1;
  sim_time = 0.f;
  was_listening = 0;
  pending_hits = 0;
  reset_onsets();
  for (int i = 0; i < 4; i++) levels[i] = 0.f;
  publish();
}

static int find_id(int id) {
  for (int i = 0; i < count; i++) if (dancers[i].id == id) return i;
  return -1;
}

// Full sticker map from the UV camera (or the traced stand-in).
// Each record is id, x, y, type in source-photo pixels.
// Matching ids keep their phase and activation so the camera can move stickers
// without restarting the network. Unknown ids are added. Missing ids are removed.
int nd_set_stickers(int n) {
  setup_bands();
  if (n < 0) n = 0;
  if (n > MAX_DANCERS) n = MAX_DANCERS;
  Dancer next[MAX_DANCERS];
  int next_count = 0;
  for (int s = 0; s < n; s++) {
    float* rec = sticker_in + s * 4;
    int id = (int)(rec[0] >= 0.f ? rec[0] + 0.5f : rec[0] - 0.5f);
    float x = rec[1];
    float y = rec[2];
    int type = (int)(rec[3] >= 0.f ? rec[3] + 0.5f : 0.f);
    if (type < 0) type = 0;
    if (type > 3) type = 3;
    int idx = id > 0 ? find_id(id) : -1;
    Dancer d;
    if (idx >= 0) {
      d = dancers[idx];
      d.x = x;
      d.y = y;
      d.k = type;
    } else {
      if (id <= 0) id = next_id++;
      else if (id >= next_id) next_id = id + 1;
      d.id = id;
      d.x = x;
      d.y = y;
      d.k = type;
      d.phase = (float)(id % 7) * 0.047f;
      d.a = 0.f;
      d.rest = 0.f;
      d.peak = 0.f;
      d.ref = 0.f;
    }
    int dup = 0;
    for (int j = 0; j < next_count; j++) if (next[j].id == d.id) dup = 1;
    if (dup) continue;
    next[next_count++] = d;
  }
  int remap[MAX_DANCERS];
  for (int i = 0; i < count; i++) remap[i] = -1;
  for (int j = 0; j < next_count; j++) {
    for (int i = 0; i < count; i++) {
      if (dancers[i].id == next[j].id) remap[i] = j;
    }
  }
  for (int p = pulse_count - 1; p >= 0; p--) {
    int na = pulses[p].a >= 0 && pulses[p].a < count ? remap[pulses[p].a] : -1;
    int nb = pulses[p].b >= 0 && pulses[p].b < count ? remap[pulses[p].b] : -1;
    if (na < 0 || nb < 0) remove_pulse_at(p);
    else {
      pulses[p].a = na;
      pulses[p].b = nb;
    }
  }
  for (int j = 0; j < next_count; j++) dancers[j] = next[j];
  count = next_count;
  publish();
  return count;
}

int nd_add(float x, float y, int k) {
  setup_bands();
  if (count >= MAX_DANCERS) return 0;
  if (k < 0) k = 0;
  if (k > 3) k = 3;
  int id = next_id++;
  Dancer* d = &dancers[count++];
  d->id = id;
  d->x = x;
  d->y = y;
  d->k = k;
  d->phase = (float)(id % 7) * 0.047f;
  d->a = 0.f;
  d->rest = 0.f;
  d->peak = 0.f;
  d->ref = 0.f;
  publish();
  return id;
}

void nd_remove(int id) {
  int idx = -1;
  for (int i = 0; i < count; i++) if (dancers[i].id == id) { idx = i; break; }
  if (idx < 0) return;
  for (int i = pulse_count - 1; i >= 0; i--) {
    if (pulses[i].a == idx || pulses[i].b == idx) remove_pulse_at(i);
  }
  for (int i = 0; i < pulse_count; i++) {
    if (pulses[i].a > idx) pulses[i].a--;
    if (pulses[i].b > idx) pulses[i].b--;
  }
  for (int i = idx; i < count - 1; i++) dancers[i] = dancers[i + 1];
  count--;
  publish();
}

void nd_move(int id, float x, float y) {
  for (int i = 0; i < count; i++) {
    if (dancers[i].id != id) continue;
    dancers[i].x = x;
    dancers[i].y = y;
    publish();
    return;
  }
}

int nd_band_range(int band, float sample_rate, int fft_size, int bin_count) {
  setup_bands();
  int i0 = 0, i1 = 0;
  if (!band_range(band, sample_rate, fft_size, bin_count, &i0, &i1)) return -1;
  return i0 | (i1 << 16);
}

int nd_update(float dt, int listening, int bin_count, float sample_rate, int fft_size, double now_ms) {
  setup_bands();
  if (dt < 0.f) dt = 0.f;
  if (dt > 0.067f) dt = 0.067f;
  sim_time += dt;
  tone_mask = 0;
  qn = 0;
  for (int i = 0; i < count; i++) {
    emitted[i] = 0;
    received[i] = 0.f;
  }

  if (listening && !was_listening) {
    // Drop the built-in beat the moment the mic takes over.
    pulse_count = 0;
    for (int i = 0; i < count; i++) {
      dancers[i].a = 0.f;
      dancers[i].peak = 0.f;
    }
    reset_onsets();
  }
  was_listening = listening ? 1 : 0;

  for (int i = 0; i < count; i++) {
    Dancer* d = &dancers[i];
    d->a -= dt * 1.5f;
    if (d->a < 0.f) d->a = 0.f;
    if (clock_on && !listening) d->phase += dt * bpm * (1.f / 60.f) * RATES[d->k];
    d->rest -= dt;
    if (d->rest < 0.f) d->rest = 0.f;
    if (d->phase >= 1.f) {
      d->phase -= 1.f;
      if (d->phase >= 1.f) d->phase -= 1.f;
      if (clock_on && !listening) arm(i);
    }
  }

  if (listening && bin_count > 1) {
    int hits[4];
    int n_hits = detect_onsets(bin_count, sample_rate, fft_size, now_ms, hits);
    for (int h = 0; h < n_hits; h++) pending_hits |= 1 << hits[h];
  } else if (!listening) {
    for (int i = 0; i < 4; i++) bands[i].level = 0.f;
  }
  if (pending_hits) {
    for (int k = 0; k < 4; k++) {
      if (!(pending_hits & (1 << k))) continue;
      for (int i = 0; i < count; i++) if (dancers[i].k == k) arm(i);
    }
    pending_hits = 0;
  }

  int cap_pulses = pulse_cap();
  for (int qi = 0; qi < qn && qi < MAX_DANCERS; qi++) {
    int ai = queue[qi];
    int k = dancers[ai].k;
    if (k >= 0 && k <= 3) tone_mask |= 1 << k;
    int trails = 0;
    for (int bi = 0; bi < count; bi++) {
      if (bi == ai || dancers[bi].rest > 0.f) continue;
      float dx = dancers[ai].x - dancers[bi].x;
      float dy = dancers[ai].y - dancers[bi].y;
      float dist = __builtin_sqrtf(dx * dx + dy * dy);
      if (dist >= LINK_R) continue;
      float used = received[bi];
      float amount = 0.65f - used;
      float falloff = 0.2f + 0.25f * (1.f - dist / LINK_R);
      if (falloff < amount) amount = falloff;
      if (amount > 0.f) {
        received[bi] = used + amount;
        float next = dancers[bi].a + amount;
        if (next > 2.f) next = 2.f;
        dancers[bi].a = next;
        if (dancers[bi].a >= 1.4f && sim_time >= dancers[bi].ref) {
          dancers[bi].ref = sim_time + 0.2f;
          enqueue(bi);
        }
      }
      if (trails < 2 && pulse_count < cap_pulses) {
        spawn_pulse(ai, bi, dist);
        trails++;
      }
    }
  }

  for (int i = 0; i < count; i++) {
    Dancer* d = &dancers[i];
    if (d->a > 1.75f) d->peak += dt;
    else {
      d->peak -= dt * 0.6f;
      if (d->peak < 0.f) d->peak = 0.f;
    }
    if (d->peak > 2.8f) {
      d->rest = 1.6f;
      d->peak = 0.f;
      d->a = 0.4f;
    }
  }

  for (int i = pulse_count - 1; i >= 0; i--) {
    Pulse* p = &pulses[i];
    p->age += dt;
    if (p->age >= p->duration) {
      remove_pulse_at(i);
      continue;
    }
    float ax = dancers[p->a].x, ay = dancers[p->a].y;
    float bx = dancers[p->b].x, by = dancers[p->b].y;
    float t = p->duration > 0.f ? p->age / p->duration : 0.f;
    float qx, qy;
    path_point(ax, ay, bx, by, t, &qx, &qy);
    if (p->trail_len >= MAX_TRAIL) {
      for (int s = 1; s < MAX_TRAIL; s++) {
        p->trail_x[s - 1] = p->trail_x[s];
        p->trail_y[s - 1] = p->trail_y[s];
      }
      p->trail_len = MAX_TRAIL - 1;
    }
    p->trail_x[p->trail_len] = qx;
    p->trail_y[p->trail_len] = qy;
    p->trail_len++;
  }

  publish();
  return tone_mask;
}

}  // extern "C"
