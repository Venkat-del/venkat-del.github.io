var shareimg = encodeURIComponent($('meta[property="og:image"]').attr('content'));
var sharedesc = encodeURIComponent($('meta[property="og:description"]').attr('content'));
var shareurl = encodeURIComponent($('meta[property="og:url"]').attr('content'));
var sharetitle = encodeURIComponent($('meta[property="og:title"]').attr('content'));
var sharesite = $('meta[name="twitter:site"]').attr('content').replace("@","");
var sharesitename = encodeURIComponent($('meta[property="og:site_name"]').attr('content'));

var fbshare = "https://www.facebook.com/dialog/feed?" +
"&app_id=391573044299401" +
"&link=" + shareurl +
"&picture=" + shareimg + 
"&name=" + sharetitle +
"&description=" + sharedesc + 
"&redirect_uri=https%3A%2F%2Fwww2stage.deloitte.com%2Fshareclose.html" +
"&display=popup";

var twtshare = "https://twitter.com/intent/tweet?" +
"&url=" + shareurl +
"&text=" + sharetitle +
"&via=" + sharesite;

var lishare = "https://www.linkedin.com/cws/share?" +
"&url=" + shareurl +
"&mini=true" +
"&token=" +
"&ro=false" + 
"&title=" + sharetitle +
"&isFramed=true" + 
"&summary=" + sharedesc +
"&source=" + sharesitename;

var gpshare = "https://plus.google.com/share?url=" + shareurl;

var emailshare = "mailto:?subject=" + sharetitle + "&body=" + sharedesc + "%0D%0A%0D%0A" + shareurl;

var weiboshare = "http://service.weibo.com/share/share.php?" +
"url=" + shareurl + 
"&appkey=" + 
"&title=" + sharedesc +
"&pic=" + 
"&ralateUid=" +
"&language=zh_cn";

var renshare = "http://share.renren.com/share/buttonshare.do?" +
"link=" + shareurl +
"&title=" + sharedesc;


var vkshare = "http://vkontakte.ru/share.php?" +
"url=" + shareurl +
"&title=" + sharetitle +
"&description=" + sharedesc +
"&display=widget";

var xingshare = "https://www.xing.com/social_plugins/share?" +
"url=" + shareurl +
"&wtmc=XING" +
"&sc_p=xing-share";

var pinterestshare ="https://pinterest.com/pin/create/button/?" +
"url=" + shareurl +
"&media=" + shareimg +
"&description=" + sharedesc;

var launchShare = function(provider, url){
                if(provider==="email"){
                                window.location.href = url;
                }else{	
						switch(provider)
						{
						case 'pinterest': window.open(url, "Share","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=280,width=600");     break;
						case 'twitter': window.open(url, "Share","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=280,width=600");     break;
						default : window.open(url, "Share","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=480,width=600");
						}
                }
}

 $( ".social-share-links a" ).click(function( event ) {
  event.preventDefault(); /* Reset Default anchor behavior */
});
 
/*
$(".icon-facebook").attr("title",janrain.settings.share.translate.facebook.titleBroadcast);
$(".icon-twitter").attr("title",janrain.settings.share.translate.twitter.titleBroadcast);
$(".icon-linkedin").attr("title",janrain.settings.share.translate.linkedin.titleBroadcast);
$(".icon-google-plus").attr("title",janrain.settings.share.translate.facebook.titleBroadcast.replace("Facebook", "Google Plus"));
$(".icon-envelope").attr("title",janrain.settings.share.translate.email.titleContactZero);
*/