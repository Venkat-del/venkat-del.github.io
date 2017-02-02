var featuredHeight = $(".main-container .featured-trending-container .toggle-links span.featured").height();
var bodyBackground = $("body").css("background");

var featuredTrendingTime = 800;
var greenDotsTime = 1000;
var contentTime = 500;
var needToSetTop = false;
var featuredTrendingContainer = $(".featured-trending-container");
var topFeaturedContent = $(".main-container .viewport .top-content .featured");
var topTrendingContent = $(".main-container .viewport .top-content .trending");
var FeaturedTrending = $(".main-container .featured-trending-container .toggle-links a.gotoslide1").attr("aria-label");
var TrendingFeatured = $(".main-container .featured-trending-container .toggle-links a.gotoslide2").attr("aria-label");


var greenDotsContainer = $(".green-dots-container");

var fReported = false;
var tReported = false;

var trendingPromos = "";

function alignTopContentHeight () {
	var featuredHeight = 0;
	var trendingHeight = 0;
	var overallHeight;

	var toggleShowHide = false;
	if (topTrendingContent.css("display") == "none") {
		toggleShowHide = true;
	}
	if (toggleShowHide) {
		topTrendingContent.show();
	}
	$(".trending-promo", topTrendingContent).each(function() {
		if (!$(this).hasClass("mobile-version") && $(this).outerHeight(true) > trendingHeight) {
			trendingHeight = $(this).outerHeight(true);
		}
	});
	$(".auto-width-column", topFeaturedContent).children("div").each(function () {
		if ($(this).outerHeight(true) > featuredHeight) {
			featuredHeight = $(this).outerHeight(true);
		}
	});
	if (toggleShowHide) {
		topTrendingContent.hide();
	}

	topFeaturedContent.css("height", featuredHeight);
	topTrendingContent.css("height", trendingHeight);
}

function alignToggle() {

	if(greenDotsContainer.position()!=undefined){
	var offset2 = greenDotsContainer.position().top - greenDotsContainer.outerHeight(true)/2;
        if($('.cookie-container').length){
			var pushHeight = $('.cookie-container').outerHeight(false);
			offset2 = greenDotsContainer.position().top + pushHeight - greenDotsContainer.outerHeight(true)/2;
        }
	featuredTrendingContainer.offset({top: offset2+$("#header").outerHeight(true)});
        offset2 = 0;
	}
}

function alignArrow () {
	$(".toggle-links span", featuredTrendingContainer).each(function() {
		var setLeft = $(this).outerWidth(true)/2;
		$("i", this).css("left", 0-setLeft);
	});
}

function changeArrow (version) {
	if (version == "tablet") {
		$(".main-container .featured-trending-container .toggle-links span i").removeClass("icon-chevron-right").addClass("icon-chevron-down").removeAttr("style");
		alignArrow();
	}
	if (version == "desktop") {
		$(".main-container .featured-trending-container .toggle-links span i").removeClass("icon-chevron-down").addClass("icon-chevron-right");
		$(".main-container .featured-trending-container .toggle-links span i.icon-chevron-right").css({
			opacity: "1.0",
			left: "auto"
		});
	}
}

function toggleGreenDot () {
	if (matchMedia('(max-width: 1023px)').matches) {
		$(".main-container .featured-trending-container .green-dot-animation").hide();
		$(".main-container .featured-trending-container").css({"top":0, "position":"static"});
		changeArrow("tablet");
	}
	if (matchMedia('(min-width: 1024px)').matches) {
		$(".main-container .featured-trending-container .green-dot-animation").show();
		changeArrow("desktop");
		alignToggle();
	}

}

