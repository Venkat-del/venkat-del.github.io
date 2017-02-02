/* inline navigation script */
$(document).ready(function() {
var positionInPage = function() {
	if($('.content-top').height() < ($('.inline-nav-container').height() - articleTitle)) {
		$('.content-top').css("min-height", $('.inline-nav-container').height() - articleTitle);
	}
}
$('.inline-nav-container .explore-content').click(function (e) {
	$('.inline-nav-container i.icon-angle-down').hide();
	$(this).removeAttr("href");
	$('.inline-nav-container .collapse-content').attr("href","#");
    $('.extended.inline-nav-content-page').removeClass("extended").addClass("explored");
    $(".inline-nav-content-page.explored li a:first").focus();
    $('.inline-nav-container i.icon-angle-up').show();
    positionInPage();
});

$('.inline-nav-container .collapse-content').click(function (e) {
	$('.inline-nav-container i.icon-angle-up').hide();
	$(this).removeAttr("href");
	$('.inline-nav-container i.icon-angle-down').show();
	$('.inline-nav-container .explore-content').attr("href","#");
    $('.explored.inline-nav-content-page').addClass("extended");
    $(".inline-nav-content-page li a:first").focus();
    positionInPage();
});

if($('.inline-nav-container').length > 0) {
	$('.inline-nav-container i.icon-angle-up').hide();
	if (matchMedia('(min-width: 769px)').matches) {
		var articleTitle = $(".header-intro").height();
		$('.inline-nav-container').css("top", -articleTitle);
		positionInPage();	
	}
}

/* Function for the inline navigation */
	$(".inline-nav-container-links").click(function(e) {
		e.preventDefault();
		var component = $(this).attr("href");
		var location = $(component).position().top;
		var headerHeight = $("#header").outerHeight(true);
		var location_other= location+headerHeight;


		if (matchMedia('(max-width: 767px)').matches) {
                	$('html, body').stop().animate({scrollTop: location_other}, 500, 'swing');
			}
				else {
                    if($(".main-container.company-information-page").length) {
                        $('html, body').stop().animate({scrollTop: location + 20}, 500, 'swing');
                    }
                    else { 
                        $('html, body').stop().animate({scrollTop: location}, 500, 'swing');
                    }
				}
           $(component+" a:first").focus();
	return false;
	});

});