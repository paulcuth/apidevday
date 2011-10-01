window.FOURSQ = (function($){
  
  var venues_url = 'https://api.foursquare.com/v2/venues/search?ll=%coords',
  client_id = 'H12WLMJCO5TBFVG1H2M4UNJZF1KL0ZHHHE5DGOJQDX1OGU3U',
  secret = 'ZQC3AADBRTG5TFVUNQK2NKJAFAYI42IWPXJ4YRDQVCQ1MF5X',
  token,
  foursq = {};
  
  // Check for token code
  foursq.token = (function(){
    var href = window.location.href,
    query;
    href = href && href.split('#');
    if(href.length > 0){
      query = href[1] && href[1].split('=');
      return query && (query[1] || 'nope');
    } else {
      return 'nope';
    }
  })();
  
  foursq.request_venues = function(coords, callback){
    var coords_param = coords[0] + ',' + coords[1],
    new_url = venues_url.replace('%coords', coords_param),
    data;
    $.getJSON(new_url, {oauth_token: foursq.token}, function(data, textStatus) {
      console.log(data);
    });
  };
  
  return foursq;
  
})(jQuery);