(() => {
  const root = document.querySelector('[data-exhibition-atlas]');
  const L = window.L;
  if (!root || !L) return; // Native disclosure links remain usable without the map library.
  const canvas = root.querySelector('.atlas-canvas');
  const status = root.querySelector('.atlas-instructions');
  const places = [...root.querySelectorAll('[data-place]')].map(detail => ({
    id: detail.dataset.place, city: detail.dataset.city, region: detail.dataset.region,
    number: detail.dataset.number, kind: detail.dataset.kind, coordinates: [Number(detail.dataset.lat), Number(detail.dataset.lng)], detail,
  }));
  const fallback = canvas.querySelector('.atlas-fallback');
  const map = L.map(canvas, {scrollWheelZoom: false, minZoom: 1, maxZoom: 10, zoomSnap: .25, zoomAnimation: false});
  const fit = group => map.fitBounds(group.map(place => place.coordinates), {padding: [55, 55], maxZoom: group.length === 1 ? 10 : 9, animate: false});
  fit(places);
  fallback.hidden = true;
  L.imageOverlay('/exhibitions/world-map/countries.svg', [[-85.05112878,-180],[85.05112878,180]], {
    attribution: '<a href="https://www.naturalearthdata.com/">Natural Earth</a>',
    alt: 'World country outlines',
  }).addTo(map);
  const layer = L.layerGroup().addTo(map);
  let selected = null;
  let view = 'world';
  const viewButtons = [...root.querySelectorAll('[data-map-view]')];
  const updateViewButtons = () => viewButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mapView === view)));
  const updateSelection = () => {
    places.forEach(place => {place.detail.open = place.id === selected;});
    canvas.querySelectorAll('[data-map-place]').forEach(marker => marker.setAttribute('aria-expanded', String(marker.dataset.mapPlace === selected)));
  };
  const select = (place, fromPin = false) => {
    selected = selected === place.id ? null : place.id;
    updateSelection();
    if (selected && !fromPin) {
      view = ['northwest', 'salvador'].includes(place.region) ? place.region : '';
      updateViewButtons();
      fit(places.filter(other => other.region === place.region));
    }
    if (selected) {
      status.textContent = `${place.city}: choose an exhibition or mural below.`;
      if (fromPin) {
        place.detail.querySelector('summary').focus({preventScroll: true});
        if (matchMedia('(max-width:850px)').matches) place.detail.scrollIntoView({block: 'nearest', behavior: 'instant'});
      }
    } else status.textContent = 'Click a pin or choose a city to explore.';
  };
  // Group only markers whose touch targets would overlap at the current zoom.
  // Individual pins always retain their real coordinates; nothing is shifted offshore.
  const groups = () => {
    const remaining = new Set(places);
    const result = [];
    while (remaining.size) {
      const group = [remaining.values().next().value];
      remaining.delete(group[0]);
      for (let i = 0; i < group.length; i++) {
        const point = map.latLngToLayerPoint(group[i].coordinates);
        for (const other of remaining) {
          if (point.distanceTo(map.latLngToLayerPoint(other.coordinates)) < 54) {
            group.push(other);
            remaining.delete(other);
          }
        }
      }
      result.push(group);
    }
    return result;
  };
  const draw = () => {
    layer.clearLayers();
    for (const group of groups()) {
      const multiple = group.length > 1;
      const place = group[0];
      const names = group.map(item => item.city).join(' & ');
      const kinds = new Set(group.flatMap(item => item.kind === 'mixed' ? ['exhibition','mural'] : [item.kind]));
      const kind = kinds.size > 1 ? 'mixed' : [...kinds][0];
      const gradientId = `atlas-pin-${place.id}`;
      const fill = kind === 'mixed' ? `url(#${gradientId})` : kind === 'mural' ? '#236fa1' : '#d34220';
      const gradient = kind === 'mixed' ? `<defs><linearGradient id="${gradientId}"><stop offset="50%" stop-color="#d34220"/><stop offset="50%" stop-color="#236fa1"/></linearGradient></defs>` : '';
      const coordinates = multiple ? L.latLngBounds(group.map(item => item.coordinates)).getCenter() : place.coordinates;
      const icon = multiple ? L.divIcon({className: 'atlas-cluster', html: String(group.length), iconSize: [40, 40], iconAnchor: [20, 20]}) : L.divIcon({
        className: 'atlas-marker', iconSize: [36, 46], iconAnchor: [18, 46],
        html: `<svg viewBox="0 0 36 46" width="36" height="46" aria-hidden="true">${gradient}<path d="M18 45C14 38 2 27 2 18a16 16 0 1 1 32 0c0 9-12 20-16 27Z" fill="${fill}" stroke="#fffaf2" stroke-width="2"/><text x="18" y="24" text-anchor="middle" fill="white" font-family="Inter,Arial,sans-serif" font-size="16" font-weight="700">${place.number}</text></svg>`,
      });
      const label = multiple ? `Zoom to ${names}, ${group.length} locations` : `Show ${place.city} exhibitions and murals`;
      const marker = L.marker(coordinates, {icon, title: label, keyboard: true}).addTo(layer);
      marker.bindTooltip(multiple ? `${names} · Click to zoom` : place.city, {direction: 'top', offset: [0, multiple ? -24 : -46], permanent: !multiple && map.getZoom() >= 5});
      const element = marker.getElement();
      element.setAttribute('aria-label', label);
      element.dataset.kind = kind;
      element.setAttribute('aria-description', kind === 'mixed' ? 'Exhibitions and murals' : kind === 'mural' ? 'Murals' : 'Exhibitions');
      if (!multiple) {
        element.dataset.mapPlace = place.id;
        element.setAttribute('aria-controls', place.detail.id);
        element.setAttribute('aria-expanded', String(selected === place.id));
      }
      const activate = () => {
        if (!multiple) return select(place, true);
        view = group.every(item => item.region === place.region) ? place.region : '';
        updateViewButtons();
        fit(group);
        status.textContent = `${names}: click a pin to see its exhibitions and murals.`;
        canvas.querySelector(`[data-map-place="${place.id}"]`)?.focus({preventScroll: true});
      };
      marker.on('click', activate);
      // Prevent native activation from toggling the summary again after focus moves.
      element.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          activate();
        }
      });
    }
  };
  map.on('zoomend', draw);
  viewButtons.forEach(button => button.addEventListener('click', () => {
    view = button.dataset.mapView;
    selected = null;
    updateSelection();
    updateViewButtons();
    fit(view === 'world' ? places : places.filter(place => place.region === view));
    status.textContent = view === 'world' ? 'Click a numbered circle to zoom, or choose a city.' : 'Click a pin to see its exhibitions and murals.';
  }));
  places.forEach(place => place.detail.querySelector('summary').addEventListener('click', event => {
    event.preventDefault();
    select(place);
  }));
  // Collector testimonial pins (green), separate from exhibition markers and clustering.
  // Hand-curated pins are embedded at build time; approved form submissions load from /testimonials/api/approved.
  // The homepage card and the testimonials page use the same endpoint (exhibitions/world-map/live-pins.js).
  const testimonials = L.layerGroup().addTo(map);
  const legend = root.querySelector('[data-testimonial-legend]');
  const testimonialIcon = L.divIcon({className: 'atlas-testimonial', iconSize: [26, 34], iconAnchor: [13, 34],
    html: '<svg viewBox="0 0 26 34" width="26" height="34" aria-hidden="true"><path d="M13 33C10 28 1 20 1 13a12 12 0 1 1 24 0c0 7-9 15-12 20Z" fill="#2f8a4c" stroke="#fffaf2" stroke-width="2"/><text x="13" y="20" text-anchor="middle" fill="white" font-family="Georgia,serif" font-size="15" font-weight="700">\u201C</text></svg>'});
  const shown = new Set();
  const addPins = pins => pins.forEach(pin => {
    const key = pin.id || `${pin.name}|${pin.lat}|${pin.lng}`;
    if (shown.has(key) || !Number.isFinite(pin.lat) || !Number.isFinite(pin.lng)) return;
    shown.add(key);
    const label = [pin.name, pin.city, pin.painting].filter(Boolean).join(' · ');
    L.marker([pin.lat, pin.lng], {icon: testimonialIcon, title: `Testimonial: ${label}`, keyboard: false})
      .bindTooltip(label, {direction: 'top', offset: [0, -32]})
      .on('click', () => { location.href = '/testimonials/' + (pin.id ? '#' + encodeURIComponent(pin.id) : ''); })
      .addTo(testimonials);
    if (legend) legend.hidden = false;
  });
  try { addPins(JSON.parse(root.querySelector('[data-testimonial-pins]')?.textContent || '[]')); } catch {}
  fetch('/testimonials/api/approved', {cache: 'no-store', headers: {Accept: 'application/json'}})
    .then(r => r.ok ? r.json() : {testimonials: []})
    .then(data => addPins((data.testimonials || []).filter(t => Array.isArray(t.pin)).map(t => ({id: t.id, name: t.name, city: t.city, painting: t.painting, lat: t.pin[0], lng: t.pin[1]}))))
    .catch(() => {});
  root.querySelector('.atlas-toolbar').hidden = false;
  draw();
  status.textContent = 'Click a numbered circle to zoom, or choose a city.';
  new ResizeObserver(() => {map.invalidateSize({pan: false}); draw();}).observe(canvas);
})();
