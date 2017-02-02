/*DE 1142 fix 
$(function() {
	if (window.devicePixelRatio == 2) {
		$('.logo .deloitte-logo #logo-deloitte').attr('src','/etc/designs/dcom/assets/images/d-logo-retina.png');
		$('.logo .deloitte-logo img.japanese').attr('src','/etc/designs/dcom/assets/images/d-logo-jp-retina.png');
        $('.japanese-logo-container #logo-jp-deloitte').attr('src','/etc/designs/dcom/assets/images/d-logo-jp-retina.png');
    }
    else{
    	$('.logo .deloitte-logo #logo-deloitte').attr('src','/etc/designs/dcom/assets/images/d-logo.png');
		$('.logo .deloitte-logo img.japanese').attr('src','/etc/designs/dcom/assets/images/d-logo-jp.png');
        $('.japanese-logo-container #logo-jp-deloitte').attr('src','/etc/designs/dcom/assets/images/d-logo-jp.png');
    }
});*/
$(document).ready(function(){
	// To fix the images loading problem for CCD Content.
	$(document).on('promosLoaded',function(){
		if(/MSIE (9\.[\.0-9]{0,})/i.test(navigator.userAgent)) {
			setAllDesktopImages();
		}else{
			setAllImgsRendition();
		}
	});
    var expPromo=$(".viewport .top-content .featured .auto-width-column .dcomparsys");
    var lastChar,first,second,third,left;
	/*Fix Placeholder for input text */
	if(!Modernizr.input.placeholder){
		$('input[type=text]').focus(function() {
		  var input = $(this);
		  if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		  }
		}).blur(function() {
		  var input = $(this);
		  if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		  }
		}).blur();
		$('input[type=text]').parents('form').submit(function() {
		  $(this).find('input[type=text]').each(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
			  input.val('');
			}
		  });
		});

	}
if(expPromo!=undefined)
{
	for(var i=0;i<expPromo.length;i++)
	{
var classPromo=$(expPromo[i]).attr('class').split(/\s+/);

lastChar=classPromo[0].substr(classPromo[0].length-1);
        if(!(lastChar=='0'||lastChar=='1'||lastChar=='2')){lastChar=classPromo[1].substr(classPromo[1].length-1);}

if($('> .section div',expPromo[i]).hasClass('expired-promo')){	
    if(i==0){first=lastChar;}else if(i==1){second=lastChar}else if(i==2){third=lastChar};
    $(this).hide();
}
}
    if(first!=undefined){ $('.twentyfive-fifty-twentyfive-c0').css('display','none');$('.twentyfive-fifty-twentyfive-c1').css('left','0%');$('.twentyfive-fifty-twentyfive-c2').css('left','51%');}
    if(first!=undefined&&second!=undefined){ $('.twentyfive-fifty-twentyfive-c1').css('display','none');$('.twentyfive-fifty-twentyfive-c2').css('left','0%');}
    else if(second!=undefined){$('.twentyfive-fifty-twentyfive-c1').css('display','none');$('.twentyfive-fifty-twentyfive-c2').css('left','26%')}

}
if(($.browser.msie) && ($.browser.version == 10)){
	$('select ').addClass('clear-dropdown');
    $('label ').addClass('clear-dropdown');
    $('.select-wrap').addClass('clear-dropdown');
	$('.simple-form-page .form_rightcol ').addClass('clear-dropdown');
}
});

if (navigator.userAgent.indexOf("mobi") > 0) {
	$("body").addClass("mobile");
}

//to remove padding top for a template with header image
$('.header-intro-container .responsive-img').parents('.main-container').css('padding-top','0px');
// media query functionality using jQeury
$(window).resize(function() {
	if (matchMedia('(min-width: 768px)').matches) {
        $('.search, .navigation').show();
        $(".search").removeAttr("style");
    }
 });

if(/MSIE (9\.[\.0-9]{0,})/i.test(navigator.userAgent)) {
	$(document).ready(function() {
        setAllDesktopImages();
    });
}else{
	$(document).ready(function() {
		setAllImgsRendition();
	});
    $(window).resize(function() {
        setAllImgsRendition();
    });
}
