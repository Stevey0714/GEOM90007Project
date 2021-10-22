
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmV5MDcxNCIsImEiOiJja3ViZXFsNjQwcTRhMzFsa3M5Nm81OXM5In0.a7ArxS12SXuKJgTSEL1hpQ'
var map = new mapboxgl.Map({
    container: 'map', // container id
    //style: "mapbox://styles/stevey0714/ckubeyvwd0nm417oiqixxwt52/draft",
	style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.967, -37.8145], // starting position [lng, lat]
    zoom: 14, // starting zoom
});


var kps_list = new Array();
kps_list[0] = new Array(
        [-37.80757977975353, 144.95678499811552],
        [-37.80612996948269, 144.95813901348365],
        [-37.80695407174192, 144.96524482647158],
        [-37.807675153674694, 144.96567508670753],
        [-37.80779807356778, 144.96529564044468],
        [-37.80785348479984, 144.96576584346803],
        [-37.80889810317809, 144.9662743789407],
        [-37.809340052658726, 144.96469065418287],
        [-37.80977477447491, 144.96520042658813],
        [-37.80924911562555, 144.9649008912683],
        [-37.8081628213721, 144.9686670539484],
        [-37.8101653687934, 144.96962353972583],
        [-37.80941914284959, 144.9721223589456],
        [-37.810382623030705, 144.9726006018256],
        [-37.811034381906765, 144.97383207724167],
        [-37.81156269672188, 144.97312244331658],
        [-37.810367554663316, 144.97251089969535],
        //[-37.81165340206343, 144.96877728462195],
    
        [-37.81148494364177, 144.96872316269267],
        [-37.81182072494798, 144.9676122711999],
        [-37.81279926993943, 144.96806208871934],
        [-37.81390140508393, 144.96430057120187],
        [-37.814314479752305, 144.96449432695124],
    
        [-37.81482942814499, 144.96496015988444],
        [-37.81450311138831, 144.9660759587723],
        [-37.81554138697127, 144.96655339195027],
        [-37.81530406812541, 144.9673419613566],
        [-37.81546362841735, 144.96753392658817],
    
        [-37.81624865481848, 144.9677793808237],
        [-37.81647325730021, 144.96698544699967],
        [-37.81747760343392, 144.96737168507622],
        [-37.818261577206606, 144.96705518443014],
    
        [-37.818307731443696, 144.96774659700372],
        [-37.820053631213575, 144.96854053082777],
        [-37.82059603826831, 144.9679075295356],
        [-37.82091809057115, 144.967800241181],
        [-37.821994413071465, 144.96523604950605],
        [-37.82132489147144, 144.96468887889753]
    );
kps_list[1] = new Array([144.97708325586758, -37.838177850892084], [144.9247098543845, -37.81133317609602], [144.94893478124707, -37.84256833310692]);
kps_list[2] = new Array([144.98708325586758, -37.888177850892084], [144.9847098543845, -37.88133317609602], [144.96293478124707, -37.82856833310692]);


//reverse the coordinates

for(var i = 0;i<3;i++){
	for(var j = 0;j<kps_list[i].length;j++){
		var temp = kps_list[i][j][0];
		kps_list[i][j][0] = kps_list[i][j][1];
		kps_list[i][j][1] = temp;
	}
}
//var kps = new Array([144.96708325586758, -37.818177850892084], [144.9647098543845, -37.82133317609602], [144.96893478124707, -37.82256833310692]);
var kps_id = 0;
var counter = new Array();
var route = new Array();
var point = new Array();
var steps = new Array();

var num;

