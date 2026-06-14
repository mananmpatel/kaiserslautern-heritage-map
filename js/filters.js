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