function featuredToTrending () {
	topFeaturedContent.animate({opacity: 0.0}, 500, "linear", function() {
		$(this).hide().removeClass("selected");
		topTrendingContent.show().css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 500, "linear");
		topTrendingContent.addClass("selected");
		if (matchMedia('(min-width: 1024px)').matches) {
			alignToggle();
		}
        //added for US1711
        $(".dot").attr("aria-label",TrendingFeatured);
        //ends here
	});
	$(".main-container .viewport .bottom-content .featured").animate({opacity: 0.0}, 500, "linear", function() {
		$(this).hide().removeClass("selected");
		$(".main-container .viewport .bottom-content .trending").show().css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 500, "linear");
		$(".main-container .viewport .bottom-content .trending").addClass("selected");
	});
	if (matchMedia("(min-width: 1024px)").matches) {
		$(".main-container .featured-trending-container .toggle-links span.featured").animate({top: "-="+featuredHeight}, 500, "linear");
		$(".main-container .featured-trending-container .toggle-links span.trending").animate({top: "-="+featuredHeight}, 500, "linear");
	}
	$(".featured-trending-container .toggle-links .gotoslide1").attr('aria-expanded','false');
	$(".featured-trending-container .toggle-links .gotoslide2").attr('aria-expanded','true');
	$(".featured-trending-container .toggle-links span.featured").removeClass("selected");
	$(".featured-trending-container .toggle-links span.trending").addClass("selected");
	$("body").css("background", "#e5f2cb");
	if (matchMedia('(max-width: 1023px)').matches) {
		$(".main-container .featured-trending-container .toggle-links span.featured i.icon-chevron-down").animate({opacity: 0.0}, 500, "linear", function() {
			$(".main-container .featured-trending-container .toggle-links span.trending i.icon-chevron-down").animate({opacity: 1.0}, 500, "linear");
		});
	}
	
	//Track Trending Promos
	trackTrendingPromos();


}

/*** Track page view event** 
 * @param options * Option object* 
 * @param options.options.obj * Link object* 
 * @param options.options.linkType * SiteCatalyst link type*/
function trackPageViewAgain() {
	//saves vars/events tempoarily and erases s object vars/events
	CQ_Analytics.Sitecatalyst.saveEvars();
	// collect component events
	CQ_Analytics.Sitecatalyst.collect();
	// sets events/variables in s object 
	CQ_Analytics.Sitecatalyst.updateEvars();
	// use tracklink or use s.t()
	//CQ_Analytics.Sitecatalyst.trackLink(options);
	s.t();
}

function trackTrendingPromos() {
	if (!tReported) {
		$CQ("#templateSpan").removeAttr("record");
		$CQ("#pageNameSpan").removeAttr("record");
		$CQ("#featured_event27").removeAttr("record");
		if($CQ("#sc_scroll_event29") != null && $CQ("#sc_scroll_event29") != undefined && $CQ("#sc_scroll_event29") != 'undefined'){
    		$CQ("#sc_scroll_event29").removeAttr("record");
    	}
    	if($CQ("#sc_scroll_event30") != null && $CQ("#sc_scroll_event30") != undefined && $CQ("#sc_scroll_event30") != 'undefined'){
    		$CQ("#sc_scroll_event30").removeAttr("record");
    	}
		$CQ("#trending_event27").attr("record", "'event27', {'list2':trendingPromoIdString}");
		$CQ("#templateSpan").attr("record", "'pageView', {'prop52':sc_template+'_trending'}");
		$CQ("#pageNameSpan").attr("record", "'pageView', {'pageName':sc_currentPageName+'_trending'}");
		//trackPageViewAgain();
		$CQ(document).trigger("customevent");
		tReported = true;
	}
}

function trendingToFeatured () {
	topTrendingContent.animate({opacity: 0.0}, 500, "linear", function() {
		$(this).hide().removeClass("selected");
		topFeaturedContent.show().css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 500, "linear");
		topFeaturedContent.addClass("selected");
		if (matchMedia('(min-width: 1024px)').matches) {
			alignToggle();
		}
        //added for US1711
        $(".dot").attr("aria-label",FeaturedTrending);
        //ends
	});
	$(".main-container .viewport .bottom-content .trending").animate({opacity: 0.0}, 500, "linear", function() {
		$(this).hide().removeClass("selected");
		$(".main-container .viewport .bottom-content .featured").show().css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 500, "linear");
		$(".main-container .viewport .bottom-content .featured").addClass("selected");
	});
	if (matchMedia("(min-width: 1024px)").matches) {
		$(".main-container .featured-trending-container .toggle-links span.featured").animate({top: "+="+featuredHeight}, 500, "linear").addClass("selected");
		$(".main-container .featured-trending-container .toggle-links span.trending").animate({top: "+="+featuredHeight}, 500, "linear").removeClass("selected");
	}
	$(".featured-trending-container .toggle-links .gotoslide1").attr('aria-expanded','true');
	$(".featured-trending-container .toggle-links .gotoslide2").attr('aria-expanded','false');
	$(".featured-trending-container .toggle-links span.featured").addClass("selected");
	$(".featured-trending-container .toggle-links span.trending").removeClass("selected");
	$("body").css("background", bodyBackground);
	if (matchMedia('(max-width: 1023px)').matches) {
		$(".main-container .featured-trending-container .toggle-links span.trending i.icon-chevron-down").animate({opacity: 0.0}, 500, "linear", function() {
			$(".main-container .featured-trending-container .toggle-links span.featured i.icon-chevron-down").animate({opacity: 1.0}, 500, "linear");
		});
	}
}

