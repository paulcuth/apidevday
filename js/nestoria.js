window.NESTORIA = (function($){
  
  var nester = {},
  location_url = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=metadata&place_name=%place_name&encoding=json&callback=?',
  coords_url = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=metadata&south_west=%south_west&north_east=%north_east&encoding=json&callback=?',
  get_nest_data = function(url, callback) {
    $.getJSON(url, {}, callback);
  }
  
  nester.get_location_data = function(place_name){
    var new_url = location_url.replace('%place_name', place_name),
    data = get_nest_data(new_url, function(nest_data, textStatus) {
      
    });
  };
  
  nester.get_avg = function(coords, callback) {
    var coords_param = coords[0] + ',' + coords[1],
    new_url = coords_url.replace('%south_west', coords_param).replace('%north_east', coords_param),
    data = get_nest_data(new_url, function(nest_data, textStatus) {
      // Process nest_data
      
      callback(nest_data);
    });
  };
  
  return nester;
  
})(jQuery);