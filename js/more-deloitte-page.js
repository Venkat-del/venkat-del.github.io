var moreDeloittePageContainer = $(".main-container.more-on-deloitte-page .topic-promo-layout");
var moreDeloittePageIntroduction = $(".main-container.more-on-deloitte-page .topic-introduction");
var moreDeloittePageShare = $(".main-container.more-on-deloitte-page .topic-action-panel");
var moreDeloittePageGreenDots = $(".main-container.more-on-deloitte-page .green-dots-container");
var moreDeloittePageInlineNav = $(".main-container.more-on-deloitte-page .inline-nav-topic-page");
var moreDeloittePageInlineNavExists = false;

if (moreDeloittePageInlineNav.length > 0) {
	moreDeloittePageInlineNavExists = true;
}

function setContentHeight () {
	var height = 0;
	$(".topic-column", moreDeloittePageContainer).each(function() {
		if ($(this).outerHeight(true) > height) {
			height = $(this).outerHeight(true);
		}
	});
	height += "px";
	moreDeloittePageContainer.css("height", height);
}

/*DE1365
function positionMoreDeloitteDescription () {
	if (!moreDeloittePageIntroduction.hasClass("lite")) {
		var top = moreDeloittePageIntroduction.outerHeight()/2;
		var marginToAdd = 0;
		if ($(".topic-description", moreDeloittePageIntroduction).outerHeight() <= top) {
			top += top - $(".topic-description", moreDeloittePageIntroduction).outerHeight()+1;
		} else {
			marginToAdd = $(".topic-description", moreDeloittePageIntroduction).outerHeight() - top;
		}
		top += "px";
		$(".topic-description", moreDeloittePageIntroduction).animate({top: top}, 0, "linear", function () {
			if (marginToAdd > 10) {
				moreDeloittePageShare.css("margin-top", marginToAdd+"px");
			}
		});
	}
}*/

$(function() {
	
	if (moreDeloittePageInlineNavExists) {
		moreDeloittePageInlineNav.animate({opacity: 1.0}, 1000, "linear");
	}
	moreDeloittePageShare.animate({opacity: 1.0}, 1000, "linear");
	moreDeloittePageIntroduction.animate({opacity: 1.0}, 1000, "linear", function() {
		moreDeloittePageGreenDots.css({opacity: 1.0}).animate({width: "100%"}, 1000, "linear", function() {
			$("#footer-section").css("visibility", "visible");
			if (matchMedia('(min-width: 768px)').matches) {
				setContentHeight();
				//positionMoreDeloitteDescription();
			}
			$(".topic-column.main-column", moreDeloittePageContainer).animate({opacity: 1.0}, 1000, "linear");
			$(".topic-column.first-column", moreDeloittePageContainer).delay(300).animate({opacity: 1.0}, 1000, "linear");
			$(".topic-column.fifth-column", moreDeloittePageContainer).delay(300).animate({opacity: 1.0}, 1000, "linear");
		});
	});
	
	/*
	Functions to call when the window is resized
	*/
	$(window).resize(function() {
		
		if (matchMedia('(min-width: 768px)').matches) {
			setContentHeight();
			//positionMoreDeloitteDescription();DE1365
			$(".topic-column.fifth-column", moreDeloittePageContainer).css("padding-bottom", "inherit");
		} else {
			moreDeloittePageContainer.removeAttr("style");
			//moreDeloittePageShare.css("margin-top", "");DE1365
		}
		
	});
	
});