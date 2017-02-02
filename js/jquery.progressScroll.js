$.fn.progressScroll = function(options){
	var settings = $.extend({
		fontSize : 20,
		fontFamily : 'sans-serif',
		color : '#009ACF',
		height : '5px',
		textArea : 'lite',
	}, options);

	// namespace
	var progress = {};
	if(settings.textArea === 'dark'){
		$('.scrollWrapper').css({"background-color": "rgba(0,0,0,0.75)"});
		$('.scrollWrapper h3').css({"color": "white"});
	} else {
		$('.scrollWrapper').css({"background-color": "rgba(255,255,255,1)"});
		$('.scrollWrapper h3').css({"color": "black"});

	}
	progress.targetScroll = 0;
	progress.headHeight = $('.header-wrapper').outerHeight()
	progress.screenh = $(window).height() //+ $('#footer-section').outerHeight();
	progress.divHeight = $(this).outerHeight() + $('#footer-section').outerHeight();
	progress.numberOfH2 = $('h2').length;
	// console.log(progress.numberOfH2);
	console.log("divHeight "+progress.divHeight);
	console.log("head Height "+progress.headHeight);
    
    
    $('h2').each(function(id) {
        
        $(this).attr('data-id-link',$(this).text().replace(' ','-')+'-'+id);
        
        var per = Math.round((($(this).position().top-(progress.headHeight+22))/((progress.divHeight ) - progress.screenh))*100);
        
        console.log($(this).text(), per);
        
        var title = $(this).text();
        var sub = $(this).closest('.box').find('.sub-headline').text() || "And heres some amazing content. Its very engaging. Right?";
        console.log('--', $(this).closest('.box').find('.sub-headline'));
        if(per>=0 && per < 100){
            $('.scrollWrapper').append(
                '<a class="link-dot" style="left:'+(per)+'%;" '+
                    ' data-link="'+$(this).text().replace(" ","-")+ '-'+id+'" '+
                    'data-toggle="popover"  '+
                    'title="' + title + '" '+
                    ' data-placement="bottom" '+
                    'data-content="' + sub + '">'+
                '</a>'
            );
        }	
    });
    
    
    
    $('.scrollWrapper .link-dot').on('click touch',function(){
        var $ref = $(this).data('link') //+ '-' + $(this).index();
        console.log('[data-id-link="'+$ref+'"]',$ref)
        $('html, body').animate({
            scrollTop: $('[data-id-link="'+$ref+'"]').offset().top
        }, 400);
    })
    
    $('.scrollWrapper').append(
        '<div class="progress-indicator" style="left:0%;">'+
            '<span class="label">0%</span>'+
        '</div>'
    );

	$(window).scroll(function() {
	  	var scrollAmount = $(this).scrollTop() - progress.headHeight ;
	  	var scrollPercent = ((scrollAmount)/(progress.divHeight - progress.screenh))*100;
          if(scrollPercent>100)scrollPercent=100;
		console.log("scroll amount "+scrollAmount);
		console.log("scroll percent "+scrollPercent+"%");
		// console.log("screen height"+progress.screenh)

		//blank out the text if above the first h2 tag
		if(scrollAmount <= $('h2:first').position().top){
			// $('.scrollWrapper h3').text('');
		}
        
        $('.scrollWrapper .label').text(Math.round(scrollPercent)+ '%').parent().css('left',scrollPercent+'%')
        
        if(scrollPercent >= 1 && scrollPercent <= 99){
            $('.progress-indicator').show()        
        }else{
            $('.progress-indicator').hide()
        }

		//everytime it passes an h2 it grabs it's text
		$('h2').each(function() {
			if(scrollAmount + progress.headHeight + 30 >= $(this).position().top){
				var head = $(this).text();
                var sub = $(this).closest('.box').find('.sub-headline').text();
                var text = '<span class="label">' + head + "</span>" + 
                 '<span class="headline"> | '+ sub + '</span>';
	    		$('.scrollWrapper h3').html(text);
	    		// console.log("this pos top "+$(this).position().top)
	    		// $('.scroll-bar').toggleClass('orange');
			};
		});
        
        


		//calculate scroll amount
	    $('.scroll-bar').css('width', scrollPercent+'%' );
	    // $('.scroll-bar').css('opacity', scrollPercent/100 );
	    if( scrollAmount >= progress.targetScroll){
	    	$('.scrollWrapper').removeClass('hidden');
		} else {
			$('.scrollWrapper').addClass('hidden');
		};
	 
	}); //end window scroll

	var $el = $('.scroll-bar').css(settings); 
	return $el;
// });
}