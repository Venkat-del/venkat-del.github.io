/********** Header specific JS **********/

// Submenu Link Click
$("li.subnav-item").each(function(){
    $(this).on('click',function (e) {
       if (matchMedia('(max-width: 1024px)').matches) {
           e.stopPropagation();
           	 if ($(this).find(".sub-nav").hasClass('open')) {
				$(this).css("border-bottom","none");
                $(this).find(".sub-nav").removeClass('open');
				$(this).find(".sub-nav").hide();
				$(this).find('.has-sub-nav').removeClass("active").attr('aria-expanded', false);
				$(this).removeClass("active");
                if (matchMedia('(max-width: 767px)').matches) {
                    $(this).find('.has-sub-nav').css("border-bottom","1px solid #f1f1f1");
                }
			} 
			 else if ($('li.subnav-item').find('.sub-nav').hasClass('open')) {
                if (matchMedia('(max-width: 767px)').matches) {
                    $("li.subnav-item").find('.has-sub-nav').css("border-bottom","1px solid #f1f1f1");
                }
                $("li.subnav-item").removeClass("active").css("border-bottom","none");
				$(".has-sub-nav").removeClass("active").attr('aria-expanded', false);
				$("li.subnav-item div.sub-nav.open").removeClass("open").slideUp();
                if (matchMedia('(min-width: 768px)').matches) {
                    $(this).css("border-bottom","2px solid #86bc25");
                }
				$(this).find('.has-sub-nav').addClass("active").css("border-bottom","none").attr('aria-expanded', true);
				$(this).find('.sub-nav').show().addClass('open');
             }
            else {
                if (matchMedia('(min-width: 768px)').matches) {
                    $(this).css("border-bottom","2px solid #86bc25");
                }
				$(this).find('.has-sub-nav').addClass("active").css("border-bottom","none").attr('aria-expanded', true);
				$(this).find('.sub-nav').show().addClass('open');
            }
		}
    });
});

$("li.subnav-item").each(function(){
	//$(this).hover(function (e) {
	$(this).on('mouseover touch',function (e) {
		if (matchMedia('(min-width: 1025px)').matches) {
            $(this).css("border-bottom","2px solid #86bc25");
            if (!$(this).hasClass("new-window")) {
               /* if ($(this).find('.has-sub-nav').hasClass("active")) {
                    $(this).find('.has-sub-nav').removeClass("active");
					$(this).css("border-bottom","none");
                    $(this).find(".sub-nav").hide().removeClass("open").attr('aria-expanded', false);
                } */
                    $(this).siblings().css("border-bottom","none");
                    $(this).siblings().find(".sub-nav").hide();
                    $(this).siblings().find('.has-sub-nav').removeClass("active").attr('aria-expanded', false);
                    $(this).siblings().removeClass("open").removeClass("active");
					 if ($(".location-container").hasClass("open")) {
                        $(".location-container").hide().removeClass("open");
                        $('a.location-link').removeClass("active");
                     }
                     else {
                        $(this).find('.has-sub-nav').addClass("active").attr('aria-expanded', true);
                        $(this).find('.sub-nav').show().addClass('open');
                     }
            }
            if ($(this).hasClass("no-click-close")) {
                return false;
            }  
        }
	});
});

$("li.subnav-item").each(function(){
	//$(this).hover(function (e) {
	$(this).on('click',function (e) {
		if (matchMedia('(min-width: 1025px)').matches) {
            $(this).css("border-bottom","2px solid #86bc25");
            if (!$(this).hasClass("new-window")) {
                if ($(this).find('.has-sub-nav').hasClass("active")) {
                    $(this).find('.has-sub-nav').removeClass("active").attr('aria-expanded', false);
					$(this).css("border-bottom","none");
                    $(this).find(".sub-nav").hide().removeClass("open");
                } 
                else{
                    $(this).siblings().css("border-bottom","none");
                    $(this).siblings().find(".sub-nav").hide();
                    $(this).siblings().find('.has-sub-nav').removeClass("active").attr('aria-expanded', false);
                    $(this).siblings().removeClass("open").removeClass("active");
					 if ($(".location-container").hasClass("open")) {
                        $(".location-container").hide().removeClass("open");
                        $('a.location-link').removeClass("active");
                     }
                     else {
                        $(this).find('.has-sub-nav').addClass("active").attr('aria-expanded', true);
                        $(this).find('.sub-nav').show().addClass('open');
                     }
                }
            }
          /*   if ($(this).hasClass("no-click-close")) {
                return false;
            } */
        }
	});
});

