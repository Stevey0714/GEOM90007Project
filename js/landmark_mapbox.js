
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmV5MDcxNCIsImEiOiJja3ViZXFsNjQwcTRhMzFsa3M5Nm81OXM5In0.a7ArxS12SXuKJgTSEL1hpQ'
var map = new mapboxgl.Map({
    container: 'map', // container id
    //style: "mapbox://styles/stevey0714/ckubeyvwd0nm417oiqixxwt52/draft",
	style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.965, -37.814], // starting position [lng, lat]
    zoom: 14.0, // starting zoom
});

//var kps = new Array([143.90, -37.776], [146,-38], [147,-37]);
var kps = new Array([-37.818177850892084, 144.96708325586758], [-37.82133317609602, 144.9647098543845], [-37.82256833310692, 144.96893478124707]);

var counter = new Array();
var route = new Array();
var point = new Array();
var steps = new Array();
//var counter2;
//var route2;
//var point2;
//var steps2;
var num;
function init2(origin, destination){
// San Francisco
	//var origin = [143.90, -37.776];
	 
	// Washington DC
	//var destination = [146, -38];
	 
	// A simple line from origin to destination.
	route2 = {
	"type": "FeatureCollection",
	"features": [{
	"type": "Feature",
	"geometry": {
	"type": "LineString",
	"coordinates": [
	origin,
	destination
	]
	}
	}]
	};
	 
	// A single point that animates along the route.
	// Coordinates are initially set to origin.
	point2 = {
	"type": "FeatureCollection",
	"features": [{
	"type": "Feature",
	"properties": {},
	"geometry": {
	"type": "Point",
	"coordinates": origin
	}
	}]
	};
	 
	// Calculate the distance in kilometers between route start/end point.
	var lineDistance = turf.lineDistance(route2.features[0], 'kilometers');
	 
	var arc = [];
	 
	// Number of steps to use in the arc and animation, more steps means
	// a smoother arc and animation, but too many steps will result in a
	// low frame rate
	steps2 = 500;
	 
	// Draw an arc between the `origin` & `destination` of the two points
	for (var i = 0; i < lineDistance; i += lineDistance / steps2) {
	var segment = turf.along(route2.features[0], i, 'kilometers');
	arc.push(segment.geometry.coordinates);
	}
	 
	// Update the route with calculated arc coordinates
	route2.features[0].geometry.coordinates = arc;
	 
	// Used to increment the value of the point measurement against the route.
	counter2 = 0;
}
function init(origin, destination, index){
// San Francisco
	//var origin = [143.90, -37.776];
	 
	// Washington DC
	//var destination = [146, -38];
	 
	// A simple line from origin to destination.
	route[index] = {
	"type": "FeatureCollection",
	"features": [{
	"type": "Feature",
	"geometry": {
	"type": "LineString",
	"coordinates": [
	origin,
	destination
	]
	}
	}]
	};
	 
	// A single point that animates along the route.
	// Coordinates are initially set to origin.
	point[index] = {
	"type": "FeatureCollection",
	"features": [{
	"type": "Feature",
	"properties": {},
	"geometry": {
	"type": "Point",
	"coordinates": origin
	}
	}]
	};
	 
	// Calculate the distance in kilometers between route start/end point.
	var lineDistance = turf.lineDistance(route[index].features[0], 'kilometers');
	 
	var arc = [];
	 
	// Number of steps to use in the arc and animation, more steps means
	// a smoother arc and animation, but too many steps will result in a
	// low frame rate
	steps[index] = 500;
	 
	// Draw an arc between the `origin` & `destination` of the two points
	for (var i = 0; i < lineDistance; i += lineDistance / steps[index]) {
	var segment = turf.along(route[index].features[0], i, 'kilometers');
	arc.push(segment.geometry.coordinates);
	}
	 
	// Update the route with calculated arc coordinates
	route[index].features[0].geometry.coordinates = arc;
	 
	// Used to increment the value of the point measurement against the route.
	counter[index] = 0;
	
	
}


