(function () {
	
	var last_lat, last_lng;
	
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
			getData (Math.floor (c.lat () * 1000000) / 1000000, Math.floor (c.lng () * 1000000) / 1000000);
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

  function narrowCoord(coord) {
    return Math.round(coord * 1000) / 1000;
  }

	function getData (lat, lng) {
	  var changed = false;
    lat = narrowCoord(lat);
    lng = narrowCoord(lng);
    
    if(last_lat !== lat){
      last_lat = lat;
      changed = true;
    }
    if(last_lng !== lng){
      last_lng = lng;
      changed = true;
    }
    
    if(changed){
      NESTORIA.get_avg([last_lat, last_lng], function(data){
        console.log(data);
      })
    }

		$('#data').text (last_lat + ', ' + last_lng);
	}
	

	init ();
		
	
})();