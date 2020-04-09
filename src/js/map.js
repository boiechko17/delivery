mapboxgl.accessToken = 'pk.eyJ1IjoidmxkbXIxNyIsImEiOiJjazh0M2c1ZnIwaGhwM2VvNTVub3hxb25rIn0.XP3bQ2CqlqrbnrVlmSAH6g';

//Створюємо карту
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [30.474121, 50.431898],
    zoom: 13
});

//Додаємо елементи зближення
map.addControl(new mapboxgl.NavigationControl());

var layerList = document.getElementById('map__menu');
var inputs = layerList.getElementsByTagName('input');
 
function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
}
 
for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

//Ініціалізуємо текст та стилі маркера
var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [30.474121, 50.431898]
        },
        properties: {
            title: 'м. Київ',
            description: ' вул. Василя Липківського, 39<br> 10 хв від вокзалу <br> <a href="tel:380996763412" style="color: #3a3a3a;;">Тел: +38 (099) 676-34-12<a> <br> <a href="#" style="color: #ec644b;">globalopt@gmail.com<a>'
        }
    }]
};
//Додаємо маркер до карти
geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);

    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3 style="font-size:16px;font-weight:700;color: #ec644b;">' + marker.properties.title + '</h3><p style="font-size:14px;font-weight:300;color: #3a3a3a;">' + marker.properties.description + '</p>'))
    .addTo(map);
});

  
// при зближенні появляються будинки
map.on('load', function() {
    
    var layers = map.getStyle().layers;
     
    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }
     
    map.addLayer(
        {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': [  
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        },
        labelLayerId
    );
});