function draw_line(origin, destination){
	//if(num=="1"){
	// init(origin, destination);
	// }
	// else{
	// init2(origin, destination);
	 //}
	//map.on('load', function () {
	// Add a source and layer displaying a point which will be animated in a circle.
	map.addSource('route'+(num).toString(), {
	"type": "geojson",
	"data": route[num]
	});
	
	
	map.addSource('point'+(num).toString(), {
	"type": "geojson",
	"data": point[num]
	});
	
	
	 
	map.addLayer({
	"id": "route"+(num).toString(),
	"source": "route"+(num).toString(),
	"type": "line",
	"paint": {
	"line-width": 2,
	"line-color": "#007cbf"
	}
	});
	 
	map.addLayer({
	"id": "point"+(num).toString(),
	"source": "point"+(num).toString(),
	"type": "symbol",
	"layout": {
	"icon-image": "car-15",
	"icon-rotate": ["get", "bearing"],
	"icon-rotation-alignment": "map",
	"icon-allow-overlap": true,
	"icon-ignore-placement": true
	}
	});
	animate();
}

function animate() {

	
	// Update the source with this new data.
	// Update point geometry to a new position based on counter denoting
	// the index to access the arc.
	point[num].features[0].geometry.coordinates = route[num].features[0].geometry.coordinates[counter[num]];
	
	// Calculate the bearing to ensure the icon is rotated to match the route arc
	// The bearing is calculate between the current point and the next point, except
	// at the end of the arc use the previous point and the current point
	point[num].features[0].properties.bearing = turf.bearing(
	turf.point(route[num].features[0].geometry.coordinates[counter[num] >= steps[num] ? counter[num] - 1 : counter[num]]),
	turf.point(route[num].features[0].geometry.coordinates[counter[num] >= steps[num] ? counter[num] : counter[num] + 1])
	);
	map.getSource('point'+(num).toString()).setData(point[num]);
	console.log(num)
	// Request the next frame of animation so long the end has not been reached.
	if (counter[num] < steps[num]-2) {
	requestAnimationFrame(animate);
	}
	else{
	if (num<=0){
		num = num + 1;
		draw_line(kps[num], kps[num+1]);	
	}
	}
	
	counter[num] = counter[num] + 1;

}

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

function getMoney(num){
    var output = "<span>";
    while (num > 0) {
        output += '<i class="fas fa-dollar-sign"></i>';
        num--;
    }
    output += '</span>';
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
    for (var data of landmark_data['features']) {
        rank_list += '<div class="rankingCard" onclick="flyTo(' + data["geometry"]["coordinates"] + ')">' + data['properties']['rank'].toString() + '.\t' + data['properties']['name'] + '</div>';
    }
    rank_list += "</div>"
    ranking_list.innerHTML = rank_list;
}

function flyTo(x, y) {
    var coordinates = [x, y]
    map.flyTo({center: coordinates});
}

map.on('load',function(){
	map.loadImage(
        'https://i.postimg.cc/7YkyL8tp/landmark-icon.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('custom-marker', image);
            map.addSource('points', {
                'type': 'geojson',
                'data': landmark_data,
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

	num = 0;
	for(var i = 0;i<kps.length-1;i++){
		init(kps[i], kps[i+1], i)
	}
	draw_line(kps[num], kps[num+1]);
});

map.on('click', 'points', function (e) {
    var cafe_name = e.features[0].properties.name;
    var cafe_rank = e.features[0].properties.rank;
    var cafe_price = e.features[0].properties.price;
    var cafe_rating = e.features[0].properties.rating;
    var popup = new mapboxgl.Popup({className: 'popup', anchor: 'bottom'});
    var outputString = '<div><h3 style="margin: 0 auto">' + cafe_name + '</h3><br><b>Ranking: </b>' +
        cafe_rank.toString() + '<br><b>Price: </b>' + getMoney(cafe_price) + '<br><b>Rating: </b>' +
        getStars(cafe_rating) + '</div>';
    popup.setLngLat(e.lngLat).setHTML(outputString).addTo(map);
});



document.getElementById('replay').addEventListener('click', function() {
	num = 0;
	for(var i = 0;i<kps.length-1;i++){
		init(kps[i], kps[i+1], i)
	}
    draw_line(kps[num], kps[num+1]);
});


 /*
document.getElementById('replay').addEventListener('click', function() {
// Set the coordinates of the original point back to origin
point.features[0].geometry.coordinates = origin;
 
// Update the source layer
map.getSource('point').setData(point);
 
// Reset the counter
counter = 0;
 
// Restart the animation.
animate(counter);
});
 */
// Start the animation.
//animate(counter);

