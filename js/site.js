(function () {
	
	var last_lat = 51.497, 
	last_lng = -0.122,
	map,
	radius_overlay;
	
	function init () {
		var lat = sessionStorage? sessionStorage['lat'] || 51.497977 : 51.497977,
			lng = sessionStorage? sessionStorage['lng'] || -0.122588 : -0.122588,
			loc = new google.maps.LatLng (lat, lng),
			opts = {
				zoom: 16,
				center: loc,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			},
			mapWrap = $('#map').height ($(document).height () - 108)[0];
			
		map = new google.maps.Map (mapWrap, opts);
		
		google.maps.event.addListener (map, 'drag', function () {
      // var c = map.getCenter ();
		});
		 
		google.maps.event.addListener (map, 'dragend', function () {
			var c = map.getCenter ();
			saveMapPoint (c.lat (), c.lng ());
			
			// Draw circle overlay for the radius
			getData (c.lat (), c.lng (), getRadius ());
			drawRadius();
		});

		var c = map.getCenter ();
		getData(c.lat(), c.lng());
		
		google.maps.event.addListener(map, 'zoom_changed', function(){
		  getData();
		  drawRadius();
		})
		
		getData();
	  drawRadius();
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
	
	function pxRadius2Km(radius){
	  
	}

  function narrowCoord(coord) {
    return Math.round(coord * 1000) / 1000;
  }

  function drawRadius(){
    if(radius_overlay){
      radius_overlay.setMap(null);
    }
    var options = {
      strokeColor: "rgba(255,0,0,.4)",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "rgba(255,0,0,.3)",
      fillOpacity: 0.35,
      map: map,
      center: map.getCenter(),
      radius: getRadius() * 250
    };
    radius_overlay = new google.maps.Circle(options);
    radius_overlay.setMap(map);
  }

	function getData(lat, lng) {
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
      var radius = getRadius(),
      coords = [last_lat, last_lng];
      NESTORIA.request_avg(coords, (radius / 4) + 'km', function(data){
        // Get average
  
        var buyData = NESTORIA.get_avgs(true),
        	rentData = NESTORIA.get_avgs(false);

      	for (var i in buyData) {
      		var bedData = buyData[i];			
      		$('#buy-' + i + ' .sparkline').sparkline (bedData, { width: 80 });
      		$('#buy-' + i + ' .price').html ('&#163;' + Math.round (bedData[0] / 1000) + 'k');
      	}

      	for (var i in rentData) {
      		var bedData = rentData[i];			
      		$('#rent-' + i + ' .sparkline').sparkline (bedData, { width: 80 });
      		$('#rent-' + i + ' .price').html ('&#163;' + bedData[0] + '<span class="unit">pcm</span>');
      	}
      });
      
      console.log(FOURSQ.token);
      if(FOURSQ.token){
        FOURSQ.request_venues(coords);
      }
    }  

	}

	init ();
	
})();