
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
kps_list[2] = new Array(
	[-37.79833652605378, 144.96096666926232],
	[-37.798509253491645, 144.96423725824502],
	[-37.800432168543715, 144.96395646111478],
	
	[-37.801063361074604, 144.96992387728608],
	[-37.80312905468129, 144.969575295752],
	[-37.80327928468522, 144.9717618539638],
	[-37.80515647369651, 144.9714220358024], //
	[-37.805357435099275, 144.97350476272575],
	[-37.81057759111924, 144.97271253153116],
	[-37.810890538382296, 144.97380581063706],
	[-37.811729230514565, 144.97472479902493],
	[-37.812117278884585, 144.9779095687836],
	[-37.812855816895755, 144.98022288399318], // garden
	[-37.81450811247256, 144.97931974038394],
	[-37.81570975876975, 144.9791454494828],
	[-37.815234109454416, 144.97493077930642],
	[-37.81033959400165, 144.97260747909584],
	[-37.81146692752627, 144.96874509833017], // chinatown
	
);
kps_list[1] = new Array(
	[-37.821596804108026, 144.96470892695132],
	[-37.82127475475487, 144.9644514348828],
	[-37.821673078734456, 144.96297085558928],
	[-37.821105254537066, 144.96230566779076],
	[-37.82116457965758, 144.9614366321185],
	[-37.819876366317075, 144.9613293437639],
	[-37.81935090439619, 144.96108258052914], //
	[-37.81957125984077, 144.96038520622423],
	[-37.81774907003124, 144.9666723039136],
	[-37.81827454333138, 144.96703708431926],
	[-37.818579655139125, 144.9688502575384], // zoom
	[-37.81783382403752, 144.96903264774124],
	[-37.81741852843849, 144.97019136212683],
	[-37.81669811218948, 144.9699016835694],
	[-37.81693542655391, 144.96910774974535],
	[-37.81659640579975, 144.96910774974535],
	[-37.81694390205283, 144.96923649577087],
	[-37.81726597029018, 144.9677988318192],
	[-37.81693542655391, 144.96770227230004],
	[-37.81700323051792, 144.96721947470434],
	[-37.816477748167955, 144.96698589479726],
	[-37.81624634424612, 144.96776901750985],
	[-37.81548301476089, 144.96745146875196], //regent
	[-37.815316729313615, 144.96733812771419],
	[-37.81553714915576, 144.96657491125296],
	[-37.814503111394465, 144.96607602040052],
	[-37.81494808843234, 144.96451497484102],
	[-37.81435054722121, 144.96425748279],
	
	[-37.813913175946176, 144.9642728607197],
	[-37.8128076958829, 144.9680470530849],
	[-37.81182077068932, 144.96758797005182],
	[-37.811472030717404, 144.96874892041424]
);


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
	
	clr = "#007cbf"
	if(kps_id==1) { clr = "#f25050" }
	if(kps_id==2) { clr = "#2c6100" }
	map.addLayer({
	"id": "route"+(num).toString(),
	"source": "route"+(num).toString(),
	"type": "line",
	"paint": {
	"line-width": 4,
	"line-color": clr
	},
	"layout":{
		'line-cap': 'round',
		'line-join': 'round'
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
	//flyTo(point[num].features[0].geometry.coordinates[0], point[num].features[0].geometry.coordinates[1]);
	
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
		if (num<kps_list[kps_id].length-2){
			map.removeLayer('point'+(num).toString())
			num = num + 1;
			draw_line(kps_list[kps_id][num], kps_list[kps_id][num+1]);
			if (kps_id == 0) {
				if (num == 1) { idx=17; map.flyTo({center: [point[idx].features[0].geometry.coordinates[0], point[idx].features[0].geometry.coordinates[1]], zoom: 14, speed: 0.3 }); }
				if (num == 18) { idx=28; map.flyTo({center: [point[idx].features[0].geometry.coordinates[0], point[idx].features[0].geometry.coordinates[1]], speed: 0.1 }); }
			}
			else if (kps_id == 2) {
				if (num == 1) { idx=3; map.flyTo({center: [point[idx].features[0].geometry.coordinates[0], point[idx].features[0].geometry.coordinates[1]], zoom: 14, speed: 0.5 }); }
				if (num == 5) { idx=9; map.flyTo({center: [point[idx].features[0].geometry.coordinates[0], point[idx].features[0].geometry.coordinates[1]], zoom: 14, speed: 0.1 }); }
			}
			else if (kps_id == 1) {
				if (num == 1) { idx=3; map.flyTo({center: [point[idx].features[0].geometry.coordinates[0], point[idx].features[0].geometry.coordinates[1]], zoom: 14, speed: 0.3 }); }
				if (num == 7) { idx=10; map.flyTo({center: [point[idx].features[0].geometry.coordinates[0], point[idx].features[0].geometry.coordinates[1]], zoom: 15.5, speed: 0.3 }); }
				if (num == 18) { idx=28; map.flyTo({center: [point[idx].features[0].geometry.coordinates[0], point[idx].features[0].geometry.coordinates[1]], zoom: 14, speed: 0.3 }); }
			}
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
	//draw_line(kps_list[kps_id][num], kps_list[kps_id][num+1]);
});

map.on('click', 'points', function (e) {
    var name = e.features[0].properties.name;
    var rank = e.features[0].properties.rank;
    var price = e.features[0].properties.price;
    var rating = e.features[0].properties.rating;
	var img = e.features[0].properties.img;
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
	if (map.getLayer("point"+(num).toString())) {
		map.removeLayer("point"+(num).toString());
		for(var i = 0;i<=num;i++){
			map.removeLayer("route"+(i).toString());
			//map.removeLayer("point"+(i).toString());
			
		}
		for(var i = 0;i<=num;i++){
			map.removeSource("route"+(i).toString());
			map.removeSource("point"+(i).toString());
		}
	}
	num = 0;
	kps_id = 0;
	for(var i = 0;i<kps_list[kps_id].length-1;i++){
		init(kps_list[kps_id][i], kps_list[kps_id][i+1], i)
	}
    draw_line(kps_list[kps_id][num], kps_list[kps_id][num+1]);
});
document.getElementById('replay1').addEventListener('click', function() {
	if (map.getLayer("point"+(num).toString())) {
		map.removeLayer("point"+(num).toString());
		for(var i = 0;i<=num;i++){
			map.removeLayer("route"+(i).toString());
			//map.removeLayer("point"+(i).toString());
			
		}
		for(var i = 0;i<=num;i++){
			map.removeSource("route"+(i).toString());
			map.removeSource("point"+(i).toString());
		}
	}
	num = 0;
	kps_id = 1;
	for(var i = 0;i<kps_list[kps_id].length-1;i++){
		init(kps_list[kps_id][i], kps_list[kps_id][i+1], i)
	}
    draw_line(kps_list[kps_id][num], kps_list[kps_id][num+1]);
});
document.getElementById('replay2').addEventListener('click', function() {
	if (map.getLayer("point"+(num).toString())) {
		map.removeLayer("point"+(num).toString());
		for(var i = 0;i<=num;i++){
			map.removeLayer("route"+(i).toString());
			//map.removeLayer("point"+(i).toString());
			
		}
		for(var i = 0;i<=num;i++){
			map.removeSource("route"+(i).toString());
			map.removeSource("point"+(i).toString());
		}
	}
	num = 0;
	kps_id = 2;
	for(var i = 0;i<kps_list[kps_id].length-1;i++){
		init(kps_list[kps_id][i], kps_list[kps_id][i+1], i)
	}
    draw_line(kps_list[kps_id][num], kps_list[kps_id][num+1]);
});