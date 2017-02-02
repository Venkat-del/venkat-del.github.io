function setHeight () {
	var windowHeight = window.innerHeight;
	windowHeight = windowHeight - $("#header").outerHeight(true) - $(".main-container.thank-you-page .header-intro-container").outerHeight(true);
	var contentHeight = $(".main-container.thank-you-page .customrichtext").outerHeight(true);
	if (contentHeight < windowHeight) {
		$(".main-container.thank-you-page .customrichtext").height(0.92*windowHeight);		
	} else {
		$(".main-container.thank-you-page .customrichtext").css("height", "auto");
	}
}

$(function() {
	
	setHeight();
	
	/*
	Functions to call when the window is resized
	*/
	$(window).resize(function() {
		$(".main-container.thank-you-page .customrichtext").removeAttr("style");
		setHeight();
	});
	
});