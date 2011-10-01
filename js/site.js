

(function () {
	
	function init () {
		var lat = sessionStorage? sessionStorage['lat'] || 51.497977 : 51.497977,
			lng = sessionStorage? sessionStorage['lng'] || -0.122588 : -0.122588,
			loc = new google.maps.LatLng (lat, lng),
			opts = {
				zoom: 16,
				center: loc,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			},
			mapWrap = $('#map').height ($(document).height () - 150)[0],
			map = new google.maps.Map (mapWrap, opts);
		
		google.maps.event.addListener (map, 'drag', function () {
			var c = map.getCenter ();
			getData (c.lat (), c.lng ());
		});
		 
		google.maps.event.addListener (map, 'dragend', function () {
			var c = map.getCenter ();
			saveMapPoint (c.lat (), c.lng ());
		});
		 
	}
	
	
	function saveMapPoint (lat, lng) {
		if (sessionStorage) {
			sessionStorage['lat'] = lat;
			sessionStorage['lng'] = lng;
		}
	}


	function getData (lat, lng) {
		$('#data').text (lat + ', ' + lng);
	}
	

	init ();
		
	
})();