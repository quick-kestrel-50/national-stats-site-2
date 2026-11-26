// All four pages of the atlas, rendered from data.js into #page.
import { COUNTRIES, INDICATORS, YEAR, SOURCE, REGIONS, rankOf, rankedBy } from "./data.js";
import { fmt, fmtMoney, fmtPop, esc } from "./format.js";
import { barChart } from "./charts.js";

const COLUMNS = [
  { id: "name", label: "Country" },
  { id: "pop", label: "Pop. (m)" },
  { id: "gdpPc", label: "GDP / head ($)" },
  { id: "gdp", label: "GDP ($bn)" },
  { id: "life", label: "Life (yrs)" },
  { id: "fert", label: "Fertility" },
  { id: "urban", label: "Urban (%)" },
];

function indicatorById(id) {
  return INDICATORS.find((i) => i.id === id) || INDICATORS[1];
}

function cell(country, colId) {
  if (colId === "name") return `<a href="#/country/${country.slug}">${esc(country.name)}</a><span class="sub">${esc(country.capital)}</span>`;
  if (colId === "pop") return fmtPop(country.pop);
  if (colId === "gdpPc") return fmtMoney(country.gdpPc);
  if (colId === "gdp") return fmt(country.gdp, 0);
  if (colId === "life") return fmt(country.life, 1);
  if (colId === "fert") return fmt(country.fert, 2);
  return fmt(country.urban, 1);
}

function sortArrow(state, colId) {
  if (state.sort !== colId) return "";
  return state.dir === "desc" ? " ▼" : " ▲";
}

function tableRows(rows, state) {
  return rows
    .map((c, i) => {
      const tds = COLUMNS.map((col) => `<td class="${col.id === "name" ? "c-name" : "num"}">${cell(c, col.id)}</td>`).join("");
      return `<tr><td class="num rank">${i + 1}</td>${tds}</tr>`;
    })
    .join("");
}

export function homeView(state) {
  let rows = [...COUNTRIES];
  if (state.region && state.region !== "All regions") rows = rows.filter((c) => c.region === state.region);
  if (state.q) {
    const q = state.q.toLowerCase();
    rows = rows.filter((c) => c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q));
  }
  const key = state.sort || "gdpPc";
  rows.sort((a, b) => {
    if (key === "name") return state.dir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    return state.dir === "asc" ? a[key] - b[key] : b[key] - a[key];
  });
  const heads = COLUMNS.map(
    (col) => `<th data-sort="${col.id}" class="${col.id === "name" ? "" : "num"}">${col.label}${sortArrow(state, col.id)}</th>`
  ).join("");
  const regionOpts = REGIONS.map(
    (r) => `<option value="${esc(r)}"${state.region === r ? " selected" : ""}>${esc(r)}</option>`
  ).join("");
  const top8 = rankedBy("gdpPc").slice(0, 8);
  const richest = rankedBy("gdpPc")[0];
  const longest = rankedBy("life")[0];
  const biggest = rankedBy("pop")[0];
  return `
  <section class="hero">
    <p class="kicker">THE WORLD IN NUMBERS · ${YEAR}</p>
    <h1>Every nation, every number, one table.</h1>
    <p class="lede">24 countries, 6 indicators, all from the ${SOURCE} (${YEAR}). Click any country for its full page, or any column to re-sort the world.</p>
  </section>
  <section class="panel">
    <div class="controls">
      <input id="q" type="search" placeholder="Search a country or capital…" value="${esc(state.q || "")}" aria-label="Search countries">
      <select id="region" aria-label="Filter by region">${regionOpts}</select>
      <span class="count">${rows.length} of 24 countries</span>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th class="num">#</th>${heads}</tr></thead>
      <tbody>${tableRows(rows, state)}</tbody>
    </table></div>
    <p class="foot">Source: ${SOURCE}, ${YEAR}. GDP per capita in current US$. <a href="#/sources">Full sources &amp; method →</a></p>
  </section>
  <section class="panel">
    <h2>Richest per person — GDP per capita, ${YEAR}</h2>
    ${barChart(top8, (c) => c.gdpPc, (c) => `<a href="#/country/${c.slug}">${esc(c.name)}</a>`, top8[0].gdpPc)}
    <p class="foot"><a href="#/indicator/gdpPc">See the full GDP-per-capita ranking →</a></p>
  </section>
  <section class="stories">
    <article><p class="big">${esc(biggest.name)}</p><p>${fmtPop(biggest.pop)} people — the largest population of the 24. India passed China in ${YEAR}.</p></article>
    <article><p class="big">${esc(richest.name)}</p><p>${fmtMoney(richest.gdpPc)} per person — the richest per head, more than 40× the lowest.</p></article>
    <article><p class="big">${esc(longest.name)}</p><p>${fmt(longest.life, 1)} years — the longest life expectancy, almost 30 years more than the shortest.</p></article>
  </section>
  <section class="panel indicators">
    <h2>Browse by indicator</h2>
    <div class="ind-grid">${INDICATORS.map((i) => `<a class="ind-card" href="#/indicator/${i.id}"><strong>${esc(i.label)}</strong><span>${esc(i.unit)} · ${i.code}</span></a>`).join("")}</div>
  </section>`;
}

