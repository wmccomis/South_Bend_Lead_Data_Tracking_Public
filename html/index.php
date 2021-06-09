<html>
<?php header("Cache-Control: no-cache, must-revalidate");?>
  <head>
    <title>Lead Testing Data</title>
    <style type="text/css">
      /* Set the size of the div element that contains the map */
      #map {
        height: 400px;
        /* The height is 400 pixels */
        width: 100%;
        /* The width is the width of the web page */
      }
    </style>
	<script src='bundle.js'>
	//<script src = "{{url_for('static', filename = 'bundle.js')}}">
	//document.getElementById("index5").innerHTML;
    </script>
  </head>
  <body>
    <h3>South Bend Lead Test Kit Map</h3>
    <!--The div element for the map -->
    <div id="map"></div>
    <div id="end"></div>
	<script 
	src="https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initMap&libraries=&v=weekly"
	async = "false"
	></script>
  </body>
</html>


