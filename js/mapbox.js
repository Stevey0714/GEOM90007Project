mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmV5MDcxNCIsImEiOiJja3ViZXFsNjQwcTRhMzFsa3M5Nm81OXM5In0.a7ArxS12SXuKJgTSEL1hpQ'
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: "mapbox://styles/stevey0714/ckubeyvwd0nm417oiqixxwt52/draft",
    center: [145.309, -37.904], // starting position [lng, lat]
    zoom: 8.0, // starting zoom
});