export function countryView(slug, state) {
  const c = COUNTRIES.find((x) => x.slug === slug);
  if (!c) return `<section class="panel"><h1>Country not found</h1><p><a href="#/">Back to the table →</a></p></section>`;
  const cards = INDICATORS.map(
    (i) => `<article class="stat"><p class="stat-label">${esc(i.label)}</p><p class="stat-value">${i.id === "gdpPc" ? fmtMoney(c[i.id]) : i.id === "pop" ? fmtPop(c[i.id]) : i.id === "gdp" ? fmt(c[i.id], 0) : fmt(c[i.id], i.decimals)}</p><p class="stat-sub">${esc(i.unit)} · #${rankOf(slug, i.id)} of 24</p></article>`
  ).join("");
  const others = COUNTRIES.filter((x) => x.slug !== slug);
  const compare = others.slice(0, 3).map((o) => ({ slug: o.slug, name: o.name }));
  const pick = state.compare && COUNTRIES.find((x) => x.slug === state.compare && x.slug !== slug);
  const rival = pick || others.find((x) => x.slug === "japan") || others[0];
  const rows = INDICATORS.map((i) => {
    const a = c[i.id], b = rival[i.id];
    const winner = a === b ? "" : a > b ? "c" : "r";
    return `<tr><td>${esc(i.label)}</td><td class="num${winner === "c" ? " win" : ""}">${i.id === "gdpPc" ? fmtMoney(a) : fmt(a, i.decimals)}</td><td class="num${winner === "r" ? " win" : ""}">${i.id === "gdpPc" ? fmtMoney(b) : fmt(b, i.decimals)}</td></tr>`;
  }).join("");
  const opts = others.map((o) => `<option value="${o.slug}"${o.slug === rival.slug ? " selected" : ""}>${esc(o.name)}</option>`).join("");
  return `
  <section class="hero slim">
    <p class="kicker"><a href="#/">ALL COUNTRIES</a> · ${esc(c.region.toUpperCase())}</p>
    <h1>${esc(c.name)}</h1>
    <p class="lede">Capital ${esc(c.capital)} · ${SOURCE}, ${YEAR}. Ranked #${rankOf(slug, "gdpPc")} of 24 by GDP per capita and #${rankOf(slug, "life")} by life expectancy.</p>
  </section>
  <section class="stats">${cards}</section>
  <section class="panel">
    <h2>${esc(c.name)} vs <select id="rival" aria-label="Compare with">${opts}</select></h2>
    <table class="compare"><thead><tr><th>Indicator</th><th class="num">${esc(c.name)}</th><th class="num">${esc(rival.name)}</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="foot">Bold numbers win the row. Life expectancy shown with its bar on the home table's ranking page.</p>
  </section>
  <section class="panel">
    <h2>More countries</h2>
    <p class="chips">${compare.map((o) => `<a class="chip" href="#/country/${o.slug}">${esc(o.name)} →</a>`).join("")} <a class="chip" href="#/">All 24 →</a></p>
  </section>`;
}

