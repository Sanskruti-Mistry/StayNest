mapboxgl.accessToken = mapToken;  // From show.ejs

// ✅ Default fallback location (India center)
const defaultCoordinates = [78.9629, 20.5937];

let coordinates = defaultCoordinates;
let hasValidCoordinates = false;

if (mapToken && listing && listing.geometry && Array.isArray(listing.geometry.coordinates) && listing.geometry.coordinates.length === 2) {
    coordinates = listing.geometry.coordinates;
    hasValidCoordinates = true;
} else {
    console.warn('Mapbox: Invalid or missing geometry.coordinates; using default. Check listing data.');
}

// ✅ Create the map
const map = new mapboxgl.Map({
    container: 'map',
    center: coordinates,
    zoom: hasValidCoordinates ? 12 : 4,  // Closer zoom if valid coords
});

// ✅ Add marker and popup
const popupContent = hasValidCoordinates 
    ? `<h4>${listing.title}</h4><p>${listing.location}, ${listing.country}</p><p>Exact location provided after booking</p>`
    : `<h4>No Location Data</h4><p>Showing approximate area. Update listing for precise map.</p>`;

new mapboxgl.Marker({ color: hasValidCoordinates ? "red" : "gray" })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
    .addTo(map);

// ✅ Optional: Fit map bounds if needed (e.g., add padding)
map.on('load', () => {
    if (!hasValidCoordinates) {
        console.warn('Mapbox: Consider adding location to listing for better UX.');
    }
});