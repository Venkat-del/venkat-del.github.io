 var ht= 0;

$(document).ready(function(){ 

    var twittersocialpanelidContentPage = $('.social-panel.box-blue').attr('id');
    var twittersocialpanelidOtherPage = $('.social-panel.box-green').attr('id');


   if(( /MSIE (9\.[\.0-9]{0,})|Android|webOS|BlackBerry/i.test(navigator.userAgent))){
        setTimeout(function(){
    $('.content-page iframe#twitter-widget-0').contents().find("head").append($("<link rel='stylesheet' href='/css/tweets-panel.css'/>"));

	$('.topic-column iframe#twitter-widget-0').contents().find("head").append($("<link rel='stylesheet' href='/css/topic-page-tweets-panel.css'/>"));
    },1000);
    }
    else{
		setTimeout(function(){
    $('.content-page iframe#twitter-widget-0').contents().find("head").append($("<link rel='stylesheet' href='/css/tweets-panel.css'/>"));

	$('.topic-column iframe#twitter-widget-0').contents().find("head").append($("<link rel='stylesheet' href='/css/topic-page-tweets-panel.css'/>"));
    },300);
    }

    if((matchMedia('(min-width: 767px)').matches)&&((matchMedia('(max-width: 1024px)').matches))){
		setTimeout(function(){

		$('.topic-column .social-panel iframe#twitter-widget-0').contents().find("head").append($("<link rel='stylesheet' href='/css/ipad-topic-page-tweets-panel.css'/>"));
    	},400);
	}

    var anchorId = 'jointwitter-';

    if(! (typeof twittersocialpanelidContentPage === 'undefined' || twittersocialpanelidContentPage === null)) {

        anchorId = anchorId+twittersocialpanelidContentPage;
    } 
    else {

        if(! (typeof twittersocialpanelidOtherPage === 'undefined' || twittersocialpanelidOtherPage === null)) {

         anchorId = anchorId+twittersocialpanelidOtherPage;
       } 

    }


if($('.get-in-touch').find('.get-in-touch-rich-text').length){
		setTimeout(function(){ $('.get-in-touch .social-panel .twitt-iframe').css({'min-height':'100px','max-height': $('.get-in-touch .get-in-touch-rich-text').height(), 'overflow-y':'scroll', '-webkit-overflow-scrolling': 'touch'});  }, 200);
    }
    else{

        $('.get-in-touch .author-panel-area .author-panel .profile-boxes').each(function(){ht+=$(this).height();});
		setTimeout(function(){ $('.get-in-touch .social-panel .twitt-iframe').css({'max-height': ht, 'overflow-y':'scroll', '-webkit-overflow-scrolling': 'touch'});  }, 200);
    }


});

$(window).load(function(){
    if($('.get-in-touch .col-70').height()>$('.get-in-touch .col-30').height()){
        var h=$('.get-in-touch .col-70').height()-$('.get-in-touch .col-30').height();
        h+=ht;
        $('.get-in-touch .social-panel .twitt-iframe').css({'max-height': h, 'overflow-y':'scroll', '-webkit-overflow-scrolling': 'touch'});


    }

});