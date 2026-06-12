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

const poi_layer_group = L.layerGroup().addTo(map);

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
  return `
    <article class="popup-card">
      <h3>${properties.name}</h3>
      <p>${properties.description || ""}</p>
      <p><strong>Period:</strong> ${properties.historical_period || ""}</p>
      <p><strong>Historical relevance:</strong> ${properties.historical_relevance || ""}</p>
      <p><a href="${properties.source}" target="_blank" rel="noopener">Source</a></p>
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

function getActiveCategories() {
  return Array.from(document.querySelectorAll(".category-filter:checked")).map((checkbox) => checkbox.value);
}

document.querySelectorAll(".category-filter").forEach((input) => {
  input.addEventListener("change", () => {
    loadPois(getActiveCategories());
  });
});

loadPois(getActiveCategories());
