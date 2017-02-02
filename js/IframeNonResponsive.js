
var IframeNonResponsive = function() {

    var desktop = window.matchMedia("screen and (min-width: 1024px)")
    var tablet = window.matchMedia("screen and (min-width: 767px)")
    var mobile = window.matchMedia("screen and (min-width: 320px)")

    if (desktop.matches) { // if media query desktop matches

        $('.iframe-component .iframe-non-responsive iframe').each(function() {
            var getDimension = $(this).attr('data-dimension');
            var splitDimension = getDimension.split("-");
            $(this).css('height', splitDimension[0] + 'px');
            $(this).css('width', '100%');


        });

    } else if (tablet.matches) { // if media query tablet matches

        $('.iframe-component .iframe-non-responsive iframe').each(function() {
            var getDimension = $(this).attr('data-dimension');
            var splitDimension = getDimension.split("-");
            $(this).css('height', splitDimension[0] + 'px');
            $(this).css('width', '100%');


        });

        $('.iframe-preview-image').css('height', '300px');

    } else if (mobile.matches) { // if media query mobile matches

        $('.iframe-component .iframe-non-responsive iframe').each(function() {
            var getDimension = $(this).attr('data-dimension');
            var splitDimension = getDimension.split("-");
            $(this).css('height', splitDimension[0] + 'px');
            $(this).css('width', '100%');
            $(this).attr("scrolling", "yes");

        });

        $('.iframe-preview-image').css('height', '200px');

    }
};

$(document).ready(function() {

    $('.iframe-component .iframe-non-responsive iframe').each(function() {
        var getDimension = $(this).attr('data-dimension');
        var splitDimension = getDimension.split("-");
        $(this).css('height', splitDimension[0] + 'px');
        $(this).css('width', '100%');

    });

    $('.iframe-mobile').each(function() {
        $(this).css("background-color", "#808080");
    });

    $('.iframe-preview-image').each(function() {
        var prevImgSrc = $(this).attr('data-prevImgSrc');
        if (prevImgSrc == undefined || prevImgSrc == null || prevImgSrc == '') {
            $(this).css('display', 'none');
            $(".iframe-mobile-content-text").css("padding-top", "2%");
        } else {
            $(this).css("background", "url('" + prevImgSrc + "') no-repeat center center");
        }

    });



    // When DOM is ready 
    IframeNonResponsive();
});

//To detect touch device and fire the resize event
if (Modernizr.touch) { 
 $(window).resize(function() {
    IframeNonResponsive();

}).load(function() {
    IframeNonResponsive();
});

} 