export function indicatorView(id) {
  const ind = indicatorById(id);
  const ranked = rankedBy(ind.id);
  const top10 = ranked.slice(0, 10);
  const rows = ranked.map((c, i) => `<tr><td class="num rank">${i + 1}</td><td class="c-name"><a href="#/country/${c.slug}">${esc(c.name)}</a></td><td class="num">${ind.id === "gdpPc" ? fmtMoney(c[ind.id]) : ind.id === "pop" ? fmtPop(c[ind.id]) : fmt(c[ind.id], ind.decimals)}</td><td class="num">${esc(c.region)}</td></tr>`).join("");
  return `
  <section class="hero slim">
    <p class="kicker"><a href="#/">ALL INDICATORS</a> · ${YEAR}</p>
    <h1>${esc(ind.label)}</h1>
    <p class="lede">${esc(ind.unit)} · ${ind.code} · ${SOURCE}, ${YEAR}. ${esc(ranked[0].name)} leads at ${ind.id === "gdpPc" ? fmtMoney(ranked[0][ind.id]) : fmt(ranked[0][ind.id], ind.decimals)}; ${esc(ranked[23].name)} is last at ${ind.id === "gdpPc" ? fmtMoney(ranked[23][ind.id]) : fmt(ranked[23][ind.id], ind.decimals)}.</p>
  </section>
  <section class="panel">
    <h2>Top 10 — ${esc(ind.label)}</h2>
    ${barChart(top10, (c) => c[ind.id], (c) => `<a href="#/country/${c.slug}">${esc(c.name)}</a>`)}
  </section>
  <section class="panel">
    <h2>Full ranking — all 24 countries</h2>
    <div class="table-wrap"><table><thead><tr><th class="num">#</th><th>Country</th><th class="num">${esc(ind.label)}</th><th class="num">Region</th></tr></thead><tbody>${rows}</tbody></table></div>
    <p class="foot">Source: ${SOURCE}, ${YEAR} · ${ind.code}. <a href="#/sources">Method &amp; rounding →</a></p>
  </section>
  <section class="panel indicators">
    <h2>Other indicators</h2>
    <div class="ind-grid">${INDICATORS.filter((i) => i.id !== ind.id).map((i) => `<a class="ind-card" href="#/indicator/${i.id}"><strong>${esc(i.label)}</strong><span>${esc(i.unit)}</span></a>`).join("")}</div>
  </section>`;
}

export function sourcesView() {
  const rows = INDICATORS.map((i) => `<tr><td>${esc(i.label)}</td><td>${esc(i.unit)}</td><td><code>${i.code}</code></td></tr>`).join("");
  return `
  <section class="hero slim">
    <p class="kicker">SOURCES &amp; METHOD</p>
    <h1>Where every number comes from</h1>
    <p class="lede">All 144 figures (24 countries × 6 indicators) are ${SOURCE} values for ${YEAR}, fetched from the World Bank API on 2026-11-26 and rounded as shown below. No figure is estimated or invented.</p>
  </section>
  <section class="panel">
    <h2>Indicators</h2>
    <div class="table-wrap"><table><thead><tr><th>Indicator</th><th>Unit</th><th>World Bank code</th></tr></thead><tbody>${rows}</tbody></table></div>
  </section>
  <section class="panel">
    <h2>Method &amp; rounding</h2>
    <ul class="method">
      <li>Population is shown in millions, to one decimal place; GDP in US$ billions, whole numbers; GDP per capita in current US$, whole dollars.</li>
      <li>Life expectancy to one decimal; fertility to two decimals; urban share to one decimal.</li>
      <li>Country names follow the World Bank's short names; “Turkiye” is the Bank's spelling. Capitals are the seat of government.</li>
      <li>Ranks are computed live from the same 24-country set — #1 is the highest value for that indicator.</li>
      <li>The site runs entirely offline from its own files: no network request, no tracking, no cookies.</li>
    </ul>
    <p class="foot"><a href="#/">Back to the table →</a></p>
  </section>`;
}

export function render(route, state) {
  if (route.page === "country") return countryView(route.slug, state);
  if (route.page === "indicator") return indicatorView(route.slug);
  if (route.page === "sources") return sourcesView();
  return homeView(state);
}
