var homepage_globalFeaturedComponentArray = [];
var homepage_globalStandardComponentArray = [];

var featuredPromoIdString = '';
var trendingPromoIdString = '';

function registerCuratedPromos(hashValue, type) {
    if(featuredPromoIdString == ""){
        featuredPromoIdString = hashValue;
    }else{
        featuredPromoIdString += "," + hashValue;
    }
}

function registerPromos(divID, promoType) {
    if(promoType == 'featured') {
        homepage_globalFeaturedComponentArray.push(divID);
    } else if(promoType == 'standard') {
        homepage_globalStandardComponentArray.push(divID);
    }
}

function findMaxLengthArray(){
    var featuredArrayLength = homepage_globalFeaturedComponentArray.length;
    var standardArrayLength = homepage_globalStandardComponentArray.length;
    var resultsCount = 7;//Because trending has 7 promos by default.
    
    if(resultsCount < (featuredArrayLength + standardArrayLength)){
        resultsCount = featuredArrayLength + standardArrayLength;
    }
    return resultsCount;
}

$(document).ready(function(){
    var resultsCount = findMaxLengthArray();
    var homePageJsonURL = "";
    homePageJsonURL += memberFirmSNPURL;
    homePageJsonURL += "?count="+resultsCount;
    homePageJsonURL += "&do=home&q=*";
    homePageJsonURL += "&sp_x_1=sc-pagename&sp_q_required_1=-1&callback=?&sp_q_1="+homePageExclusionList;
    if (!typeof(tntFlag) == 'undefined') {homePageJsonURL += tntFlag;}
    $.getJSON(homePageJsonURL, function(result){
    //$.getJSON(memberFirmSNPURL+"?q=*&count="+resultsCount+"&do=home&callback=?",function(result){
        $.each(result, function(i, trendingFeaturedArray){
            populateTrendingJSONData(trendingFeaturedArray[0].trending);
            populateFeaturedJSONData(trendingFeaturedArray[1].featured);

        });
      //For recalculating the window size after populating the divs dynamically from CCD
        $(window).resize();
     // To fix the images loading problem for CCD Content.
        setAllImgsRendition();
    });
});

