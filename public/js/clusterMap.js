fests.features.forEach(feature => {
    feature.properties.attendance = feature.attendance
});
mapboxgl.accessToken = mapBoxToken;
const map = new mapboxgl.Map({
    container: 'cluster-map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v11',
    center: [2.2, 46],
    zoom: getInitialZoomAndLegendPosition().zoom
});
const nav = new mapboxgl.NavigationControl();
map.addControl(nav);
map.on('load', () => {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('fests', {
        type: 'geojson',
        // Point to GeoJSON data.
        data: fests,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        clusterProperties: {
            // Calculate the maximum attendance within each cluster
            maxAttendance: ['max', ['get', 'attendance']]
        }
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'fests',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
                'step',
                ['get', 'maxAttendance'],
                '#EBCCFF',
                30000,
                '#E3A3FF',
                40000,
                '#E27AFF',
                50000,
                '#E852FF',
                60000,
                '#F229FF',
                70000,
                '#FF00FE',
                80000,
                '#D5009A',
                90000,
                '#AA0048',
                100000,
                '#80000C'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                10,
                20,
                30,
                25
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'fests',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
        },
        paint: {
            "text-color": "#ffffff"
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'fests',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': [
                'step',
                ['get', 'attendance'],
                '#EBCCFF',
                30000,
                '#E3A3FF',
                40000,
                '#E27AFF',
                50000,
                '#E852FF',
                60000,
                '#F229FF',
                70000,
                '#FF00FE',
                80000,
                '#D5009A',
                90000,
                '#AA0048',
                100000,
                '#80000C'
            ],
            'circle-radius': 5,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('fests').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const { popUpMarkup } = e.features[0].properties;
        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                popUpMarkup
            )
            .addTo(map);
    });

    map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = '';
    });
    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });
    createLegend();
});

function getInitialZoomAndLegendPosition() {
    // Calculez le zoom initial en fonction de la taille de l'écran
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        return { 'zoom': 4, 'legendPosition': 'out' }; // Zoom pour les petits écrans
    } else if (screenWidth >= 768 && screenWidth < 1024) {
        return { 'zoom': 4, 'legendPosition': 'in' }; // Zoom pour les écrans moyens
    } else {
        return { 'zoom': 5, 'legendPosition': 'in' }; // Zoom pour les grands écrans
    }
}

// Ajoutez un événement de redimensionnement à la fenêtre pour ajuster le zoom en fonction de la taille de l'écran
window.addEventListener('resize', () => {
    map.setZoom(getInitialZoomAndLegendPosition().zoom);
});

function createLegend() {
    const legendContainer = document.getElementById('cluster-map');

    const legend = document.createElement("div");
    legend.setAttribute("class", 'legend');
    const legendColors = [
        { color: '#EBCCFF', attendance: 'Moins de 30' },
        { color: '#E3A3FF', attendance: '30-40' },
        { color: '#E27AFF', attendance: '40-50' },
        { color: '#E852FF', attendance: '50-60' },
        { color: '#F229FF', attendance: '60-70' },
        { color: '#FF00FE', attendance: '70-80' },
        { color: '#D5009A', attendance: '80-90' },
        { color: '#AA0048', attendance: '90-100' },
        { color: '#80000C', attendance: 'Plus de 100' }
    ];

    let legendHTML = '<span>Nombre d\'entrée (en millier de places vendues en 2019)</span > ';

    for (const colorItem of legendColors) {
        const { color, attendance } = colorItem;
        legendHTML += `<div><span class="legend-color" style="background-color: ${color};"></span>${attendance}</div>`;
    }
    legend.innerHTML = legendHTML;
    legendContainer.append(legend)

}