function resizeToDesktop () {
    featuredHeight = $(".main-container .featured-trending-container .toggle-links span.featured").height();
    if (needToSetTop) {
        $(".main-container .featured-trending-container .toggle-links span.featured").removeAttr("style");
        $(".main-container .featured-trending-container .toggle-links span.trending").removeAttr("style");
        if ($(".main-container .featured-trending-container .toggle-links span.trending").hasClass("selected")) {
            $(".main-container .featured-trending-container .toggle-links span.featured").css({ top: "-=" + featuredHeight });
            $(".main-container .featured-trending-container .toggle-links span.trending").css({ top: "-=" + featuredHeight });
        }
        needToSetTop = false;
	$(window).resize();
    }
}

$(function () {


	if (matchMedia("(max-width: 767px)").matches) {
		greenDotsTime = 0;
	} else {
		setTimeout(function () {
            alignTopContentHeight ();
        }, 400);
	}

	setTimeout(function () {
        toggleGreenDot();
        $(".main-container .featured-trending-container").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, featuredTrendingTime, "linear", function() {
            $(".main-container .viewport .green-dots-container").css({visibility: "visible", opacity: 1.0}).animate({width: "100%"}, greenDotsTime, "linear", function() {
                topFeaturedContent.css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, contentTime, "linear");
                $(".main-container .viewport .bottom-content .featured").delay(500).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, contentTime, "linear");
            });
        });
    }, 400);
	
	if (matchMedia('(max-width: 1023px)').matches) {
		$(".main-container .featured-trending-container .toggle-links span.featured i").animate({opacity: 1.0}, 3000, "linear");
	}
	
	$(window).resize(function() {
		if (matchMedia("(max-width: 767px)").matches) {
			topFeaturedContent.css("height", "auto");
			topTrendingContent.css("height", "auto");
		} else {
			setTimeout(function () {
		        alignTopContentHeight();
		        if (matchMedia("(min-width: 1024px)").matches) {
		            resizeToDesktop();
		        } else {
		            backToDesktop = false;
		        }
		    }, 400);
		}
        setTimeout(function () {
            toggleGreenDot();



        }, 400);
	});
	
	
	var avoidDoubleClickTimer = 0;
	$(".main-container .featured-trending-container .green-dot-animation .dot").click(function (e) {
	    e.preventDefault();
	    var diff= (new Date().getTime() - avoidDoubleClickTimer)
	    var opacity = parseFloat(topFeaturedContent.css("opacity"));
	    if (diff >500 && (opacity == 0.0 || opacity == 1.0))
	    {
	        needToSetTop = false;//Use when switch from mobile/tab view to desktop view
	        if (topFeaturedContent.hasClass("selected") &&
               $(".main-container .viewport .bottom-content .featured").hasClass("selected")) {
	            featuredToTrending();
	        }
	        if (topTrendingContent.hasClass("selected") &&
                $(".main-container .viewport .bottom-content .trending").hasClass("selected")) {
	            trendingToFeatured();
	        }
	    }
	    avoidDoubleClickTimer = new Date().getTime();
		return false;
	});

	$(".featured-trending-container .toggle-links .gotoslide1").click(function() {
	    if (!$(' span',this).hasClass("selected")) {
	        needToSetTop = !needToSetTop
			trendingToFeatured();
		}
		return false;
	});

	$(".featured-trending-container .toggle-links .gotoslide2").click(function() {
	    if (!$(' span',this).hasClass("selected")) {
	        needToSetTop = !needToSetTop;
			featuredToTrending();
		}
		return false;
	});
	
});
