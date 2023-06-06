mapboxgl.accessToken = mapBoxToken

function initializeMap() {
    map = new mapboxgl.Map({
        container: "map-locate",
        style: "mapbox://styles/mapbox/light-v11",
        center: fest.geometry.coordinates,
        zoom: 10,
    });
    map.on('load', () => {
        map.resize()
    })
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    new mapboxgl.Marker()
        .setLngLat(fest.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    `<h3>${fest.title}</h3><p class="adress">${fest.mailing_adress}<br>${fest.zip_code} ${fest.municipality}</p>`
                )
        )
        .addTo(map);
}





// function resizeMap() {
//     const mapContainer = document.getElementById("map-locate");
//     const width = mapContainer.offsetWidth;
//     const height = mapContainer.offsetHeight;
//     map.resize();
// }

// window.addEventListener("resize", resizeMap);
document.querySelector('.btn-locate').addEventListener("click", () => {
    initializeMap()
});