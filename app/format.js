// Number formatting for the atlas: one job, used by every view.
export function fmt(value, decimals) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
export function fmtMoney(value) {
  return "$" + fmt(value, 0);
}
export function fmtPop(value) {
  return fmt(value, 1) + "m";
}
export function shortNum(value) {
  if (value >= 1000) return fmt(value / 1000, 1) + "k";
  return fmt(value, 0);
}
export function esc(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
