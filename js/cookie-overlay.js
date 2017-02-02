$(function() {
		//create layout on dom
		var cookieContainer = document.createElement('div');
		$(cookieContainer).addClass('cookie-container').attr('aria-label','Cookie notice').attr('role','alertdialog');		 
		var form = document.createElement('form');
		$(form).attr('id', 'cookieoptinform').attr('name', 'cookieoptinform');
		var cookiepopup = document.createElement('div');
		$(cookiepopup).addClass('cookie-popup');
		var cookiemsg = document.createElement('div');
		var lang = $("html").attr("lang");
var cookie_messg_lang = '<strong>Alert Title</strong><p>Our  site uses cookies to make your experience more personal. By using this site you consent to our use of cookies.In our <a href="https://authorstage.deloitte.com/content/www/dk/da/footerlinks/cookies.html">cookie statement</a>&nbsp; youcan read more about our use of cookies, information about the cookies we use and how to delete or block them. </p>';
		/*var srcc ="apps/dcom/dm/components/content/contentsection/footersection/cookies/clientlibs/js/language.json";		
		$.getJSON(srcc, function (result) {
			  for (var i=0;i<=result.data.length; i++){	
				if(lang === result.data[i].language){
				$(cookiemsg).addClass('cookie-msg').html(result.data[i].message);
				}
			  }
		});*/
$(cookiemsg).addClass('cookie-msg').html(cookie_messg_lang);
		var acptBtn = document.createElement('div');
		$(acptBtn).addClass('accept-btn');

		var acptBtnString = '<a class="button btn-white cookie-accept button-small" id="cookieaccept" role="button" href="#"><i class="icon-check-square-o"></i>Accept and Close</a>';

		$(acptBtn).append(acptBtnString);
		$(cookiepopup).append(cookiemsg);
		$(cookiepopup).append(acptBtn);
		$(form).append(cookiepopup);
		$(cookieContainer).append(form);
		$(cookieContainer).css({
			'top' : '-9999px',
			'display' : 'block'
		}); //setting block to calculate the widths
		$('body').prepend(cookieContainer);
		
		var pushHeight = $('.cookie-container').outerHeight(true);
		
		var cookiepop = $('.cookie-popup');
		var pushPutton = ((pushHeight > 60) ? (pushHeight / 2) - 30 : 0);
		
		$(cookieContainer).css({
			'top' : '',
			'display' : 'none'
		}); //setting back hidded to start the animation with easing

		if ($('.cookie-container')) {
			$('body').animate({
				marginTop : pushHeight
			}, 'slow');
			$('.cookie-container').slideDown('slow');
			$('.accept-btn').css({
				'margin-top' : pushPutton
			});
			

		}
			$('#cookieaccept').click(function(){
			$('body').animate({
				marginTop : 0
			}, 'slow');
			$('.cookie-container').slideUp('slow');
			//alert("Cookie Accept button clicked");
			
			//alert(leftBox.css("top"));
			var AcptdicoverMoreBox = leftBox.css("top");
			var AcptgreenDotTop = leftDot.css("top");
			var AcptleftContainer = leftContainer.css("top");
			
	        var AcptdicoverMoreBoxRes = AcptdicoverMoreBox.replace("px" , "");
	        var AcptgreenDotTopRes = AcptgreenDotTop.replace("px" , "");
	        var AcptleftContainerRes = AcptleftContainer.replace("px" , "");
	        
			var FinalAcptdicoverMoreBox =  AcptdicoverMoreBoxRes - pushHeight;
			var FinalAcptgreenDotTop =  AcptgreenDotTopRes - pushHeight;
			var FinalAcptleftContainer =  AcptleftContainerRes - pushHeight;
			
			//alert("green dot top when accept button is clicked: " +FinalAcptgreenDotTop);
			leftBox.css("top", FinalAcptdicoverMoreBox+'px');
			leftDot.css("top", FinalAcptgreenDotTop+'px');
			leftContainer.css("top", FinalAcptleftContainer+'px');
			
			//leftDot.css("top", AcptgreenDotTop);
			//alert(leftContainer.css("top"));
		});
	});

