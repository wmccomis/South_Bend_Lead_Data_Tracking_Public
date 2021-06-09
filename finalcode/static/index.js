	src="https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initMap&libraries=&v=weekly";

	const responses = require('./lastparse.json');
	// Initialize and add the map
	let map;
  window.initMap = function initMap() {
  const mapCenter= { lat: 41.6764, lng: -86.2520 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11.5,
    center: mapCenter,
  });

	//styling for map
	const myElement = document.querySelector("#map");
	myElement.style.height = "600px";

	let coordDict = {}; // hash map for checking for duplicate marker locations
	var invalidLocation = []; // array that holds information of unplottable data point... to be displayed below map
	let i;
	let j = 0;
	// let geocoder = new google.maps.Geocoder();
	for (let key in responses){
		console.log(i)
		const contentString = "<div>"
			+ (
	        typeof key !== "" ?
	        "<h1>" + key + "</h1>" :
	        ""
	    )
			 +
			"<h3>" + responses[key].Request + "</h3>" +
			"<ul>" +
			"<li> Name: " + responses[key].Name + "</li>" +
			"<li> Email: " + responses[key].Email + "</li>" +
			"<li> Phone Number: " + responses[key].Phone + "</li>" +
			"<li> Address: " + responses[key].Street_Address + ", " + responses[key].City + "</li>" +
			"<li> Delivery Preference: " + responses[key].Preference + "</li>" +
			"<li> Delivery: " + responses[key].Delivery + "</li>" +
			"<li> Contactless: " + responses[key].Contactless + "</li>" +
			"<li> Children: " + responses[key].Children + "</li>" +
			"<li> Water Source: " + responses[key].Source+ "</li>" +
			"<li> Water Sample: " + responses[key].Water_Sample+ "</li>" +
			"<li> Request Timestamp: " + responses[key].Request_Date + " " + responses[key].Request_Time + "</li>" +
			"<li> Dropoff Driver: " + responses[key].Driver1_Name + "</li>" +
			"<li> Dropoff Timestamp: " + responses[key].Drop_Date + " " + responses[key].Drop_Time + "</li>" +
			"<li> Pickup Driver: " + responses[key].Driver2_Name + "</li>" +
			"<li> Pickup Timestamp: " + responses[key].Pick_Date + " " + responses[key].Pick_Time + "</li>" +
			"</ul></div>"
			const coords = { lat: responses[key].Latitude, lng: responses[key].Longitude };

				if(coords.lat > 30 && coords.lat < 50 && coords.lng > -96.75 && coords.lng < -80.5) {
					const infowindow = new google.maps.InfoWindow({
						content: contentString,
					});
					console.log(coords)
					const marker = new google.maps.Marker({
						position: coords,
						map,
					});
					var url;
					if(responses[key].Color=='blue') url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
					else if(responses[key].Color=='green') url = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
					else if(responses[key].Color=='yellow') url = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
					else if(responses[key].Color=='red') url = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
					marker.setIcon(url);
  				marker.addListener("click", () => {
    				infowindow.open(map, marker);
  				});
					coordDict[coords] = [marker, contentString];
				}
				else {
			 		invalidLocation[j] = contentString;
					 j++;
				}

	}

}