function init(origin, destination, index){
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
	console.log(lineDistance);
	 
	var arc = [];
	 
	// Number of steps to use in the arc and animation, more steps means
	// a smoother arc and animation, but too many steps will result in a
	// low frame rate
	//adjust speed
	steps[index] = parseInt(80*(lineDistance/0.4));
	 
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
	"line-width": 4,
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
	//flyTo(point[num].features[0].geometry.coordinates[0], point[num].features[0].geometry.coordinates[1])
	// Calculate the bearing to ensure the icon is rotated to match the route arc
	// The bearing is calculate between the current point and the next point, except
	// at the end of the arc use the previous point and the current point
	point[num].features[0].properties.bearing = turf.bearing(
	turf.point(route[num].features[0].geometry.coordinates[counter[num] >= steps[num] ? counter[num] - 1 : counter[num]]),
	turf.point(route[num].features[0].geometry.coordinates[counter[num] >= steps[num] ? counter[num] : counter[num] + 1])
	);
	map.getSource('point'+(num).toString()).setData(point[num]);
	// Request the next frame of animation so long the end has not been reached.
	if (counter[num] < steps[num]-2) {
		requestAnimationFrame(animate);
	}
	else{
		if (num<=kps_list[kps_id].length-2){
			map.removeLayer('point'+(num).toString())
			num = num + 1;
			draw_line(kps_list[kps_id][num], kps_list[kps_id][num+1]);

			//flyTo(point[num].features[0].geometry.coordinates[0], point[num].features[0].geometry.coordinates[1])
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
					"text-size": {
						"stops": [
							[0, 0],
							[13.2, 0],
							[13.599, 0],
							[13.6, 6],
							[13.8, 8],
							[14, 12]
						]
					},
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top',
					'text-allow-overlap': false,
					'icon-allow-overlap': true,

                }
            });
        });

	num = 0;
	for(var i = 0;i<kps_list[kps_id].length-1;i++){
		init(kps_list[kps_id][i], kps_list[kps_id][i+1], i)
	}
	draw_line(kps_list[kps_id][num], kps_list[kps_id][num+1]);
});

map.on('click', 'points', function (e) {
    var name = e.features[0].properties.name;
    var rank = e.features[0].properties.rank;
    var price = e.features[0].properties.price;
    var rating = e.features[0].properties.rating;
	var img = e.features[0].properties.img;
	console.log(img)
    var popup = new mapboxgl.Popup({className: 'popup', anchor: 'bottom'});
    var outputString = '<div align="center">' +
		'<h3 style="margin: 0 auto">' + name + '</h3>' +
		//'<img src=\'https://i.postimg.cc/VvsbKr4X/Eureka-Skydeck.jpg\' width=100><br>' +
		'<img src=\'img/'+ img.toString() +'\' width=150><br>' +
		'<b>Ranking: </b>' + rank.toString() + '<br>' +
		//'<b>Price: </b>' + getMoney(price) + '<br>' +
		'<b>Rating: </b>' + getStars(rating) + 
		'</div>';
    popup.setLngLat(e.lngLat).setHTML(outputString).addTo(map);
});



document.getElementById('replay0').addEventListener('click', function() {
	map.removeLayer("point"+(num).toString());
	for(var i = 0;i<=num;i++){
		map.removeLayer("route"+(i).toString());
		//map.removeLayer("point"+(i).toString());
		
	}
	for(var i = 0;i<=num;i++){
		map.removeSource("route"+(i).toString());
		map.removeSource("point"+(i).toString());
	}
	num = 0;
	kps_id = 0;
	for(var i = 0;i<kps_list[kps_id].length-1;i++){
		init(kps_list[kps_id][i], kps_list[kps_id][i+1], i)
	}
    draw_line(kps_list[kps_id][num], kps_list[kps_id][num+1]);
});
document.getElementById('replay1').addEventListener('click', function() {
	map.removeLayer("point"+(num).toString());
	for(var i = 0;i<=num;i++){
		map.removeLayer("route"+(i).toString());
		//map.removeLayer("point"+(i).toString());
		
	}
	for(var i = 0;i<=num;i++){
		map.removeSource("route"+(i).toString());
		map.removeSource("point"+(i).toString());
	}
	num = 0;
	kps_id = 1;
	for(var i = 0;i<kps_list[kps_id].length-1;i++){
		init(kps_list[kps_id][i], kps_list[kps_id][i+1], i)
	}
    draw_line(kps_list[kps_id][num], kps_list[kps_id][num+1]);
});
document.getElementById('replay2').addEventListener('click', function() {
	map.removeLayer("point"+(num).toString());
	for(var i = 0;i<=num;i++){
		map.removeLayer("route"+(i).toString());
		//map.removeLayer("point"+(i).toString());
		
	}
	for(var i = 0;i<=num;i++){
		map.removeSource("route"+(i).toString());
		map.removeSource("point"+(i).toString());
	}
	num = 0;
	kps_id = 2;
	for(var i = 0;i<kps_list[kps_id].length-1;i++){
		init(kps_list[kps_id][i], kps_list[kps_id][i+1], i)
	}
    draw_line(kps_list[kps_id][num], kps_list[kps_id][num+1]);
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

