window.NESTORIA = (function($){
  
  var nester = {},
  location_url = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=metadata&place_name=%place_name&encoding=json&callback=?',
  coords_url = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=metadata&centre_point=%coords,%radius&encoding=json&callback=?',
  get_nest_data = function(url, callback) {
    $.getJSON(url, {}, callback);
  },
  latest_data;
  
  nester.get_location_data = function(place_name){
    var new_url = location_url.replace('%place_name', place_name),
    data = get_nest_data(new_url, function(nest_data, textStatus) {
      
    });
  };
  
  nester.request_avg = function(coords, radius, callback) {
    var coords_param = coords[0] + ',' + coords[1],
    new_url = coords_url.replace('%coords', coords_param).replace('%radius', radius),
    data;
    data = get_nest_data(new_url, function(nest_data, textStatus) {
      // Process nest_data
      latest_data = nest_data;
      callback(latest_data);
    });
  };
  
  nester.get_avgs = function(buy){
    buy = buy || false;
    if(latest_data !== undefined) {
      var metadata = _.filter(latest_data.response.metadata, function(element){
        return buy ? element.listing_type === 'buy' : element.listing_type !== 'buy';
      }), result = {};
      _.each(metadata, function(element){
        var avgs = element.data,
        avgs_values = _.values(avgs),
        avgs_length = avgs_values.length,
        avg_prices = [];
        _.each(element.data, function(bed_element){
          avg_prices[avg_prices.length] = parseInt(bed_element.avg_price);
        });
        result[element.num_beds] = avg_prices;
      });
      return result;
    }
  }
  
  return nester;
  
})(jQuery);