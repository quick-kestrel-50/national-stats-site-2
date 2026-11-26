// Horizontal bar charts, plain CSS — no library, no images.
import { fmt } from "./format.js";

export function barChart(rows, valueOf, labelOf, maxValue) {
  const max = maxValue || Math.max(...rows.map(valueOf));
  const bars = rows
    .map((row) => {
      const v = valueOf(row);
      const pct = Math.max(2, Math.round((v / max) * 100));
      return `<div class="bar-row"><span class="bar-label">${labelOf(row)}</span><span class="bar-track"><span class="bar-fill" style="width:${pct}%"></span></span><span class="bar-value">${fmt(v, 0)}</span></div>`;
    })
    .join("");
  return `<div class="bars">${bars}</div>`;
}

export function lifeBar(value) {
  // Life expectancy on a 40–90 year scale, so differences stay visible.
  const pct = Math.max(2, Math.round(((value - 40) / 50) * 100));
  return `<span class="bar-track slim"><span class="bar-fill teal" style="width:${pct}%"></span></span>`;
}
