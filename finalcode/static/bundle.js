(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./lastparse.json":2}],2:[function(require,module,exports){
module.exports={
    "a234532": {
        "Timestamp": "",
        "Request": "",
        "Name": "",
        "Email:": "",
        "Phone": "",
        "Street_Address": "",
        "City": "",
        "Preference": "",
        "Delivery": "",
        "Contactless": "",
        "Children": "",
        "Source": "",
        "Water_Sample": "",
        "ID1": "",
        "Request_Date": "",
        "Request_Time": "",
        "Driver1_Name": "",
        "Drop_Date": "",
        "Drop_Time": "",
        "ID2": "",
        "Driver2_Name": "",
        "Pick_Date": "",
        "Pick_Time": "",
        "ID3": "",
        "Longitude": "",
        "Latitude": "",
        "Color": "green"
    },
    "aeeb91f3": {
        "Timestamp": "5/4/2021 11:27:44",
        "Request": "Kit is picked up",
        "Name": "Czech, Evil",
        "Email": "eczech@gmail.com",
        "Phone": 5748553070,
        "Street_Address": "3703 N Main St",
        "City": "Mishawaka, IN 46545",
        "Preference": "I would prefer my testing kit to be delivered to my home.",
        "Delivery": "Yes",
        "Contactless": "",
        "Children": "Yes",
        "Source": "Well",
        "Water_Sample": "",
        "ID1": "aeeb91f3",
        "Request_Date": "5/13/2021",
        "Request_Time": "10 am, 11 am",
        "Driver1_Name": "McComis, William",
        "Drop_Date": "5/5/2021",
        "Drop_Time": "10:50:00 AM",
        "ID2": "aeeb91f3",
        "Driver2_Name": "McComis, William",
        "Pick_Date": "5/6/2021",
        "Pick_Time": "9:58:00 AM",
        "ID3": "aeeb91f3",
        "Longitude": -86.1822485,
        "Latitude": 41.69392,
        "Color": "green"
    },
    "84a6fea3": {
        "Timestamp": "5/5/2021 18:20:04",
        "Request": "Kit is ready for pickup",
        "Name": "City, Hall",
        "Email": "city@gov.com",
        "Phone": 72343324,
        "Street_Address": "227 W Jefferson Blvd",
        "City": "South Bend, IN",
        "Preference": "I would prefer my testing kit to be delivered to my home.",
        "Delivery": "Yes",
        "Contactless": "",
        "Children": "No",
        "Source": "Well",
        "Water_Sample": "",
        "ID1": "84a6fea3",
        "Request_Date": "5/12/2021",
        "Request_Time": "9 am",
        "Driver1_Name": "McComis, William ",
        "Drop_Date": "5/5/2021",
        "Drop_Time": "10:09:00 AM",
        "ID2": "84a6fea3",
        "Driver2_Name": "",
        "Pick_Date": "",
        "Pick_Time": "",
        "ID3": "",
        "Longitude": -86.253079,
        "Latitude": 41.67540839999999,
        "Color": "blue"
    },
    "fb4147f8": {
        "Timestamp": "5/5/2021 18:25:38",
        "Request": "Kit is being used",
        "Name": "SB, Airport",
        "Email": "sbairport@sb.com",
        "Phone": 3234523,
        "Street_Address": "4477 Progress ",
        "City": "South Bend, IN",
        "Preference": "I would prefer my testing kit to be delivered to my home.",
        "Delivery": "Yes",
        "Contactless": "",
        "Children": "No",
        "Source": "City Water",
        "Water_Sample": "I would like to request an optional water sampling as well.",
        "ID1": "",
        "Request_Date": "",
        "Request_Time": "",
        "Driver1_Name": "McComis, William",
        "Drop_Date": "5/4/2021",
        "Drop_Time": "10:08:00 AM",
        "ID2": "fb4147f8",
        "Driver2_Name": "",
        "Pick_Date": "",
        "Pick_Time": "",
        "ID3": "",
        "Longitude": -86.30712799999999,
        "Latitude": 41.7016058,
        "Color": "yellow"
    },
    "532ad9ef": {
        "Timestamp": "5/5/2021 18:26:23",
        "Request": "I would like to request a testing kit.",
        "Name": "main building",
        "Email": "main@nd.edu",
        "Phone": 6499234,
        "Street_Address": "100 main",
        "City": "Notre Dame, IN",
        "Preference": "I would prefer my testing kit to be delivered to my home.",
        "Delivery": "Yes",
        "Contactless": "",
        "Children": "Yes",
        "Source": "City Water",
        "Water_Sample": "",
        "ID1": "",
        "Request_Date": "",
        "Request_Time": "",
        "Driver1_Name": "",
        "Drop_Date": "",
        "Drop_Time": "",
        "ID2": "",
        "Driver2_Name": "",
        "Pick_Date": "",
        "Pick_Time": "",
        "ID3": "",
        "Longitude": -86.2357744,
        "Latitude": 41.700395,
        "Color": "red"
    }
}
},{}]},{},[1]);
