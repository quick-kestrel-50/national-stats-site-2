// World Atlas of Nations — figures, World Bank WDI 2023 (fetched fresh 2026-11-26).
// pop: millions of people. gdpPc: GDP per capita, current US$. gdp: GDP, US$ billions.
// life: life expectancy at birth, years. fert: children per woman. urban: % of people in cities.
export const YEAR = 2023;
export const SOURCE = "World Bank, World Development Indicators";
export const INDICATORS = [
  { id: "pop", label: "Population", unit: "million people", code: "SP.POP.TOTL", decimals: 1 },
  { id: "gdpPc", label: "GDP per capita", unit: "current US$", code: "NY.GDP.PCAP.CD", decimals: 0 },
  { id: "gdp", label: "GDP", unit: "US$ billions", code: "NY.GDP.MKTP.CD", decimals: 0 },
  { id: "life", label: "Life expectancy", unit: "years", code: "SP.DYN.LE00.IN", decimals: 1 },
  { id: "fert", label: "Fertility rate", unit: "children per woman", code: "SP.DYN.TFRT.IN", decimals: 2 },
  { id: "urban", label: "Urban population", unit: "% of population", code: "SP.URB.TOTL.IN.ZS", decimals: 1 },
];
export const COUNTRIES = [
  { slug: "usa", name: "United States", capital: "Washington, D.C.", region: "North America", pop: 336.8, gdpPc: 82587, gdp: 27812, life: 78.4, fert: 1.62, urban: 80.1 },
  { slug: "china", name: "China", capital: "Beijing", region: "Asia", pop: 1410.7, gdpPc: 12951, gdp: 18270, life: 78.0, fert: 1.00, urban: 65.5 },
  { slug: "india", name: "India", capital: "New Delhi", region: "Asia", pop: 1438.1, gdpPc: 2434, gdp: 3501, life: 72.0, fert: 1.98, urban: 35.1 },
  { slug: "japan", name: "Japan", capital: "Tokyo", region: "Asia", pop: 124.5, gdpPc: 35215, gdp: 4385, life: 84.0, fert: 1.20, urban: 92.1 },
  { slug: "germany", name: "Germany", capital: "Berlin", region: "Europe", pop: 83.3, gdpPc: 54777, gdp: 4562, life: 81.0, fert: 1.39, urban: 81.9 },
  { slug: "uk", name: "United Kingdom", capital: "London", region: "Europe", pop: 68.5, gdpPc: 49920, gdp: 3421, life: 81.2, fert: 1.56, urban: 83.2 },
  { slug: "france", name: "France", capital: "Paris", region: "Europe", pop: 68.4, gdpPc: 44700, gdp: 3056, life: 82.8, fert: 1.66, urban: 78.8 },
  { slug: "brazil", name: "Brazil", capital: "Brasilia", region: "South America", pop: 211.1, gdpPc: 10378, gdp: 2191, life: 75.8, fert: 1.62, urban: 87.6 },
  { slug: "canada", name: "Canada", capital: "Ottawa", region: "North America", pop: 40.0, gdpPc: 54848, gdp: 2197, life: 81.6, fert: 1.27, urban: 82.5 },
  { slug: "australia", name: "Australia", capital: "Canberra", region: "Oceania", pop: 26.7, gdpPc: 65058, gdp: 1734, life: 83.1, fert: 1.50, urban: 87.5 },
  { slug: "korea", name: "South Korea", capital: "Seoul", region: "Asia", pop: 51.7, gdpPc: 35674, gdp: 1845, life: 83.4, fert: 0.72, urban: 81.2 },
  { slug: "italy", name: "Italy", capital: "Rome", region: "Europe", pop: 59.0, gdpPc: 39280, gdp: 2317, life: 83.4, fert: 1.21, urban: 69.5 },
  { slug: "spain", name: "Spain", capital: "Madrid", region: "Europe", pop: 48.4, gdpPc: 33493, gdp: 1619, life: 83.9, fert: 1.12, urban: 80.1 },
  { slug: "mexico", name: "Mexico", capital: "Mexico City", region: "North America", pop: 129.7, gdpPc: 13831, gdp: 1794, life: 75.1, fert: 1.91, urban: 79.5 },
  { slug: "indonesia", name: "Indonesia", capital: "Jakarta", region: "Asia", pop: 281.2, gdpPc: 4876, gdp: 1371, life: 71.1, fert: 2.13, urban: 58.1 },
  { slug: "turkey", name: "Turkiye", capital: "Ankara", region: "Asia", pop: 85.3, gdpPc: 13375, gdp: 1141, life: 77.2, fert: 1.51, urban: 89.0 },
  { slug: "nigeria", name: "Nigeria", capital: "Abuja", region: "Africa", pop: 227.9, gdpPc: 2139, gdp: 487, life: 54.5, fert: 4.48, urban: 62.2 },
  { slug: "egypt", name: "Egypt", capital: "Cairo", region: "Africa", pop: 114.5, gdpPc: 3457, gdp: 396, life: 71.6, fert: 2.75, urban: 42.7 },
  { slug: "kenya", name: "Kenya", capital: "Nairobi", region: "Africa", pop: 55.3, gdpPc: 1943, gdp: 108, life: 63.6, fert: 3.21, urban: 31.6 },
  { slug: "argentina", name: "Argentina", capital: "Buenos Aires", region: "South America", pop: 45.5, gdpPc: 14262, gdp: 649, life: 77.4, fert: 1.50, urban: 92.2 },
  { slug: "netherlands", name: "Netherlands", capital: "Amsterdam", region: "Europe", pop: 17.9, gdpPc: 63516, gdp: 1135, life: 81.9, fert: 1.43, urban: 95.3 },
  { slug: "sweden", name: "Sweden", capital: "Stockholm", region: "Europe", pop: 10.5, gdpPc: 54950, gdp: 579, life: 83.3, fert: 1.45, urban: 88.6 },
  { slug: "switzerland", name: "Switzerland", capital: "Bern", region: "Europe", pop: 8.9, gdpPc: 104450, gdp: 928, life: 84.2, fert: 1.33, urban: 85.2 },
  { slug: "poland", name: "Poland", capital: "Warsaw", region: "Europe", pop: 36.7, gdpPc: 22145, gdp: 812, life: 78.3, fert: 1.20, urban: 59.9 },
];
export const REGIONS = ["All regions", "Africa", "Asia", "Europe", "North America", "Oceania", "South America"];
export function rankOf(slug, indicatorId) {
  const sorted = [...COUNTRIES].sort((a, b) => b[indicatorId] - a[indicatorId]);
  return sorted.findIndex((c) => c.slug === slug) + 1;
}
export function rankedBy(indicatorId) {
  return [...COUNTRIES].sort((a, b) => b[indicatorId] - a[indicatorId]);
}
