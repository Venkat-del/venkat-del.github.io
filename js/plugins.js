// added as global variables to utilize every where
var str, bN, bM, bV, OS;

(function ($) {

/*----------------------------------- browser check and applying class name to body element -----------------------------------------*/
 str=navigator.appVersion.toLowerCase().replace(/[^a-zA-Z 0-9 . / _]+/g,"").split(" ");OS=str[1].substr(0,3);bM="";if($.browser.msie){bN="ie";OS=str[4].substr(0,3);bV=$.browser.version;if(str[7].indexOf("trident")!==-1){var tV=parseInt(str[7].split("/",2)[1]);if(bV=="7.0"&&tV=="4"){bM="ie8_cv"}else if(bV=="7.0"&&tV=="5"){bM="ie9_cv"}}}else if($.browser.opera){bN="opera";bV=$.browser.version.substr(0,4)}else if($.browser.mozilla){var moz=navigator.userAgent.toLowerCase();moz=moz.replace(/[^a-zA-Z 0-9 . / _]+/g,"").split(" ");bN="ff";bV=moz[moz.length-1].split("/",2)[1].substr(0,3)}else if($.browser.webkit){if(str[str.length-2].split("/",2)[0]==="chrome"){bN=str[str.length-2].split("/",2)[0];bV=str[str.length-2].split("/",2)[1].substr(0,4)}else if(str[str.length-2].split("/",2)[0]==="mobile"){bN=str[str.length-2].split("/",2)[0].substr(0,1)+"_"+str[str.length-1].split("/",2)[0];bV=str[6];if(str[1]==="ipad"){bV=str[5]}}else{bN=str[str.length-1].split("/",2)[0];bV=str[str.length-2].split("/",2)[1]}}bV=parseInt(bV);$("body").addClass(OS+" "+bN+" "+bN+bV+" "+bM);
/*----------------------------------- end of browser check and applying class name to body element -----------------------------------------*/ 
    
/*----------------------------------- placeholder fallback for old browsers -----------------------------------------*/     
	$.fn.placeholder=function(e){return this.each(function(){function i(e){s($(e.target))}function s(){if(t.val()===""){if(t.attr("type")==="password"){try{t.attr("type","text")}catch(e){return false}}t.val(n);t.addClass("ui-placeholder")}}function o(e){t.removeClass("ui-placeholder");if(t.val()===n){t.val("")}}var t=$(this),n,r="placeholder"in document.createElement("input");if(e===undefined){n=$(this).attr("placeholder")}else{n=e}if(!r){s(t.blur(i).focus(o).addClass("ui-placeholder"));t.parents("form").submit(function(e){if(t.val()===n){t.val("")}})}else{t.attr("placeholder",n)}})}
/*----------------------------------- end of placeholder fallback for old browsers -----------------------------------------*/


})(jQuery);