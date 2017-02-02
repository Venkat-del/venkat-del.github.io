$(document).ready(function(){
    $('.story-row').each(function() {
        var maxHeight = 0;
        $('.top-stories', this).each(function() {

            if($(this).height() > maxHeight) {
             maxHeight = $(this).height();  
            }
        });
        $('.top-stories').css("height",maxHeight + 35);
    });
	 $(".defects").hide();
     $(".training-videos").hide();
    $(".option1").click(function(){
        $(".defects").hide();
        $(".row.user-stories").show();
        $(".training-videos").hide();
        $(".option1").addClass("active");
        $(".option2").removeClass("active");
        $(".option3").removeClass("active");
    });
    $(".option2").click(function(){
        $(".defects").show();
        $(".user-stories").hide();
        $(".training-videos").hide();
        $(".option2").addClass("active");
        $(".option1").removeClass("active");
        $(".option3").removeClass("active");
    });
     $(".option3").click(function(){
        $(".defects").hide();
        $(".user-stories").hide();
        $(".training-videos").show();
        $(".option1").removeClass("active");
        $(".option2").removeClass("active");
        $(".option3").addClass("active");
    });

});