(function () {
	
	var last_lat = 51.497, 
	last_lng = -0.122,
	map;
	
	function init () {
		var lat = sessionStorage? sessionStorage['lat'] || 51.497977 : 51.497977,
			lng = sessionStorage? sessionStorage['lng'] || -0.122588 : -0.122588,
			loc = new google.maps.LatLng (lat, lng),
			opts = {
				zoom: 16,
				center: loc,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			},
			mapWrap = $('#map').height ($(document).height () - 100)[0];
			
		map = new google.maps.Map (mapWrap, opts);
		
		google.maps.event.addListener (map, 'drag', function () {
			var c = map.getCenter ();
			getData (c.lat (), c.lng (), getRadius ());
		});
		 
		google.maps.event.addListener (map, 'dragend', function () {
			var c = map.getCenter ();
			saveMapPoint (c.lat (), c.lng ());
		});

		var c = map.getCenter ();
		getData (c.lat (), c.lng (), getRadius ());
		
		google.maps.event.addListener(map, 'zoom_changed', function(){
		  console.log('zoom changed');
		  getData();
		})
	}
	
	
	function saveMapPoint (lat, lng) {
		if (sessionStorage) {
			sessionStorage['lat'] = lat;
			sessionStorage['lng'] = lng;
		}
	}
	
	
	function getRadius () {
		var kmPerPx = [157, 78, 39, 19.6, 9.8, 4.9, 2.4, 1.2, .611, .306, .153, .076, .039, .019, .010, .005, .0024, .0012, .0006, .0003, .00015, .000075, .000037, .000019, .0000093];
		return kmPerPx [map.getZoom ()] * $('#map').width () / 2;
	}
	

  function narrowCoord(coord) {
    return Math.round(coord * 1000) / 1000;
  }


	function getData (lat, lng, radius) {
	  var changed = false;
    lat = narrowCoord(lat);
    lng = narrowCoord(lng);
    
    if(!lat){
  	  last_lat = 51.497; 
    	last_lng = -0.122;
	    changed = true;
    } else {
      if(last_lat !== lat){
        last_lat = lat;
        changed = true;
      }
      if(last_lng !== lng){
        last_lng = lng;
        changed = true;
      }  
    }
    
    if(changed){
      NESTORIA.request_avg([last_lat, last_lng], getRadius() + 'km', function(data){
        // Get average
        
        console.log(NESTORIA.get_avgs(false));
      })
    }
	}

	init ();
	
})();