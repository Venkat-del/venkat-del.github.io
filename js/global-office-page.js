function invertColors (invert) {
	$(".global-offices-page .content.main .global-office-container").each(function() {
		if (invert) {
			var numberOfOffices = $(".column.first .global-office", this).length;
			if (numberOfOffices % 2 == 1) {
				$(".column.second", this).addClass("invert-colors");
			}
		} else {
			$(".column.second", this).removeClass("invert-colors");
		}
	});
}
$(function () {
	var alphabetContainerLocation,headerHeight;
	$(".global-offices-page .content.main .alphabet-container .alphabet a").click(function(e) {
		e.preventDefault();
		headerHeight = $("#header").outerHeight(true);
		var country = $(this).attr("href");
		var location = $(country).position().top;
		var location_other= location+headerHeight;
		$(country+' .first .globaloffice:first-child a:first-child').focus();
		if (matchMedia('(max-width: 767px)').matches) {
			$('html, body').stop().animate({scrollTop: location_other}, 500, 'swing');
		}
		else {
			$('html, body').stop().animate({scrollTop: location}, 500, 'swing');
		}
			return false;
	});
	$(".global-offices-page .content.main .global-office-container .back-to-top a").click(function (e) {
		e.preventDefault();
		alphabetContainerLocation = $(".global-offices-page .content.main .alphabet-container").position().top;
		$('html, body').stop().animate({scrollTop: alphabetContainerLocation}, 500, 'swing');
		$(".alphabet-container a:first").focus();
        return false;
	});
	if (matchMedia('(max-width: 767px)').matches) {
		invertColors(true);
	}
	$(window).resize(function() {
		if (matchMedia('(max-width: 767px)').matches) {
			invertColors(true);
		} else {
			invertColors(false);
		}
	});
});