function populateTrendingJSONData(trendingObj) {
    $.each(trendingObj, function(itemsIndex, dataObjArray){

        var indexVal = dataObjArray['index'];
        var urlVal = dataObjArray['url'];
        var heading1Val = dataObjArray['heading1'];
        var heading2Val = dataObjArray['heading2'];
        var contentTypeVal = dataObjArray['content-type'];
        var imageVal = dataObjArray['image'];
        var pageTypeVal = dataObjArray['page-type'];
        var pageViewsVal = dataObjArray['page-views'];
        if(trendingPromoIdString == '')
            trendingPromoIdString = dataObjArray['cq-id'];
        else
            trendingPromoIdString += "," + dataObjArray['cq-id'];   

        $("#div"+(itemsIndex+1)+" .label").html(contentTypeVal);
        $("#div"+(itemsIndex+1)+" .trending-headline").attr('href', urlVal).attr('onclick', 'recordSiteCatalystEventsForTrending(\'' + dataObjArray['cq-id'] + '\')').html(heading1Val);
        $("#div"+(itemsIndex+1)+" .trending-headline.secondary").attr('href', urlVal).attr('onclick', 'recordSiteCatalystEventsForTrending(\''+dataObjArray['cq-id']+'\')').html(heading2Val);
        //$(".trending#div"+(itemsIndex+1)+" .article-image img").attr('alt', imageVal).attr('src', imageVal);
        
    });
}
function  populateFeaturedJSONData(featuedObj) {

    var featuredPromosCount = 0;
    var standardPromosCount = 0;
    
    $.each(featuedObj, function(itemsIndex, dataObjArray){

        var indexVal = dataObjArray['index'];
        var urlVal = dataObjArray['url'];
        var heading1Val = dataObjArray['heading1'];
        var heading2Val = dataObjArray['heading2'];
        var contentTypeVal = dataObjArray['content-type'];
        var imageVal = dataObjArray['image'];
        var pageTypeVal = dataObjArray['page-type'];
        var pageViewsVal = dataObjArray['page-views'];
        var featured_standard_type = dataObjArray['featured'];
        var descriptionVal = dataObjArray['description'];
        
        if(dataObjArray['description'] == undefined)
            descriptionVal = heading2Val;
        
        if(featured_standard_type == '1' && featuredPromosCount < homepage_globalFeaturedComponentArray.length){// value 1 means featured type
            if(homepage_globalFeaturedComponentArray.length > 0 && (featuredPromosCount < homepage_globalFeaturedComponentArray.length)) {
                $("#"+homepage_globalFeaturedComponentArray[featuredPromosCount]+" .promo-label").html(contentTypeVal);
                $("#"+homepage_globalFeaturedComponentArray[featuredPromosCount]+" a").attr('href', urlVal).attr('cq-id',dataObjArray['cq-id']);
                $("#"+homepage_globalFeaturedComponentArray[featuredPromosCount]+" .secondary-headline.white-title").html(heading1Val);
                $("#"+homepage_globalFeaturedComponentArray[featuredPromosCount]+" .secondary-headline.green-title").html(heading2Val);
                $("#"+homepage_globalFeaturedComponentArray[featuredPromosCount]+" .article-image img").attr('alt', imageVal).attr('orgsrc', imageVal);
                featuredPromosCount++;
                
              //alert(dataObjArray['cq-id']);
                if(featuredPromoIdString == '')
                    featuredPromoIdString = dataObjArray['cq-id'];
                else
                    featuredPromoIdString += "," + dataObjArray['cq-id']; 
            }
        }
        else if(featured_standard_type != '1' || featuredPromosCount >= homepage_globalFeaturedComponentArray.length){
            if(homepage_globalStandardComponentArray.length > 0 && (standardPromosCount < homepage_globalStandardComponentArray.length)) {
                $("#"+homepage_globalStandardComponentArray[standardPromosCount]+" .promo-label").html(contentTypeVal);
                $("#"+homepage_globalStandardComponentArray[standardPromosCount]+" .tertiary-headline").attr('href', urlVal).html(heading1Val).attr('cq-id',dataObjArray['cq-id']);;
                $("#"+homepage_globalStandardComponentArray[standardPromosCount]+" .page-description-for-promo").attr('href', urlVal).html(descriptionVal).attr('cq-id',dataObjArray['cq-id']);;
                //$("#"+homepage_globalStandardComponentArray[standardPromosCount]+" .article-image img").attr('alt', imageVal).attr('src', imageVal);
                standardPromosCount++;
                
              //alert(dataObjArray['cq-id']);
                if(featuredPromoIdString == '')
                    featuredPromoIdString = dataObjArray['cq-id'];
                else
                    featuredPromoIdString += "," + dataObjArray['cq-id']; 
            }
        }
    });
    
    if (featuredPromoIdString != '') {
    	if($CQ("#sc_scroll_event29") != null && $CQ("#sc_scroll_event29") != undefined && $CQ("#sc_scroll_event29") != 'undefined'){
    		$CQ("#sc_scroll_event29").removeAttr("record");
    	}
    	if($CQ("#sc_scroll_event30") != null && $CQ("#sc_scroll_event30") != undefined && $CQ("#sc_scroll_event30") != 'undefined'){
    		$CQ("#sc_scroll_event30").removeAttr("record");
    	}
    	
	    $CQ("#featured_event27").attr("record", "'event27', {'list2':featuredPromoIdString}");
    }
    
    //Fires SiteCat Event
    $CQ(document).trigger("customevent");
    
    for(var i=0; i < homepage_globalFeaturedComponentArray.length; i++){
        if($("#"+homepage_globalFeaturedComponentArray[i]+" .promo-label").html() == '' && wcmMode == 'DISABLED'){
            $("#"+homepage_globalFeaturedComponentArray[i]).hide();
        }else if($("#"+homepage_globalFeaturedComponentArray[i]+" .promo-label").html() == '' && wcmMode != 'DISABLED'){
    		$("#"+homepage_globalFeaturedComponentArray[i]+" .promo-label").html(emptyPromoMessage);
    	}
    }
    for(var i=0; i < homepage_globalStandardComponentArray.length; i++){
        if($("#"+homepage_globalStandardComponentArray[i]+" .promo-label").html() == '' && wcmMode == 'DISABLED'){
            $("#"+homepage_globalStandardComponentArray[i]).hide();
        }else if($("#"+homepage_globalStandardComponentArray[i]+" .promo-label").html() == '' && wcmMode != 'DISABLED'){
    		$("#"+homepage_globalStandardComponentArray[i]+" .promo-label").html(emptyPromoMessage);
    	}
    }
}

// Sitecatalyst eVar46 PromoType 
function recordSiteCatalystEventsForTrending(heading1Val) {
	
	//Define Events Array
	var events = new Array();
	events[0] = "event28";
	
	//Define the data needs to be passed to SiteCatalyst
	var data = new Object();
	data['pageName'] = sc_currentPageName + '_PromoClick_' + heading1Val;
	data['prop75'] = sc_currentPageName + '_PromoClick_' + heading1Val;
	data['list2'] = heading1Val;
	data['eVar32'] = heading1Val;
	
	recordSitecatEvent(events, data, "PromoClick");
    
    // Adding Sitecat Promo type evar46 cookie
    document.cookie = "Cookie_Sitecatalyst_eVar46_PromoType" + "=" + "Featured;path=/";
}
