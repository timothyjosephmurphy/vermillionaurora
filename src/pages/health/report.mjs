// Turns https://img.tjm.art/health/latest.json into the unlisted /health/ page.
// The report is fetched in the browser. This module only shapes and paints it.

export const HEALTH_URL = 'https://img.tjm.art/health/latest.json';

const TONES = new Set(['success', 'warning', 'danger', 'error', 'info', 'neutral']);
const SCORE_LABELS = {
  performance: 'Performance',
  accessibility: 'Accessibility',
  best_practices: 'Best practices',
  seo: 'SEO',
};

const ERROR_MESSAGE = 'The latest health check could not be loaded.';

function clean(value) {
  if (value == null) return '';
  return String(value).replace(/\s+/g, ' ').trim();
}

function tone(value) {
  const name = clean(value).toLowerCase();
  return TONES.has(name) ? name : 'neutral';
}

function labelize(key) {
  if (SCORE_LABELS[key]) return SCORE_LABELS[key];
  return clean(key).replace(/_/g, ' ').replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

export function safeUrl(value) {
  try {
    const url = new URL(clean(value));
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href;
  } catch { /* ignore malformed or non-http links */ }
  return '';
}

// Prefer the report's own label. Otherwise format checked_at in Pacific Time
// and mark it PT (Pacific), the timezone the health check uses.
export function checkedAtLabel(data) {
  const label = clean(data?.checked_at_label);
  if (label) return label;
  const raw = clean(data?.checked_at);
  if (!raw) return '';
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return `${raw} PT (Pacific)`;
  const formatted = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
  return `${formatted} PT (Pacific)`;
}

function list(value) {
  return Array.isArray(value) ? value : [];
}

function pairs(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
  return Object.entries(value)
    .map(([key, item]) => ({ label: labelize(key), value: clean(item) }))
    .filter(item => item.label && item.value);
}

export function healthView(data) {
  const source = data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  const overall = source.overall && typeof source.overall === 'object' ? source.overall : {};
  const areas = list(source.areas).map(area => ({
    name: clean(area?.name),
    status: clean(area?.status),
    summary: clean(area?.summary),
    tone: tone(area?.tone),
  })).filter(area => area.name || area.status || area.summary);
  const issues = list(source.issues).map(issue => {
    const what = clean(issue?.what);
    const title = clean(issue?.title);
    return {
      severity: clean(issue?.severity),
      area: clean(issue?.area),
      title: what && title && title !== what ? title : '',
      what: what || title,
      fix: clean(issue?.fix),
      tracker: safeUrl(issue?.tracker),
      tone: tone(issue?.tone),
    };
  }).filter(issue => issue.severity || issue.area || issue.what || issue.fix || issue.tracker);
  const metrics = list(source.metrics).map(item => ({
    value: clean(item?.value),
    label: clean(item?.label),
    detail: clean(item?.detail),
    tone: tone(item?.tone),
  })).filter(item => item.value || item.label);
  const pages = list(source.pages).map(page => ({
    href: safeUrl(page?.url),
    url: clean(page?.url),
    status: clean(page?.status),
    time: clean(page?.time) || (page?.time_ms != null && page?.time_ms !== '' ? `${clean(page.time_ms)} ms` : ''),
    notes: clean(page?.notes),
  })).filter(page => page.url || page.status || page.notes);
  const lighthouse = lighthouseView(source.lighthouse);
  const checked = checkedAtLabel(source);
  return {
    status: clean(overall.status) || 'Unknown',
    summary: clean(overall.summary),
    tone: tone(overall.tone),
    checked,
    dashboard: safeUrl(source.library_dashboard),
    metrics,
    areas,
    issues,
    pages,
    lighthouse,
  };
}

function lighthouseView(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const scores = pairs(value.scores);
  const metrics = pairs(value.metrics);
  const meta = [clean(value.form_factor), clean(value.runner), clean(value.ran_at_label)].filter(Boolean);
  const consoleErrors = value.console_errors == null || value.console_errors === '' ? '' : clean(value.console_errors);
  if (!scores.length && !metrics.length && !meta.length && !consoleErrors) return null;
  return { scores, metrics, meta, consoleErrors };
}

function node(doc, id) {
  const found = doc.getElementById(id);
  if (!found) throw new Error(`Missing #${id}`);
  return found;
}

function show(el, visible) {
  el.hidden = !visible;
}

function textCell(doc, value, className) {
  const cell = doc.createElement('td');
  if (className) cell.className = className;
  cell.textContent = value;
  return cell;
}

function link(doc, href, label) {
  const anchor = doc.createElement('a');
  anchor.href = href;
  anchor.textContent = label;
  anchor.rel = 'noopener noreferrer';
  anchor.target = '_blank';
  return anchor;
}

function paintAreas(doc, areas) {
  const section = node(doc, 'health-areas');
  const tiles = node(doc, 'health-area-tiles');
  tiles.replaceChildren(...areas.map(area => {
    const tile = doc.createElement('article');
    tile.className = `health-tile health-tone ${area.tone}`;
    const status = doc.createElement('p');
    status.className = 'health-kicker';
    status.textContent = area.status;
    const name = doc.createElement('h3');
    name.textContent = area.name;
    const summary = doc.createElement('p');
    summary.textContent = area.summary;
    tile.append(status, name, summary);
    return tile;
  }));
  show(section, areas.length > 0);
}

function paintIssues(doc, issues) {
  const section = node(doc, 'health-issues');
  const rows = node(doc, 'health-issue-rows');
  rows.replaceChildren(...issues.map(issue => {
    const row = doc.createElement('tr');
    const what = doc.createElement('td');
    if (issue.title) {
      const heading = doc.createElement('strong');
      heading.textContent = issue.title;
      what.append(heading);
    }
    if (issue.what) {
      const body = doc.createElement('p');
      body.textContent = issue.what;
      what.append(body);
    }
    const tracker = doc.createElement('td');
    if (issue.tracker) tracker.append(link(doc, issue.tracker, 'Tracker'));
    else tracker.textContent = '—';
    row.append(
      textCell(doc, issue.severity, `health-tone ${issue.tone}`),
      textCell(doc, issue.area),
      what,
      textCell(doc, issue.fix),
      tracker,
    );
    return row;
  }));
  show(section, issues.length > 0);
}

function paintMetrics(doc, metrics) {
  const section = node(doc, 'health-metrics');
  section.replaceChildren(...metrics.map(item => {
    const tile = doc.createElement('article');
    tile.className = `health-metric health-tone ${item.tone}`;
    const value = doc.createElement('p');
    value.className = 'health-metric-value';
    value.textContent = item.value;
    const label = doc.createElement('h3');
    label.textContent = item.label;
    const detail = doc.createElement('p');
    detail.textContent = item.detail;
    tile.append(value, label, detail);
    return tile;
  }));
  show(section, metrics.length > 0);
}

function definitionList(doc, parent, pairsToPaint) {
  parent.replaceChildren(...pairsToPaint.flatMap(item => {
    const term = doc.createElement('dt');
    term.textContent = item.label;
    const detail = doc.createElement('dd');
    detail.textContent = item.value;
    return [term, detail];
  }));
}

function paintLighthouse(doc, lighthouse) {
  const section = node(doc, 'health-lighthouse');
  if (!lighthouse) {
    show(section, false);
    return;
  }
  const meta = node(doc, 'health-lighthouse-meta');
  meta.textContent = lighthouse.meta.join(' · ');
  show(meta, lighthouse.meta.length > 0);
  definitionList(doc, node(doc, 'health-lighthouse-scores'), lighthouse.scores);
  definitionList(doc, node(doc, 'health-lighthouse-metrics'), lighthouse.metrics);
  const consoleLine = node(doc, 'health-lighthouse-console');
  consoleLine.textContent = lighthouse.consoleErrors ? `Console errors: ${lighthouse.consoleErrors}` : '';
  show(consoleLine, Boolean(lighthouse.consoleErrors));
  show(section, true);
}

function paintPages(doc, pages) {
  const section = node(doc, 'health-pages');
  const rows = node(doc, 'health-page-rows');
  rows.replaceChildren(...pages.map(page => {
    const row = doc.createElement('tr');
    const url = doc.createElement('td');
    if (page.href) url.append(link(doc, page.href, page.url));
    else url.textContent = page.url;
    row.append(url, textCell(doc, page.status), textCell(doc, page.time), textCell(doc, page.notes));
    return row;
  }));
  show(section, pages.length > 0);
}

export function paintHealth(doc, view) {
  const status = node(doc, 'health-status');
  status.className = `health-status health-tone ${view.tone}`;
  status.textContent = view.status;
  show(status, true);
  const summary = node(doc, 'health-summary');
  summary.textContent = view.summary;
  show(summary, Boolean(view.summary));
  const checked = node(doc, 'health-checked');
  checked.textContent = view.checked ? `Checked at ${view.checked}` : '';
  show(checked, Boolean(view.checked));
  const dashboard = node(doc, 'health-dashboard');
  const dashboardLink = node(doc, 'health-dashboard-link');
  if (view.dashboard) {
    dashboardLink.href = view.dashboard;
    dashboardLink.textContent = 'Library dashboard';
  }
  show(dashboard, Boolean(view.dashboard));
  show(node(doc, 'health-error'), false);
  paintMetrics(doc, view.metrics);
  paintAreas(doc, view.areas);
  paintIssues(doc, view.issues);
  paintLighthouse(doc, view.lighthouse);
  paintPages(doc, view.pages);
}

export function paintError(doc) {
  const error = node(doc, 'health-error');
  error.textContent = ERROR_MESSAGE;
  show(error, true);
  const status = doc.getElementById('health-status');
  if (status) show(status, false);
  for (const id of ['health-summary', 'health-checked', 'health-dashboard', 'health-metrics', 'health-areas', 'health-issues', 'health-lighthouse', 'health-pages']) {
    const el = doc.getElementById(id);
    if (el) show(el, false);
  }
}

export function loadHealth(doc = globalThis.document, fetchImpl = globalThis.fetch) {
  const run = async () => {
    try {
      const response = await fetchImpl(HEALTH_URL, { cache: 'no-store' });
      if (!response?.ok) throw new Error('Health check request failed');
      paintHealth(doc, healthView(await response.json()));
    } catch {
      paintError(doc);
    }
  };
  if (doc?.readyState === 'loading' && typeof doc.addEventListener === 'function') {
    doc.addEventListener('DOMContentLoaded', () => { run(); }, { once: true });
    return Promise.resolve();
  }
  return run();
}
