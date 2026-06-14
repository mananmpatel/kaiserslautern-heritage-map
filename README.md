# Kaiserslautern Heritage Map

An interactive web map about industrial heritage and urban history in Kaiserslautern, Germany.

The map shows selected points of interest, factory areas, workers' settlement areas, a historical map overlay, and a suggested walking route.

## Project link

[Project link is here.](https://mananmpatel.github.io/kaiserslautern-heritage-map/)

## About the project

This project was created for a web mapping / GIS assignment focused on Kaiserslautern.

The main idea is to show different historical and urban layers of the city in one interactive map. The project focuses on places such as former industrial sites, workers' settlements, cultural sites, historical landmarks, public spaces, and redevelopment areas.

## Main features

* Interactive Leaflet map centered on Kaiserslautern
* OpenStreetMap base map
* Historical map image overlay
* Opacity slider for the historical map
* Categorized POI markers
* Category filters
* Factory site polygons
* Workers' settlement polygons
* Suggested walking route
* Layer control
* Popup information for map features
* Responsive sidebar layout

## Technologies used

* HTML
* CSS
* JavaScript
* Leaflet.js
* GeoJSON
* OpenStreetMap
* GitHub Pages

QGIS is planned for improving coordinate accuracy, polygon boundaries, and the walking route.

## Project structure

```text
├── index.html
├── css
│   └── style.css
├── js
│   ├── config.js
│   ├── map.js
│   ├── popups.js
│   ├── layers.js
│   ├── filters.js
│   └── main.js
├── data
│   ├── pois.geojson
│   ├── factory_sites.geojson
│   ├── workers_settlements.geojson
│   └── route.geojson
├── assets
│   └── historical
│       └── kaiserslautern_1893_web.jpg
└── README.md
```

## Data

The map currently uses GeoJSON files for:

* POIs
* Factory site polygons
* Workers' settlement polygons
* Suggested route

The current data is suitable for the MVP version. Some coordinates and polygon boundaries are approximate and will be refined later using QGIS.

## Current POI categories

* Former industrial sites
* Workers' settlements
* Cultural sites
* Historical landmarks
* Urban development sites
* Public spaces

## How to run locally

Open the project folder and run a local server:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

The project should be opened through a local server because it loads GeoJSON files with `fetch`.

## Sources

Main sources used for the starter content:

* Kaiserslautern city website
* Pfaff-Quartier
* Kammgarn information pages
* Fruchthalle information pages
* Theodor-Zink-Museum / Stadtmuseum Kaiserslautern
* Kaiserslautern Hauptbahnhof
* OpenStreetMap
* Leaflet.js

Source links are also included inside the GeoJSON feature properties where possible.

## Current limitations

This is still an MVP version.

Known limitations:

* Some POI coordinates need to be checked more accurately.
* Polygon boundaries are approximate.
* The walking route is temporary and does not yet fully follow real pedestrian paths.
* The historical map overlay is useful for visual comparison, but it still needs more accurate georeferencing.
* More POIs can be added later.

## Planned improvements

* Add more POIs
* Improve coordinates using QGIS
* Redraw polygons more accurately in QGIS
* Create a better walking route in QGIS
* Improve mobile layout
* Add screenshots to the README
* Add more detailed data documentation