$('.mobile-nav-button').click(function (e) {
        $(this).toggleClass('active');
        $('.navigation').slideToggle(menuSlideTime);
        if (!($('.mobile-nav-button').hasClass('active'))) {
            $('.mobile-nav-button').addClass('visited').attr('aria-expanded', false);
          }
        if ($('.mobile-nav-button').hasClass('active')) {
            $('.mobile-nav-button').removeClass('visited').attr('aria-expanded', true);
             if($(".location-link").hasClass("active")){
                  	$('.location-container').slideUp(10).removeClass("open");
             		$(".location-link").removeClass("active");
            }
        }
    	});
   	$('.mobile-search-button').click(function (e) {
        $(".mobile-search-close").attr('aria-expanded', true);
        $(this).attr('aria-expanded', true);
        searchContainer.show().animate({
            marginLeft : 0
        }, searchSlideTime, "linear");
        $('.search').css("display", "block");
        if ($('.mobile-nav-button').hasClass("active")) {
            $('.navigation').slideToggle(menuSlideTime);
            $('.mobile-nav-button').removeClass("active").attr('aria-expanded', false);
        }
    });
    $('.mobile-search-close').click(function (e) {
        searchContainer.animate({
            marginLeft : "768px"
        }, searchSlideTime, "linear", function () {
            $(this).hide().attr('aria-expanded', false);
        });
        $('.mobile-search-button').attr('aria-expanded', false);
    });

function positionContent() {
	$(".wrapper").css("top", $("#header").outerHeight(true));
	$("#footer-section").css("top", $("#header").outerHeight(true));
	if ($("li.subnav-item div.sub-nav.open").length == 0) {
		$("#header").css("position", "fixed");
	}
	/*var subNavTop = $("#header").outerHeight(true) - $(".breadcrumb-section-bar ul.language-display").outerHeight(true);
	$(".sub-nav").each(function () {
		$(this).css("top", subNavTop);
	}); */
}
var menuSlideTime = 650;
var searchSlideTime = 650;
var searchContainer = $("#header div.header-container div.column.search");
$(document).ready(function () {
	if (matchMedia('(min-width: 768px)').matches) {
		positionContent();
	} else {
		searchContainer.hide();
	}
	if ((matchMedia('(max-width: 767px)').matches) && (matchMedia('(min-width: 260px)').matches)) {
		var headerHeight = $("#header").outerHeight(true);
		var cookieHeight = $(".cookie-container").outerHeight(true);
		var contianerTop = cookieHeight + headerHeight;
		var iScrollPos = 0;
		function detectDirection() {
			var iCurScrollPos = window.pageYOffset;
			//console.log("iCurScrollPos"+iCurScrollPos);

			if (iCurScrollPos > iScrollPos) {
				//Scrolling Down
				direction = "down";
			} else {
				//Scrolling Up
				direction = "up";

				if ($('.languageselector').outerHeight(true) > 0) {
					$('.main-container').css('margin-top', contianerTop+'px');
				} else if ($('.global-site-selector').length > 0) {
					$('div.global-site-selector').css('margin-top', contianerTop+'px');
				} else {
					$('.main-container').css('margin-top', contianerTop+'px');
				}
				if (($('.languageselector').outerHeight(true) > 0) && ($(".employee-profile-panel").length > 0 )) {
					$('.main-container').css('margin-top', contianerTop+'px');
                }
			}
			iScrollPos = iCurScrollPos;
			return direction;
			
		}
		$(window).on('scroll', function () {
			detectDirection();
            if($("li.subnav-item div.sub-nav.open").length != 0) {
                $("#header").css("position", "relative").css("display","block");
					$("#header").show();
                }
            else {
				if ((direction == "up") || ($(".location-link").hasClass("active"))) {
                    //console.log("You Scrolled Up");
                        $("#header").css("position", "fixed");
                        $("#header").show();
                } else if (iScrollPos > 400 ) {
                    //console.log("You Scrolled Down");
                    $("#header").css("position", "relative");
                    $("#header").hide();
                }
                else {
					$("#header").css("position", "fixed");
                    $("#header").show();
                }
             }
		});
		$('.location-container').css('display', 'none');
		var globalsiteselectorHeight = $('.global-site-selector').outerHeight(true);

	}
	/*US1769 Removing the function getting called twice*/
	$(document).ready(function(){
		if (matchMedia('(min-width: 768px)').matches) {
		setTimeout(function(){
        	positionContent();
         }, 2000); 
         }   

	});
	$(window).resize(function () {
		if (matchMedia('(min-width: 768px)').matches) {
			positionContent();
			searchContainer.show();
		} else {
			$(".wrapper").css("top", "0");
			$("#footer-section").css("top", "0");
		}
	});
});

