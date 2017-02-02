$(document).ready(function() {
    $('.show-button').click(function() {
        var expandId = $(this).attr('id');
        var imgHeight = $(this).attr('data-setheight');
		if($(this).hasClass("collapse")) {			
			$(this).attr("title",expandKey);			
			$(this).removeClass('collapse').addClass('expand');
            $('.infographic-img[data-expandbutton="'+expandId+'"]').animate({ height: imgHeight+"px" }, 1000 );
		}
		else{			
			$(this).attr("title",collapseKey);
			$(this).removeClass('expand').addClass('collapse');			 
			$('.infographic-img[data-expandbutton="'+expandId+'"]').css({height: "auto"});
		}
    });
    $('.zoom-in').click(function(){
         var $inputRange = $(this).siblings('input.zoom-range');
         var value = parseFloat($inputRange.val());
         $inputRange.val(value).change();
         
     });
    $('.zoom-out').click(function(){
        var $inputRange = $(this).siblings('input.zoom-range');
        var value = parseFloat($inputRange.val());
        $inputRange.val(value).change();
    });
    $('.reset').click(function(){
        var $inputRange = $(this).siblings('input.zoom-range');
        var value = parseFloat($inputRange.val());
        $inputRange.val(value).change();
    });
	$('.full-screen').click(function(){
        $(window).resize();
		var modalId = $(this).attr('data-target');
        setTimeout(function(){$(modalId+' .reset').click();},300);
    });  
});
