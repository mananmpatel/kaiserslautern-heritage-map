function createPopup(properties) {
  const period_html = properties.historical_period ? `<p><strong>Period:</strong> ${properties.historical_period}</p>` : "";
  const relevance_html = properties.historical_relevance ? `<p><strong>Historical relevance:</strong> ${properties.historical_relevance}</p>` : "";
//   const current_use_html = properties.current_use ? `<p><strong>Current use:</strong> ${properties.current_use}</p>` : "";
  const distance_html = properties.estimated_distance ? `<p><strong>Estimated distance:</strong> ${properties.estimated_distance}</p>` : "";
  const walking_time_html = properties.estimated_walking_time ? `<p><strong>Estimated walking time:</strong> ${properties.estimated_walking_time}</p>` : "";
  const stops_html = properties.main_stops ? `<p><strong>Main stops:</strong> ${formatStops(properties.main_stops)}</p>` : "";
  const source_html = properties.source ? `<p><a href="${properties.source}" target="_blank" rel="noopener">Source</a></p>` : "";

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

function formatLabel(value) {
  return String(value).replaceAll("_", " ");
}

function formatStops(stops) {
  if (Array.isArray(stops)) {
    return stops.join(", ");
  }

  return stops;
}