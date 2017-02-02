function initMap() {
  var myLatlng = new google.maps.LatLng(34,-86);
  var mapOptions = {
  zoom: 4,
  center: myLatlng
}
  var map = new google.maps.Map(document.getElementById('map'),  mapOptions);
  // To get address of the location
  var geocoder = new google.maps.Geocoder;
  // To get data on info message on tooltip
  var infowindow = new google.maps.InfoWindow;
  var json = null; 
   // to fetch data from json js file
       
     $.ajax({ 
            'async': false, 
            'global': false, 
            'url': "js/offices-address.js", 
            'dataType': "json", 
            'success': function (data) {
                     json = data;
             }
      });
    //loop between each of the json elements
        for (var i = 0, length = json.length; i < length; i++) {
           
            var data = json[i],

            latLng = new google.maps.LatLng(data.lat, data.lng); 
            title = data.title;
            // create new marker location  
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });

            // Custom event added to provide click functionality on the marker to redirect to maps page   
            google.maps.event.addListener(marker, 'click', (function(marker, i, data) {
                var d = data;
                return function() {
                    //console.log(markers);
                    window.open("http://maps.google.com?saddr=My+Location&daddr="+ d.lat + ',' + d.lng ,'_blank');
                 //   window.open("http://www.google.com/maps/search/"+ d.lat + ',' + d.lng ,'_blank');
                }
            })(marker, i, data));
                      
            // Custom events added on markers to provide info about the location
            google.maps.event.addListener(marker, 'mouseover', (function(marker, i, data) {
              var d = data;
              return function() {
                    infowindow.setContent(d.title);
                    infowindow.open(map, marker);
              }
            })(marker, i, data));

            // Custom events added on markers to remove info about the location
            google.maps.event.addListener(marker, 'mouseout', (function(marker) {
              var m = marker;
              return function() {
                    infowindow.close(map, m);
              }
            })(marker));
      }

}

$(document).ready(function(){

  var officeCount = $(".offices").length;
    $(".offCount").html(officeCount);
    if($(".state-name").length == 1){
    $(".introductioncopy").css("margin-bottom","0px");
        $(".office-page-links-container").hide();
        $(".global-office-link").css("padding-top","0px");
    } 
// To look for the change in the options through select element
  $(".select-country").change(function(){

      var valSel = $(this).find("option:selected").val();
            $("h2.state-name:contains(" +valSel+ ")").parent('div').show().attr("aria-hidden","false");
            $("h2.state-name:contains(" +valSel+ ")").parent('div').siblings().hide().attr("aria-hidden","true");

            if(valSel.length == 0)
            {
              $("h2.state-name").show();
              $(".offices-column.column.clearfix").show().attr("aria-hidden","false");
            }

  }); 
  $(".locations-map").parents('.main-container').css('padding-top','0px');
});