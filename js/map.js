const map = L.map("map", {
  zoomControl: false
}).setView(map_center, default_zoom);

L.control.zoom({
  position: "topright"
}).addTo(map);

const osm_layer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const historical_map_layer = L.imageOverlay(data_paths.historical_map, historical_map_bounds, {
  opacity: 0.65
});

const poi_layer_group = L.layerGroup().addTo(map);
const factory_layer_group = L.layerGroup().addTo(map);
const workers_layer_group = L.layerGroup().addTo(map);
const route_layer_group = L.layerGroup();

const base_layers = {
  "OpenStreetMap": osm_layer
};

const overlay_layers = {
  "Kaiserslautern 1893 map": historical_map_layer,
  "POIs": poi_layer_group,
  "Factory sites": factory_layer_group,
  "Workers' settlements": workers_layer_group,
  "Suggested walking route": route_layer_group
};

L.control.layers(base_layers, overlay_layers, {
  collapsed: false,
  position: "topright"
}).addTo(map);