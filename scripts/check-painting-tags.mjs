// Validates catalog/painting-tags.json (studio-tracker #248). Run: node scripts/check-painting-tags.mjs
import data from '../catalog/painting-tags.json' with { type: 'json' };
import { products, byId } from '../catalog/catalog.mjs';
import { relatedWorks, twinGroups, RELATED_LIMIT, resolveId, tagAssignments } from '../catalog/related-works.mjs';
const errors = [];
const kinds = new Set(['place', 'series', 'subject']);
for (const [k, t] of Object.entries(data.tags)) if (!t.label || !kinds.has(t.kind)) errors.push(`tag ${k}: needs label and kind place|series|subject`);
for (const [id, tags] of Object.entries(data.assignments)) {
  const p = byId[resolveId(id)];
  if (!p) { errors.push(`assignment ${id}: no such product`); continue; }
  if (p.artist === 'Paul Murphy') errors.push(`assignment ${id}: Paul Murphy works must not be tagged`);
  if (p.type !== 'painting') errors.push(`assignment ${id}: not a painting`);
  for (const k of tags) if (!data.tags[k]) errors.push(`assignment ${id}: unknown tag ${k}`);
  if (new Set(tags).size !== tags.length) errors.push(`assignment ${id}: duplicate tags`);
}
const group = twinGroups(products);
for (const g of data.twins) {
  for (const id of g) if (!byId[resolveId(id)]) errors.push(`twins: no such product ${id}`);
  const sets = g.map(id => JSON.stringify([...(tagAssignments[resolveId(id)] || [])].sort()));
  if (new Set(sets).size > 1) errors.push(`twins ${g.join(',')}: must share the same tags`);
}
for (const p of products) {
  const rel = relatedWorks(p);
  if (rel.length > RELATED_LIMIT) errors.push(`${p.id}: more than ${RELATED_LIMIT} related works`);
  for (const r of rel) {
    if (r.artist === 'Paul Murphy') errors.push(`${p.id}: shows Paul Murphy work ${r.id}`);
    if (group(r.id) === group(p.id)) errors.push(`${p.id}: shows its own twin ${r.id}`);
  }
  if (new Set(rel.map(r => group(r.id))).size !== rel.length) errors.push(`${p.id}: shows the same painting twice`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`painting tags ok: ${Object.keys(data.tags).length} tags, ${Object.keys(data.assignments).length} tagged paintings`);
