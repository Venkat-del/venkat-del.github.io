var siteSelectorList;
$( document ).ready(function() {
	var countryJsonData={};
	var locale ='en_GLOBAL' ;

	if(typeof wcmMode === 'undefined'){
		wcmMode = "DISABLED";
	}

	var processJson = function(data){
		if("undefined" !== typeof data.countries && data.countries.length > 0){
			var nowTime = new Date();
			
			countryJsonData = data;
			countryJsonData.aemMode = wcmMode;
			countryJsonData.createdAt = nowTime.getTime();
			
			if(Modernizr.localstorage){
				localStorage.setItem(locale, JSON.stringify(countryJsonData));
			}

			renderControl();
		}else{
			console.debug("Invalid JSON for SS");
		}
	};
	
    var callJson = function() {
		var cacheBustDate=new Date();
		var jsUrl = 'https://devtools.deloitte.com/mockups/apps/dcom/dm/components/content/headersection/siteselector/clientlibs/js/en_GLOBAL.js';
		
		if($.browser.msie && $.browser.versionNumber <=9 && window.XDomainRequest){
			//Cross Domain request for JavaScript on MSIE 9 and lower - use XDomainRequest
			var xdr = new XDomainRequest();
			xdr.open("get", jsUrl);
			xdr.onload = function () {
				var responseJson = JSON.parse(xdr.responseText);
				processJson(responseJson);
			};
			xdr.send();
		}else{
			$.ajax({ 
					url: jsUrl,
					dataType: "json",
					success: function (responseJson) {
						processJson(responseJson);
					}
			});
		}
    }

	var renderControl = function() {
         $.each(countryJsonData.countries, function(i, j) {
                  var countryLocale = ((j.locale).split("/"))[0]+"_"+((j.locale).split("/"))[1].substring(0,2);
                  var siteUl = $('#site-selector ul.channel-site');
                  if(j.redirectLink != undefined){
                        if(countryJsonData.aemMode == "EDIT"){
                                 link = "/"+j.locale;
                        } else{ 
                                 link = j.redirectLink;
                        }
                  } else{
                         link = "/"+j.locale;
                  } 
                  var link;
                  if((link.trim().substring(0, 4)).localeCompare('http') !=  0 ) {
                         link = 'https://devtools.deloitte.com/mockups' + link;
                  } 
                  if(!(j.activateStatus == "false" && countryJsonData.aemMode == "DISABLED")) {
                            $(siteUl).append("<li ><a href="+link+" class='site_"+countryLocale+"'> "+"<span class='no-click-close-local'>"+j.localeLanguageTranslation+"</span><span class='no-click-close-trans'>"+j.memberFirmLanguageTranslation+"</span><span class='no-click-close-abbr' style='display:none'  >"+j.abbr+"</span></a></li>");
                  }
                   
                 $(".site_"+countryLocale).click(function(){
                    var c_name = "CountryLocale";
                    var exDays = 90;
                    var date = new Date();
                    date.setTime(date.getTime() + (exDays * 24 * 60 * 60 * 1000));
                    var c_value = countryLocale;
                    if (document.cookie = c_name + "="+c_value+"; expires=" + date.toGMTString() + "; path=/") {
                        checkCookie(c_name, c_value, date);
                        return true;
                    } else {
                        return false;
                    }

                 });
                 function getCookie(cname) { 
                    var name = cname + "=";
                    var ca = document.cookie.split(';');
                    for(var i=0; i<ca.length; i++) {
                        var c = ca[i];

                        while (c.charAt(0)==' ') c = c.substring(1);
                        if (c.indexOf(name) == 0) {
                            return c.substring(name.length, c.length);
                        }
                    }
                    return "";
                 }

                 function checkCookie(c_name, c_value, date) {
                    var countryLocaleCookie=getCookie("CountryLocale");
                       if (countryLocaleCookie != "" && countryLocaleCookie != null) {
                           document.cookie = c_name + "="+c_value+"; expires=" + date.toGMTString() + "; path=/"
                    }
                }                 
		 });
			 
		 /*Accessibilty code*/
		 $('#site-selector ul.channel-site li a' ).focus(function(){
			$(this).parent().css('background-color','#f9f9f9');
		 });
		 $('#site-selector ul.channel-site li a' ).focusout(function(){
			$(this).parent().css('background-color','none');
		 });
		 $( "ul.channel-site li a:last" ).on( "focusout", function() {			
			$('.siteselector').removeClass("site-autodrop");
			 $('.modal-backdrop').addClass("visibility-hidden");
			
			 $(".location-container").slideUp().removeClass("open");
			

		 });
		 if(countryJsonData.aemMode == "DISABLED" || (window.location.href.indexOf('careers-deloitte-com') != -1)) {
			$.each(countryJsonData.count, function(m, n) {
				 $('div.site-info').append('<span >'+n.sitesPublish+'</span>');
			});
		 }
		 else {
			$.each(countryJsonData.count, function(m, n) {
			 $('div.site-info').append('<span >'+n.sitesAuthor+'</span>');
			});
		 }
		 
		
		 var options = {
				  valueNames: [ 'no-click-close-local', 'no-click-close-trans', 'no-click-close-abbr' ]
				  
				};
				 siteSelectorList = new List('site-options', options);

		 var modalContainer = $(document.createElement('div')).addClass('modal-backdrop').addClass('fade').addClass('in').addClass('visibility-hidden');

		//$("ul.topline-nav").append(modalContainer);
		$("div.global-site-selector > div.site-selector").append(modalContainer);
		if ((matchMedia('(max-width: 767px)').matches) && (matchMedia('(min-width: 260px)').matches)) {

			$("nav.navigation div.modal-backdrop").remove();
		}

		// Location Section
		$('.global-site-selector > div.site-selector input').eq(0).click(function (e) {
			e.preventDefault(); 
			
			$('.global-site-selector > div.site-selector #site-selector').removeClass("visibility-hidden").css('overflow-y' , 'scroll');
			$('.global-site-selector > div.site-selector .site-info').removeClass("visibility-hidden");
			
			if ($('.global-site-selector > div.site-selector #site-selector').hasClass("open")) {
				$('.global-site-selector > div.site-selector #site-selector').slideUp(200).removeClass("open");
				$('.global-site-selector > div.site-selector .site-info').addClass("visibility-hidden");
				siteSelectorList.search();
				$(".global-site-selector > div.site-selector input.gsc-input").val("");
			
				$('.modal-backdrop').addClass("visibility-hidden");			

			} else {
				 siteSelectorList.search();
				 setTimeout(function(){ 
					$(".global-site-selector > div.site-selector input.gsc-input").focus();
				}, 300);
				 var isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
						 if(isIE11){
							 $('#site-selector ul.channel-site li a').hover(function(){
								 $(".global-site-selector > div.site-selector input.gsc-input").blur();
							 });
							 $(".global-site-selector > div.site-selector  input.gsc-input").hover(function(){
								 $(".global-site-selector > div.site-selector input.gsc-input").focus();
							 });
						 } 
                if($.browser.version === '9.0'){
					$('.global-site-selector > div.site-selector input.gsc-input').keypress(function(){
   							$(".global-site-selector > div.site-selector #site-selector .search-option").css("visibility","hidden");
					});
                }
				
				$('.modal-backdrop').removeClass("visibility-hidden");
				var addDelay = 0;
				
				$('.global-site-selector > div.site-selector #site-selector').show().addClass("open");
			}
			
		});
		
		$(".modal-backdrop ").click(function (e) {
			$(".global-site-selector > div.site-selector input.gsc-input").val("");
			 setTimeout(function(){ 
				$(".global-site-selector > div.site-selector input.gsc-input").focus();
			}, 300);
			siteSelectorList.search();
			
			if (!($(e.target).hasClass("no-click-close")|| $(e.target).hasClass("ssb_sb"))) {
				
				if ($(".global-site-selector > div.site-selector #site-selector").hasClass("open")) {
					$(".global-site-selector > div.site-selector #site-selector").slideUp(200).removeClass("open");
					$('.global-site-selector > div.site-selector .site-info').addClass("visibility-hidden");				
					$('.modal-backdrop').addClass("visibility-hidden");
					
				}
			}
		});
		
		$(document).bind("keyup", null, function (e) {
			if (e.which === 27) {
				if ($(".global-site-selector > div.site-selector #site-selector").hasClass("open")) {					
					$('.modal-backdrop').addClass("visibility-hidden");	
					$(".global-site-selector > div.site-selector #site-selector").slideUp().removeClass("open");				
					$(".global-site-selector > div.site-selector input.gsc-input").val("");
					setTimeout(function(){ 
						$(".global-site-selector > div.site-selector input.gsc-input").focus();
					}, 100);
				}
			}
		});		
	}	
	
	//Attempt to fetch JSON from local cache
    if(Modernizr.localstorage && localStorage.getItem(locale)!==null && localStorage.getItem(locale) !== "undefined") {
        var currentTimestamp = Math.round(new Date().getTime()) / 10000;
        var storedTimestamp = 0;
		
		var localJSON = {};

		var tempLocalJSON = JSON.parse(localStorage.getItem(locale));
		//validate the local JSON
		if(typeof tempLocalJSON.createdAt !== "undefined"  && tempLocalJSON.createdAt > 0 && typeof tempLocalJSON.countries !== "undefined" && tempLocalJSON.countries.length > 0){
			localJSON = tempLocalJSON;
			storedTimestamp = localJSON.createdAt / 10000;
		}
		
        if((currentTimestamp - storedTimestamp) <= 86400) {
            /* Less than 24 hours */
			countryJsonData = localJSON;
        }
	}
	
		
	//If we do not have a valid JSON (from cache) make a JSON request
	if("undefined" === typeof countryJsonData.countries || countryJsonData.countries.length <= 0){
		callJson();
	}else{
		renderControl();
	}
	
	$(".global-site-selector .global-site-selector-close a").click(function() {
		$(".global-site-selector").animate({'height': 'toggle'}, 700, "linear");
		// to put focus on featured option
		$(".featured-trending-container .toggle-links .gotoslide1 .featured").focus(); 
	});

	
});
	
