var NESTORIA = (function($){
  
  var nester = {},
  location_url = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=metadata&place_name=%place_name&encoding=json',
  coords_url = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=metadata&south_west=%south_west&north_east=%north_east&encoding=json',
  get_nest_data = function(url, callback) {
    $.getJSON(url, {}, callback);
  }
  
  nester.get_location_data = function(place_name){
    var new_url = location_url.replace('%place_name', place_name),
    data = get_nest_data(new_url, function(nest_data, textStatus) {
      
    });
  };
  
  nester.get = function(north_east, south_west) {
    var north_east_cord = north_east[0] + ',' + north_east[1],
    south_west_cord = south_west[0] + ',' + south_west[1],
    new_url = coords_url.replace('%south_west', south_west_cord).replace('%north_east', north_east_cord),
    data = get_nest_data(new_url, function(nest_data, textStatus) {
      
    });
  };
  
  return nester;
  
})(jQuery);