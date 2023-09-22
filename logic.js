// Create a map object.
let map = L.map("map", {
  center: [40.730610, -73.935242],
  zoom: 12
});

// Control panel to display map layers 
var controlLayers = L.control.layers( null, null, {
  position: "topright",
  collapsed: false
}).addTo(map);



// Add a tile layer.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
controlLayers.addBaseLayer(street, 'Street Map ');

var Base = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}) 
controlLayers.addBaseLayer(Base, 'Base Map');

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
controlLayers.addBaseLayer(topo, 'Topographic Map');


// Loop through the airbnb array, and create one marker for each ID object.
for (let i = 0; i < air.length; i++) {

  //Conditionals for Price
 let color = "";
 if (air[i].Price_Per_Night > 900) {
   color = "purple";
 }
 else if (air[i].Price_Per_Night > 600 ) {
   color = "orangered";
 }
 else if (air[i].Price_Per_Night > 300) {
  color = "green";
 }
 else {
   color = "yellow";
 }

 // Add circles to the map.
 L.circle(air[i].lat_lon, {
   fillOpacity: 0.75,
   color: "white",
   fillColor: color,
    //Adjust the radius.
   radius: Math.sqrt(air[i].Price_Per_Night) * 3
 }).bindPopup(`<h1>Listing ID: ${air[i].id}</h1> <hr> <h3>Price Per Night: $ ${air[i].Price_Per_Night}</h3> <h3>Location: ${air[i].lat_lon}</h3> <h3>Room Type: ${air[i].Room_Type}</h3> <h3>Neighbourhood: ${air[i].Neighbourhood}</h3> <h3>Cancellation Policy: ${air[i].Cancellation_Policy}</h3>`).addTo(map);
}




//add legend
let myColors = ["purple", "orangered", "green", "yellow"];
    
    let mylegend = L.control({ position: 'bottomright' });
    mylegend.onAdd = function () {

        let div = L.DomUtil.create('div');
        mytext = ["<div style='background-color: white'><strong>&nbsp&nbsp ($):Per Night&nbsp&nbsp</strong></div>"];
        mycategories = [' > $900.00', '$900 - $601', '$600 - $301', '$300 - $(0)'];
        for ( let i = 0; i < mycategories.length; i++) {
            div.innerHTML +=
                mytext.push('<li class=""  style="background:' + myColors[i] +  '">'  + mycategories[i] + '</li> '  );
                
        }
        div.innerHTML = mytext.join('') 
        return div;


    };
    mylegend.addTo(map);




