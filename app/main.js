// Router + hash state for the atlas. State lives in the URL hash, so any
// view — a search, a sort, a country comparison — is a shareable link.
import { render } from "./views.js";

const page = document.getElementById("page");

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [pathPart, queryPart] = raw.split("?");
  const parts = pathPart.split("/").filter(Boolean);
  const params = new URLSearchParams(queryPart || "");
  const state = {
    q: params.get("q") || "",
    region: params.get("region") || "All regions",
    sort: params.get("sort") || "gdpPc",
    dir: params.get("dir") || "desc",
    compare: params.get("vs") || "",
  };
  if (parts[0] === "country" && parts[1]) return { page: "country", slug: parts[1], state };
  if (parts[0] === "indicator" && parts[1]) return { page: "indicator", slug: parts[1], state };
  if (parts[0] === "sources") return { page: "sources", slug: "", state };
  return { page: "home", slug: "", state };
}

function go(path, params) {
  const qs = new URLSearchParams(params || {});
  for (const [k, v] of [...qs]) if (!v || v === "All regions") qs.delete(k);
  const q = qs.toString();
  location.hash = "#/" + path + (q ? "?" + q : "");
}

function draw() {
  const route = parseHash();
  page.innerHTML = render(route, route.state);
  document.querySelectorAll("nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === route.page));
  const q = document.getElementById("q");
  if (q) {
    q.addEventListener("input", () => {
      const p = new URLSearchParams({ q: q.value, region: route.state.region, sort: route.state.sort, dir: route.state.dir });
      history.replaceState(null, "", "#/?" + p.toString());
      draw();
    });
    q.addEventListener("change", () => go("", { q: q.value, region: route.state.region, sort: route.state.sort, dir: route.state.dir }));
  }
  const region = document.getElementById("region");
  if (region) region.addEventListener("change", () => go("", { q: route.state.q, region: region.value, sort: route.state.sort, dir: route.state.dir }));
  document.querySelectorAll("th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      const col = th.dataset.sort;
      const dir = route.state.sort === col && route.state.dir === "desc" ? "asc" : "desc";
      go("", { q: route.state.q, region: route.state.region, sort: col, dir });
    });
  });
  const rival = document.getElementById("rival");
  if (rival) rival.addEventListener("change", () => go("country/" + route.slug, { vs: rival.value }));
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", draw);
draw();
window.__shotReady = true;
