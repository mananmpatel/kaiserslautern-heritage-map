const map = L.map("map", {
  zoomControl: false
}).setView([49.443, 7.768], 14);

L.control.zoom({
  position: "topright"
}).addTo(map);

const poi_colors = {
  former_industrial_site: "#3f3f46",
  workers_settlement: "#8b5e34",
  cultural_site: "#7e22ce",
  historical_landmark: "#2563eb",
  urban_development_site: "#f97316",
  public_space: "#16a34a"
};

const osm_layer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const historical_map_bounds = [
  [49.134048, 6.761787],
  [49.536399, 7.990851]
];

// const historical_map_bounds = [
//   [49.144048, 6.721787],
//   [49.546399, 7.950851]
// ];

const historical_map_layer = L.imageOverlay("assets/historical/kaiserslautern_1893_original.jpg", historical_map_bounds, {
  opacity: 0.65
}).addTo(map);

const poi_layer_group = L.layerGroup().addTo(map);
const factory_layer_group = L.layerGroup().addTo(map);
const workers_layer_group = L.layerGroup().addTo(map);
const route_layer_group = L.layerGroup().addTo(map);

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

function getPoiIcon(category) {
  const color = poi_colors[category] || "#111827";

  return L.divIcon({
    className: "poi-marker",
    html: `<span style="background:${color}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });
}

function createPopup(properties) {
  const period_html = properties.historical_period ? `<p><strong>Period:</strong> ${properties.historical_period}</p>` : "";
  const relevance_html = properties.historical_relevance ? `<p><strong>Historical relevance:</strong> ${properties.historical_relevance}</p>` : "";
  const distance_html = properties.estimated_distance ? `<p><strong>Estimated distance:</strong> ${properties.estimated_distance}</p>` : "";
  const walking_time_html = properties.estimated_walking_time ? `<p><strong>Estimated walking time:</strong> ${properties.estimated_walking_time}</p>` : "";
  const stops_html = properties.main_stops ? `<p><strong>Main stops:</strong> ${properties.main_stops.join(", ")}</p>` : "";
  // const category_html = properties.category ? `<p style = "display:none"><strong>Area type:</strong> ${properties.category}</p>` : "";
  // const current_use_html = properties.current_use ? `<p style = "display:none"><strong>Current use:</strong> ${properties.current_use}</p>` : "";
  const source_html = properties.source ? `<p><a href="${properties.source}" target="_blank" rel="noopener">Source</a></p>` : "";

  // ${category_html}
  // ${current_use_html}

  return `
    <article class="popup-card">
      <h3>${properties.name}</h3>
      <p>${properties.description || ""}</p>
      ${period_html}
      ${relevance_html}
      ${distance_html}
      ${walking_time_html}
      ${stops_html}
      ${source_html}
    </article>
  `;
}

function addPoiFeature(feature, latlng) {
  const category = feature.properties.category;

  return L.marker(latlng, {
    icon: getPoiIcon(category),
    category: category
  }).bindPopup(createPopup(feature.properties));
}

async function loadPois(active_categories = null) {
  const response = await fetch("data/pois.geojson");
  const data = await response.json();

  poi_layer_group.clearLayers();

  L.geoJSON(data, {
    filter: (feature) => {
      if (!active_categories) {
        return true;
      }

      return active_categories.includes(feature.properties.category);
    },
    pointToLayer: addPoiFeature
  }).addTo(poi_layer_group);
}

async function loadPolygonLayer(file_path, target_group, style_options) {
  const response = await fetch(file_path);
  const data = await response.json();

  target_group.clearLayers();

  L.geoJSON(data, {
    style: style_options,
    onEachFeature: (feature, layer) => {
      layer.bindPopup(createPopup(feature.properties));
    }
  }).addTo(target_group);
}

async function loadRoute() {
  const response = await fetch("data/route.geojson");
  const data = await response.json();

  route_layer_group.clearLayers();

  L.geoJSON(data, {
    style: {
      color: "#dc2626",
      weight: 5,
      opacity: 0.9,
      dashArray: "8 8"
    },
    onEachFeature: (feature, layer) => {
      layer.bindPopup(createPopup(feature.properties));
    }
  }).addTo(route_layer_group);
}

function getActiveCategories() {
  return Array.from(document.querySelectorAll(".category-filter:checked")).map((checkbox) => checkbox.value);
}

document.querySelectorAll(".category-filter").forEach((input) => {
  input.addEventListener("change", () => {
    loadPois(getActiveCategories());
  });
});

const historical_opacity_input = document.querySelector("#historical-opacity");

if (historical_opacity_input) {
  historical_opacity_input.addEventListener("input", () => {
    historical_map_layer.setOpacity(Number(historical_opacity_input.value));
  });
}

loadPois(getActiveCategories());

loadPolygonLayer("data/factory_sites.geojson", factory_layer_group, {
  color: "#27272a",
  weight: 2,
  fillColor: "#3f3f46",
  fillOpacity: 0.35
});

loadPolygonLayer("data/workers_settlements.geojson", workers_layer_group, {
  color: "#8b5e34",
  weight: 2,
  dashArray: "6 6",
  fillColor: "#d6b48c",
  fillOpacity: 0.45
});

loadRoute();
