initCategoryFilters();

initHistoricalOpacityControl();

loadPois(getActiveCategories());

loadPolygonLayer(data_paths.factory_sites, factory_layer_group, factory_style);

loadPolygonLayer(data_paths.workers_settlements, workers_layer_group, workers_style);

loadRoute();