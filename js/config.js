const map_center = [49.443, 7.768];
const default_zoom = 14;

const data_paths = {
  pois: "data/pois.geojson",
  factory_sites: "data/factory_sites.geojson",
  workers_settlements: "data/workers_settlements.geojson",
  route: "data/route.geojson",
  historical_map: "assets/historical/kaiserslautern_1893_compressed.jpg"
};

const poi_colors = {
  former_industrial_site: "#3f3f46",
  workers_settlement: "#8b5e34",
  cultural_site: "#7e22ce",
  historical_landmark: "#2563eb",
  urban_development_site: "#f97316",
  public_space: "#16a34a"
};

// const historical_map_bounds = [
//   [49.134048, 6.761787],
//   [49.536399, 7.990851]
// ];

const historical_map_bounds = [
  [49.144048, 6.721787],
  [49.546399, 7.950851]
];

const factory_style = {
  color: "#27272a",
  weight: 2,
  fillColor: "#3f3f46",
  fillOpacity: 0.35
};

const workers_style = {
  color: "#8b5e34",
  weight: 2,
  dashArray: "6 6",
  fillColor: "#d6b48c",
  fillOpacity: 0.45
};

const route_style = {
  color: "#dc2626",
  weight: 5,
  opacity: 0.9,
  dashArray: "8 8"
};
