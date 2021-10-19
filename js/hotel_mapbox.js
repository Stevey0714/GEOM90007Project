mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmV5MDcxNCIsImEiOiJja3ViZXFsNjQwcTRhMzFsa3M5Nm81OXM5In0.a7ArxS12SXuKJgTSEL1hpQ'
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: "mapbox://styles/stevey0714/ckubeyvwd0nm417oiqixxwt52/draft",
    center: [144.965, -37.814], // starting position [lng, lat]
    zoom: 14.0, // starting zoom
});

function getStars(num){
    var output = "<span>";
    for (var i=0; i < 5; i++) {
        if (num >= 1) {
            output += '<i class="fas fa-star"></i>';
            num--;
        } else if (num === 0.5) {
            output += '<i class="fas fa-star-half-alt"></i>';
            num = 0;
        } else {
            output += '<i class="far fa-star"></i>';
        }
    }
    output += "</span>"
    return output;
}


function rating_slider_change(values) {
    var min, max;
    min = parseFloat(values.split(", ")[0]);
    max = parseFloat(values.split(', ')[1]);
    map.setFilter('points', ['>', ['get', 'rating'], min], ["<=", ['get', 'rating'], max]);
}

function price_slider_change(values) {
    var min, max;
    min = parseFloat(values.split(", ")[0]);
    max = parseFloat(values.split(', ')[1]);
    map.setFilter('points', ['>', ['get', 'price'], min], ["<=", ['get', 'price'], max]);
}

function add_rankings() {
    var ranking_list = document.getElementById('rankings');
    var rank_list = "<h3>Rankings: </h3><div class='cards' style='overflow: auto; max-height: 320px;'>";
    for (var data of hotel_data['features']) {
        rank_list += '<div class="rankingCard" onclick="flyTo(' + data["geometry"]["coordinates"] + ')">' + data['properties']['rank'].toString() + '.\t' + data['properties']['name'] + '</div>';
    }
    rank_list += "</div>"
    ranking_list.innerHTML = rank_list;
}

function flyTo(x, y) {
    var coordinates = [x, y]
    map.flyTo({center: coordinates});
}


map.on('load', () => {
// Add an image to use as a custom marker
    map.loadImage(
        'https://i.postimg.cc/cCQPhw7H/hotel-icon.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('custom-marker', image);
            map.addSource('points', {
                'type': 'geojson',
                'data': hotel_data,
            });
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'custom-marker',
                    'text-field': ['get', 'name'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                }
            });
        });
});

map.on('click', 'points', function (e) {
    var hotel_name = e.features[0].properties.name;
    var hotel_rank = e.features[0].properties.rank;
    var hotel_price = e.features[0].properties.price;
    var hotel_rating = e.features[0].properties.rating;
    var popup = new mapboxgl.Popup({className: 'popup', anchor: 'bottom'});
    var outputString = '<div><h3 style="margin: 0 auto">' + hotel_name + '</h3><br><b>Ranking: </b>' +
        hotel_rank.toString() + '<br><b>Price: </b>$' + hotel_price + '<br><b>Rating: </b>' +
        getStars(hotel_rating) + "</div>";
    popup.setLngLat(e.lngLat).setHTML(outputString).addTo(map);
});