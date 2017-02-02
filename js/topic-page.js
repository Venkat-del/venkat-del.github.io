var topicPageContainer = $(".main-container.topic-page .topic-promo-layout");
var topicPageIntroduction = $(".main-container.topic-page .topic-introduction");
var topicPageGreenDots = $(".main-container.topic-page .green-dots-container");
var topicPageInlineNav = $(".main-container.topic-page .inline-nav-topic-page");
var topicPageInlineNavExists = false;

if (topicPageInlineNav.length > 0) {
	topicPageInlineNavExists = true;
}
function positionSimilarTopics () {
	var height = $(".similar-trends", topicPageContainer).outerHeight(true);
	$(".topic-column.fifth-column", topicPageContainer).css("padding-bottom", height+"px");
}
$(function() {
	if (topicPageInlineNavExists) {
		topicPageInlineNav.animate({opacity: 1.0}, 1000, "linear");
	}
	topicPageIntroduction.animate({opacity: 1.0}, 1000, "linear", function() {
		topicPageGreenDots.css({opacity: 1.0}).animate({width: "100%"}, 1000, "linear", function() {
			if (matchMedia('(max-width: 767px)').matches) {
				positionSimilarTopics();
			}
			$(".topic-column.main-column", topicPageContainer).animate({opacity: 1.0}, 1000, "linear");
			$(".topic-column.first-column", topicPageContainer).delay(300).animate({opacity: 1.0}, 1000, "linear");
			$(".topic-column.fifth-column", topicPageContainer).delay(300).animate({opacity: 1.0}, 1000, "linear");
		});
	});
	$(window).resize(function() {
		if (matchMedia('(max-width: 767px)').matches) {
			positionSimilarTopics();
		} else {
			$(".topic-column.fifth-column", topicPageContainer).css("padding-bottom", "inherit");
		}
	});
});

(function() {
    // fix for old markup in system
    $(document).ready(function(){
       if($('.topicpagebanner .topic-introduction').find('img').length>=1){
           var src = $('.topicpagebanner .topic-introduction').find('img').attr('data-orgsrc');
           $('.topicpagebanner .topic-introduction').css('background-image','url('+src+')')
           $('.topicpagebanner .topic-introduction').find('img').css('display','none');
       } 
    });
})(jQuery);