
var calHeights = function() {

    var desktop = window.matchMedia("screen and (min-width: 1024px)")
    var tablet = window.matchMedia("screen and (min-width: 767px)")
    var mobile = window.matchMedia("screen and (min-width: 320px)")
    if (desktop.matches) { // if media query desktop matches

        $('.iframe-responsive iframe').each(function() {
            var getAllHeights = $(this).attr('data-heights');
            var splitHeights = getAllHeights.split("-");
            $(this).css('height', splitHeights[0] + 'px');
            $(this).attr("scrolling", "no");
        });

    } else if (tablet.matches) { // if media query tablet matches

        $('.iframe-responsive iframe').each(function() {
            var getAllHeights = $(this).attr('data-heights');
            var splitHeights = getAllHeights.split("-");
            $(this).css('height', splitHeights[1] + 'px');
            $(this).attr("scrolling", "no");
        });

    } else if (mobile.matches) { // if media query mobile matches

        $('.iframe-responsive iframe').each(function() {
            var getAllHeights = $(this).attr('data-heights');
            var splitHeights = getAllHeights.split("-");
            $(this).css('height', splitHeights[2] + 'px');
            $(this).attr("scrolling", "no");
        });

    }
};

$(document).ready(function() {
    calHeights();
 // Code to render in IE9 below

$('.iframe-responsive iframe').each(function() {
            var getAllHeights = $(this).attr('data-heights');
            var splitHeights = getAllHeights.split("-");
            $(this).css('height', splitHeights[0] + 'px');
            $(this).attr("scrolling", "no");
            $(this).css("width", "100%");
        });
});

if (Modernizr.touch) { 
 $(window).resize(function() {
     calHeights();

}).load(function() {
    calHeights();
});

} 
