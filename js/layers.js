function getPoiIcon(category) {
  const color = poi_colors[category] || "#111827";

  return L.divIcon({
    className: "poi-marker",
    html: `<span style="background:${color}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });
}

function addPoiFeature(feature, latlng) {
  const category = feature.properties.category;

  return L.marker(latlng, {
    icon: getPoiIcon(category),
    category: category
  }).bindPopup(createPopup(feature.properties));
}

async function loadPois(active_categories = null) {
  const response = await fetch(data_paths.pois);
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
  const response = await fetch(data_paths.route);
  const data = await response.json();

  route_layer_group.clearLayers();

  L.geoJSON(data, {
    style: route_style,
    onEachFeature: (feature, layer) => {
      layer.bindPopup(createPopup(feature.properties));
    }
  }).addTo(route_layer_group);
}