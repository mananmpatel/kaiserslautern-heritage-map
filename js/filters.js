function getActiveCategories() {
  return Array.from(document.querySelectorAll(".category-filter:checked")).map((checkbox) => checkbox.value);
}

function initCategoryFilters() {
  document.querySelectorAll(".category-filter").forEach((input) => {
    input.addEventListener("change", () => {
      loadPois(getActiveCategories());
    });
  });
}

function initHistoricalOpacityControl() {
  const historical_opacity_input = document.querySelector("#historical-opacity");

  if (!historical_opacity_input) {
    return;
  }

  historical_opacity_input.addEventListener("input", () => {
    historical_map_layer.setOpacity(Number(historical_opacity_input.value));
  });
}

function toggleLayerInfoSection(section_id, is_visible) {
    const section = document.getElementById(section_id);

    if (!section) {
        return;
    }

    section.classList.toggle("is-hidden", !is_visible);
}

function syncLayerInfoSection() {
    toggleLayerInfoSection("historical-map-section", map.hasLayer(historical_map_layer));
    toggleLayerInfoSection("route-section", map.hasLayer(route_layer_group));
}

function initLayerInfoSections() {
    syncLayerInfoSection();

    map.on("overlayadd", (event) => {
        if (event.layer === historical_map_layer || event.layer === route_layer_group) {
            syncLayerInfoSection();
        }
    });

    map.on("overlayremove", (event) => {
        if (event.layer === historical_map_layer || event.layer === route_layer_group) {
            syncLayerInfoSection();
        }
    });
}