const map = L.map("map").setView([49.4401, 7.7491], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

fetch("data/pois.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        const name = feature.properties.name;
        const category = feature.properties.category;
        const description = feature.properties.description;

        layer.bindPopup(`
          <strong>${name}</strong><br>
          ${category}<br>
          ${description}
        `);
      }
    }).addTo(map);
  });