$(window).bind("load", function () {


	$('body').click(function (evt) {

		if ((evt.target.parentElement.id != "login") && (evt.target.parentElement.id != "gigya_controls_login")) {


			if ($('.profile-container').hasClass("open")) {
				$('.profile-container').slideUp().removeClass("open");
				$('a.sign-in-link').removeClass("active");
				$('#profile-options').addClass("visibility-hidden");
				$(".sign-in-link").attr('aria-expanded', false);
			}

            if (matchMedia('(max-width: 1024px)').matches && ($("li.subnav-item div.sub-nav.open").length > 0) ) {

				$("li.subnav-item").removeClass("active").css("border-bottom","none");
				$(".has-sub-nav").removeClass("active").attr('aria-expanded', false);
				$("li.subnav-item div.sub-nav.open").removeClass("open").slideUp();
                if (matchMedia('(max-width: 767px)').matches) {
                    $("li.subnav-item").find('.has-sub-nav').css("border-bottom","1px solid #f1f1f1");
                }
            }

		}
	});

	$('.sign-in-link').click(function (e) {
		e.preventDefault();
		$('#profile-options').removeClass("visibility-hidden");
		if ($('.profile-container').hasClass("open")) {
			$('.profile-container').slideUp().removeClass("open");
			$('a.sign-in-link').removeClass("active");
			$('#profile-options').addClass("visibility-hidden");
			$(".sign-in-link").attr('aria-expanded', false);
		} else {
			$('.profile-container').css("display", "block");
			$(".sign-in-link").attr('aria-expanded', true);
			$('a.sign-in-link').addClass("active");
			$('#profile-options').addClass("open");
		}
	});
	if (matchMedia('(min-width: 768px)').matches && ($('.countryselector').length > 0)) {
     	var siteSelDropText = $( "nav ul.topline-nav li.countryselector a.location-link i.icon-chevron" ).position();
        var locBoxWidth = $('.location-container').outerWidth(true);
        var siteSelDropTextLeft = siteSelDropText.left - locBoxWidth; // 899
        if($(".topline-nav li.signin").hasClass("gigyasignin")){
			siteSelDropTextLeft = siteSelDropTextLeft + (siteSelDropText.left/110); // 899 + 11 = 910 // 788.400721px
			$(".location-container").css('left',siteSelDropTextLeft);
        }else{
            siteSelDropTextLeft = siteSelDropTextLeft + (siteSelDropText.left/100); // 899 + 11 = 910 // 788.400721px
			$(".location-container").css('left',siteSelDropTextLeft);
        }

    }
    if($("nav ul.topline-nav li.signin a.sign-in-link").length && matchMedia('(min-width: 768px)').matches ) {
     	var profileDropText = $( "nav ul.topline-nav li.signin a.sign-in-link i.icon-chevron").position();
        var profileBoxWidth = $('.profile-container').outerWidth(true);
        var profileDropTextLeft = profileDropText.left - profileBoxWidth + 11 ;
		$(".profile-container").css('left',profileDropTextLeft);
	}

	$("div.sub-nav").mouseleave(function(e){
        if($(e.target.parentElement).parentsUntil("ul.main-nav").hasClass("sub-nav-menu-items")){
				$("li.subnav-item").removeClass("active").css("border-bottom","none");
				$(".has-sub-nav").removeClass("active").attr('aria-expanded', false);
				$("li.subnav-item div.sub-nav.open").removeClass("open").hide();	
        }
        else {
				$("li.subnav-item").removeClass("active").css("border-bottom","none");
				$(".has-sub-nav").removeClass("active").attr('aria-expanded', false);
				$("li.subnav-item div.sub-nav.open").removeClass("open").slideUp();	
        }
	});

});
