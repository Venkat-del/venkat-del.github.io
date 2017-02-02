$(document).ready(function(){
    /* only for mock-ups */

    var isEditMode = "false";
    var isDesignMode = "false";
    if (isEditMode != 'true' && isDesignMode != 'true') {
    $( "#featured-more" ).hide();
    }
    $( ".see-more-btn" ).click(function() {
          $(".see-more-btn").css("display", "none");
             $( "#featured-more" ).fadeIn( 2000);
    });
    /* For Version V2 */
    $( ".show-video-link" ).click(function() {
        if(!$(this).hasClass("extended")){
          $(".home-page .extended-background.video").css("height", "675px");
          $(".home-page .extended-background.video .showcase-video").css("margin-top","0px");
          $(".home-page .extended-background.video .player-overlay").css({"height":"100%","padding-top":"450px"});
          $(".home-page .extended-background.video .showcase-video .show-video-link").css("top","92%");
          $(this).find("img").attr("src","images/collapse-button1.png");
          $(this).addClass("extended");
        }
        else{
          $(this).removeClass("extended");
          $(".home-page .extended-background.video").css("height", "400px");
          $(".home-page .extended-background.video .showcase-video").css("margin-top","-145px");
          $(".home-page .extended-background.video .player-overlay").css({"height":"150px","padding-top":"345px"});
          $(".home-page .extended-background.video .showcase-video .show-video-link").css("top","74%");
          $(this).find("img").attr("src","images/expand-button1.png");
        }
          
    });

    $(window).resize(function () {
     if (matchMedia('(min-width: 768px)').matches) { 
              $(function() {
                var featuredHeight=($('#row1').height() + $('#row2').height() + $('#row3').height() -5- $('#home-trending h3').height())/6;
                $(".trending-item a").css("height", featuredHeight);
                // In case height of trending is more than featured fixed layout area
                  if($(".table-frame-col-30.trending").height() > $(".table-frame-col-70.featured").height()) {
                        var trendingHeight= $(".table-frame-col-30.trending").height();
                        $(".table-frame-col-70.featured").css("height", trendingHeight);
                  }
              });
          }
  });
});

$(window).bind("load", function() {
   /* setting up height for each trending promo in trending section */
   if (matchMedia('(min-width: 768px)').matches) { 
      $(function() {
        var featuredHeight=($('#row1').height() + $('#row2').height() + $('#row3').height() -5 - $('#home-trending h3').height())/6;
        $(".trending-item a").css("height", featuredHeight);
        // In case height of trending is more than featured fixed layout area
          if($(".table-frame-col-30.trending").height() > $(".table-frame-col-70.featured").height()) {
                var trendingHeight= $(".table-frame-col-30.trending").height();
                $(".table-frame-col-70.featured").css("height", trendingHeight);
          }
    //    $("ol.trending-list li:before").css("marginTop", featuredHeight/2);
      });
   }
});

(function($) {
    
    
    $.fn.mobileTabs = function(){
                    
                
                
                var $main = $(this);
                var $tabs = $main.find(".tab");
                var total = $tabs.length;
                // var $swipeArea = $('#home-trending, #home-featured, #home-page-mobile-tabs');
                var $swipeArea = $('#home-page-mobile-tabs');
                
                
                if($tabs.length >= 3){
                    $main.css('height','60px')
                        .css('margin-bottom','20px');
                    $main.find('ul').taboverflow(); 
                    $tabs.css('width','auto');
                }
                
                function showTabItems(){
                    $.each( $tabs, function(id){
                        var $class = $(this).data("tab");
                        $("." + $class).show().removeAttr("style");
                    });
                }
                
                function hideTabItems(){
                    //hide all items that arent w/ first tab
                    $.each( $tabs, function(id){
                        if($(this).hasClass('active')){
                            var $class = $(this).data("tab");
                            $("." + $class).show();
                        }else{
                            var $class = $(this).data("tab");
                            $("." + $class).hide();
                        }
                    });
                }
                
                //hide all other tab items
                var hideOthers = function(activeId){
                    $.each($tabs,function(id){
                        if(id==activeId)return;//if active we dont do anything.
                        var $class = $(this).data("tab");
                        $("." + $class).hide();
                    })
                }
                
                //setup tab listeners
                var tabListener = function(){
                    var $id = $(this).index();
                    var blocks = $(this).data("tab");
                    // remove old active state
                    $main.find('.tab.active').removeClass("active");
                    // add new active state
                    $(this).addClass('active');
                    hideOthers($id);
                    $('.' + blocks).show();
                }
               
                
                var tabSwipeLeft = function(){
                    var $active = $main.find(".tab.active");
                    var $next = $active.prev();
                    
                    if($active.index() == 0)
                        $next = $tabs.eq(total-1);                 
                    
                    $next.trigger('click'); 
                }
                
                var tabSwipeRight = function(){
                    var $active = $main.find(".tab.active");
                    var $next = $active.next();
                    
                    if($active.index() == total-1)
                        $next = $tabs.eq(0);
                    
                    $next.trigger('click');  
                }
                
                
                
                // TODO:MAKE SURE THIS DOESNT FIRE UNLESS IN MOBILE                
                if($(window).width()<767){
                    $tabs.first().addClass('active');
                    hideTabItems();
                    $tabs.on("click touch",tabListener);
                    $swipeArea.hammer().on("swiperight", tabSwipeLeft);
                    $swipeArea.hammer().on("swipeleft", tabSwipeRight);
                }
                
                $(window).resize(function () {
                    if($(window).width()<767){
                        hideTabItems();
                        $tabs.on("click touch",tabListener);
                        $swipeArea.hammer().on("swiperight", tabSwipeLeft);
                        $swipeArea.hammer().on("swipeleft", tabSwipeRight);
                        
                    }else{
                        showTabItems();
                        $swipeArea.hammer().off();
                    }
                    
                });
                
            };
            
            $(document).ready(function(){                               
                var $tabSet = $("#home-page-mobile-tabs");
                $tabSet.mobileTabs();
                // $tabSet.taboverflow(); 
            });
    
    
})(jQuery);

