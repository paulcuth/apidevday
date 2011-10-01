window.FOURSQ = (function($){
  
  var url = 'https://api.foursquare.com/v2/venues/search?ll=%coords',
  client_id = 'H12WLMJCO5TBFVG1H2M4UNJZF1KL0ZHHHE5DGOJQDX1OGU3U',
  secret = 'ZQC3AADBRTG5TFVUNQK2NKJAFAYI42IWPXJ4YRDQVCQ1MF5X',
  token;
  
  // Check for token code
  token = (function(){
    var href = window.location.href,
    query;
    href = href.split('#');
    if(href.length > 0){
      query = href[1].split('=');
      return query[1];
    } else {
      return 'nope';
    }
  })();
  
  console.log(token);
  
  return {
    token: token
  };
  
})(jQuery);