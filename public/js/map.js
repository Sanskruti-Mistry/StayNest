// mapboxgl.accessToken = mapToken;

// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
//     zoom: 9 // starting zoom
// });

// const marker = new mapboxgl.Marker()({color: "red"})
//     .setLngLat(listing.geometry.coordinates)
//     .setPopup(new mapboxgl.Popup({offset: 25})
//     .setHTML(
//         `<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`
//     ))
//     .addTo(map);



mapboxgl.accessToken = mapToken;

// ✅ Default fallback location (India center)
const defaultCoordinates = [78.9629, 20.5937];

let coordinates = defaultCoordinates;
let hasCoordinates = false;

if (listing && listing.geometry && Array.isArray(listing.coordinates)) {
    coordinates = listing.coordinates;
    hasCoordinates = true;
}

// ✅ Create the map
const map = new mapboxgl.Map({
    container: 'map',
    center: coordinates,
    zoom: 9,
});

// ✅ Conditionally add marker
new mapboxgl.Marker({ color: hasCoordinates ? "red" : "gray" })
    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h4>${listing.title}</h4>
            <p>${hasCoordinates ? "Exact location will be provided after booking" : "Location not available, showing default"}</p>`
        )
    )
    .addTo(map);
