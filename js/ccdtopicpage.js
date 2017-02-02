/* Moving commented code from this 'js' to fulltopicpage/customheadlibs.jsp to fix SiteCatalyst store.setProperty undefined issue.
var topicpage_careersComponentArray = [];
var topicpage_employeeComponentArray = [];
var topicpage_eventComponentArray = [];
var topicpage_featuredComponentArray = [];
var topicpage_standardComponentArray = [];
var topicpage_solutionsComponentArray = [];

var scPromoIDs = "";

var maxLengthArray = 5;
var tagsString = "";

var tagValuesString = "";
var curatedPromosCount = 0;

function registerCuratedPromos(hashValue, type) {
	if(scPromoIDs == ""){
		scPromoIDs = hashValue;
	}else{
		scPromoIDs += "," + hashValue;
	}
	curatedPromosCount++;
}

function registerPromos(divID, promoType) {
    if(promoType == 'career') {
    	topicpage_careersComponentArray.push(divID);
    } else if(promoType == 'profiles') {
    	topicpage_employeeComponentArray.push(divID);
    } else if(promoType == 'events') {
    	topicpage_eventComponentArray.push(divID);
    } else if(promoType == 'featured') {
    	topicpage_featuredComponentArray.push(divID);
    } else if(promoType == 'standard') {
    	topicpage_standardComponentArray.push(divID);
    } else if(promoType == 'solutions') {
    	topicpage_solutionsComponentArray.push(divID);
    }
}*/
function findMaxLengthArray(){
	var promoArrayLength = [];
	promoArrayLength.push(topicpage_careersComponentArray.length);
	promoArrayLength.push(topicpage_employeeComponentArray.length);
	promoArrayLength.push(topicpage_eventComponentArray.length);
	promoArrayLength.push(topicpage_solutionsComponentArray.length);
	promoArrayLength.push(topicpage_standardComponentArray.length+topicpage_featuredComponentArray.length);
	maxLengthArray = promoArrayLength[0];
	for (var i=1; i<6; i++)
	{
		if(promoArrayLength[i]>maxLengthArray)
		{
			maxLengthArray = promoArrayLength[i];
		}
	}
	return maxLengthArray;
}

$(document).ready(function(){
	var resultCount = findMaxLengthArray();
	var topicPageJsonURL = "";
	if(resultCount > 0){
		topicPageJsonURL += memberFirmSNPURL;
		topicPageJsonURL += "?count="+resultCount+"&do=topic";
		topicPageJsonURL += "&sp_x_1=sc-pagename&sp_q_1="+topicPageExclusionList+"&sp_q_required_1=-1&callback=?";
		topicPageJsonURL += "&q=\""+topicTagValues+"\"";
		$.getJSON(topicPageJsonURL, function(result){
	        $.each(result, function(i, resultSetsArray){
	        	populateTopicPagePromosJSONData(resultSetsArray);
	            hideEmptyFeaturedStandardPromos();
	        });
	        
	      //Append Promos Values
	        if (scPromoIDs != '') {
	        	if($CQ("#sc_scroll_event29") != null && $CQ("#sc_scroll_event29") != undefined && $CQ("#sc_scroll_event29") != 'undefined'){
	        		$CQ("#sc_scroll_event29").removeAttr("record");
	        	}
	        	if($CQ("#sc_scroll_event30") != null && $CQ("#sc_scroll_event30") != undefined && $CQ("#sc_scroll_event30") != 'undefined'){
	        		$CQ("#sc_scroll_event30").removeAttr("record");
	        	}
	        	$CQ("#sc_event27").attr("record", "'event27', {'list2':scPromoIDs}");
	        }
	        
	        //tagsString = "*";
	        if(tagsString.indexOf("|", tagsString.length-1) != -1) {
	        	tagsString = tagsString.substring(0, tagsString.length-1);
	        }
			tagsString = tagsString.replace(/\|/g, "\" \"");
			tagsString = "\""+tagsString+"\"";
			tagsString += topicPageCuratedPromosTags;
			tagsString = escape(tagsString);
			var finalTagsURL = memberFirmSNPURL+"?count=5&do=topic-tag&sp_x_1=sc-pagename&sp_q_1="+currentPageHashValue+"&sp_q_required_1=-1&callback=?&q="+tagsString;
	        if(showHideSimilarTopics != null && showHideSimilarTopics != '' && showHideSimilarTopics == 'activate'){
		        $.getJSON(finalTagsURL, function(result){
		            $.each(result, function(i, resultSetsArray){
		            	populateTopicPageSimilarTrendsTagsData(resultSetsArray);
		                
		            });
		        });
	        }
	        else {
	        	//Fires SiteCat Event
	            $CQ(document).trigger("customevent");
	        }
	      
	    });
	} else {
		//Append Promos Values
        if (scPromoIDs != '') {
        	if($CQ("#sc_scroll_event29") != null && $CQ("#sc_scroll_event29") != undefined && $CQ("#sc_scroll_event29") != 'undefined'){
        		$CQ("#sc_scroll_event29").removeAttr("record");
        	}
        	if($CQ("#sc_scroll_event30") != null && $CQ("#sc_scroll_event30") != undefined && $CQ("#sc_scroll_event30") != 'undefined'){
        		$CQ("#sc_scroll_event30").removeAttr("record");
        	}
        	$CQ("#sc_event27").attr("record", "'event27', {'list2':scPromoIDs}");
        }
        if(showHideSimilarTopics != null && showHideSimilarTopics != '' && showHideSimilarTopics == 'activate'){
        	if(curatedPromosCount > 0) {
        		tagsString += topicPageCuratedPromosTags;
        		tagsString = escape(tagsString);
        		var finalTagsURL = memberFirmSNPURL+"?count=5&do=topic-tag&sp_x_1=sc-pagename&sp_q_1="+currentPageHashValue+"&sp_q_required_1=-1&callback=?&q="+tagsString;
		        $.getJSON(finalTagsURL, function(result){
		            $.each(result, function(i, resultSetsArray){
		            	populateTopicPageSimilarTrendsTagsData(resultSetsArray);
		                
		            });
		        });
        	}
        }else {
        	//Fires SiteCat Event
            $CQ(document).trigger("customevent");
        }
	}
	//For recalculating the window size after populating the divs dynamically from CCD
    $(window).resize();
    // To fix the images loading problem for CCD Content.
    setAllImgsRendition();
	
});


function  populateTopicPagePromosJSONData(resultSetsArray) {
    $.each(resultSetsArray, function(arrayIndex, arrayObjects){
        $.each(arrayObjects, function(objectType, dataObjArray){
            if(objectType == 'career' && topicpage_careersComponentArray.length > 0 ) {
            	$.each(dataObjArray, function(arrayIndex, careersObjArray){
	            	var indexVal = careersObjArray['index'];
	            	var urlVal = careersObjArray['url'];
	            	var heading1Val = careersObjArray['heading1'];
	            	var heading2Val = careersObjArray['heading2'];
	            	var descriptionVal = careersObjArray['description'];
	            	var contentTypeVal = careersObjArray['content-type'];
	            	var careerLocationsVal = careersObjArray['career-locations'];
	            	var careerFirmServiceVal = careersObjArray['career-firm-service'];
	            	var careerTypeVal = careersObjArray['career-type'];
	            	var promoColorVal = careersObjArray['promo-color'];
	            	var pageViewsVal = careersObjArray['page-views'];
	            	if(careersObjArray['tags'] != undefined)
	            		tagsString += careersObjArray['tags']+"|";
	            	
	            	if(topicpage_careersComponentArray.length > arrayIndex){
	            		$("#"+topicpage_careersComponentArray[arrayIndex]+" .promo-label").html(contentTypeVal);
                        $("#"+topicpage_careersComponentArray[arrayIndex]+" .tertiary-headline").attr('href', urlVal).html(heading1Val).attr('cq-id',careersObjArray['cq-id']);
                        $("#"+topicpage_careersComponentArray[arrayIndex]+" .page-description-for-promo").attr('href', urlVal).html(descriptionVal).attr('cq-id',careersObjArray['cq-id']);
                        
                        if (scPromoIDs == "")
    	            		scPromoIDs = careersObjArray['cq-id'];
    	            	else
    	            		scPromoIDs += "," + careersObjArray['cq-id'];
	            	}
            	});
            	/*if(topicpage_careersComponentArray.length > dataObjArray.length){
            		for(var i=dataObjArray.length; i<topicpage_careersComponentArray.length; i++) {
            			$("#"+topicpage_careersComponentArray[i]).hide();
            		}
            	}*/
            	hideEmptyPromosTopicPage(topicpage_careersComponentArray, dataObjArray);
            }
            else if(objectType == 'solutions' && topicpage_solutionsComponentArray.length > 0) {
            	$.each(dataObjArray, function(arrayIndex, solutionObjArray){
	            	var indexVal = solutionObjArray['index'];
	            	var urlVal = solutionObjArray['url'];
	            	var heading1Val = solutionObjArray['heading1'];
	            	var heading2Val = solutionObjArray['heading2'];
	            	var descriptionVal = solutionObjArray['description'];
	            	var contentTypeVal = solutionObjArray['content-type'];
	            	if(solutionObjArray['tags'] != undefined)
	            		tagsString += solutionObjArray['tags']+"|";
	            	
	            	if(topicpage_solutionsComponentArray.length > arrayIndex){
	            		$("#"+topicpage_solutionsComponentArray[arrayIndex]+" .promo-label").html(contentTypeVal);
                        $("#"+topicpage_solutionsComponentArray[arrayIndex]+" .tertiary-headline").attr('href', urlVal).html(heading1Val).attr('cq-id',solutionObjArray['cq-id']);
                        $("#"+topicpage_solutionsComponentArray[arrayIndex]+" .page-description-for-promo").attr('href', urlVal).html(descriptionVal).attr('cq-id',solutionObjArray['cq-id']);
                        
                        if (scPromoIDs == "")
                    		scPromoIDs = solutionObjArray['cq-id'];
                    	else
                    		scPromoIDs += "," + solutionObjArray['cq-id'];
	            	}
            	});
            	
            	/*if(topicpage_solutionsComponentArray.length > dataObjArray.length){
            		for(var i=dataObjArray.length; i<topicpage_solutionsComponentArray.length; i++) {
            			$("#"+topicpage_solutionsComponentArray[i]).hide();
            		}
            	}*/
            	hideEmptyPromosTopicPage(topicpage_solutionsComponentArray, dataObjArray);
            }
            else if(objectType == 'profiles' && topicpage_employeeComponentArray.length > 0) {
            	$.each(dataObjArray, function(arrayIndex, employeesObjArray){
	            	var indexVal = employeesObjArray['index'];
	            	var urlVal = employeesObjArray['url'];
	            	var heading1Val = employeesObjArray['heading1'];
	            	var employeeTitleVal = employeesObjArray['employee-title'];
	            	
	            	if(heading1Val == undefined){
	            		heading1Val = '';
	            	}
	            	if(employeeTitleVal == undefined){
	            		employeeTitleVal = heading1Val;
	            	}
	            	var contentTypeVal = 'Our People';
	            	if(employeesObjArray['content-type'] != undefined){
	            		contentTypeVal = employeesObjArray['content-type'];
	            	}
	            	var profileSurnameVal = employeesObjArray['profile-surname'];
	            	var profileGivenNameVal = employeesObjArray['profile-given-name'];
	            	var promoColorVal = employeesObjArray['promo-color'];
	            	var imageVal = employeesObjArray['image'];
	            	if(employeesObjArray['tags'] != undefined)
	            		tagsString += employeesObjArray['tags']+"|";
	            	
	            	if(topicpage_employeeComponentArray.length > arrayIndex){
	            		$("#"+topicpage_employeeComponentArray[arrayIndex]+" .promo-label").html(contentTypeVal);
                        $("#"+topicpage_employeeComponentArray[arrayIndex]+" .tertiary-headline").attr('href', urlVal).html(profileGivenNameVal).attr('cq-id',employeesObjArray['cq-id']);
                        $("#"+topicpage_employeeComponentArray[arrayIndex]+" .employee-image img").attr('alt', imageVal).attr('orgsrc', imageVal).attr('cq-id',employeesObjArray['cq-id']);
                        $("#"+topicpage_employeeComponentArray[arrayIndex]+" a").attr('href', urlVal);
                        $("#"+topicpage_employeeComponentArray[arrayIndex]+" .employee-title p").html(employeeTitleVal);
                        
                        if (scPromoIDs == "")
                    		scPromoIDs = employeesObjArray['cq-id'];
                    	else
                    		scPromoIDs += "," + employeesObjArray['cq-id'];
	            	}
            	});
            	/*if(topicpage_employeeComponentArray.length > dataObjArray.length){
            		for(var i=dataObjArray.length; i<topicpage_employeeComponentArray.length; i++) {
            			$("#"+topicpage_employeeComponentArray[i]).hide();
            		}
            	}*/
            	hideEmptyPromosTopicPage(topicpage_employeeComponentArray, dataObjArray);
            }
            else if(objectType == 'events' && topicpage_eventComponentArray.length > 0) {
            	$.each(dataObjArray, function(arrayIndex, eventsObjArray){
	            	var indexVal = eventsObjArray['index'];
	            	var urlVal = eventsObjArray['url'];
	            	var heading1Val = eventsObjArray['heading1'];
	            	var heading2Val = eventsObjArray['heading2'];
	            	var descriptionVal = eventsObjArray['description'];
	            	var contentTypeVal = eventsObjArray['content-type'];
	            	var addressVal = eventsObjArray['address'];
	            	var cityVal = eventsObjArray['city'];
	            	var eventDateVal = eventsObjArray['event-date'];
	            	var promoColorVal = eventsObjArray['promo-color'];
	            	if(eventsObjArray['tags'] != undefined)
	            		tagsString += eventsObjArray['tags']+"|";
	            	
	            	if(topicpage_eventComponentArray.length > arrayIndex){
	            		$("#"+topicpage_eventComponentArray[arrayIndex]+" .promo-label").html(contentTypeVal);
                        $("#"+topicpage_eventComponentArray[arrayIndex]+" .tertiary-headline").attr('href', urlVal).html(heading1Val).attr('cq-id',eventsObjArray['cq-id']);
                        $("#"+topicpage_eventComponentArray[arrayIndex]+" .page-description-for-promo").attr('href', urlVal).html(descriptionVal).attr('cq-id',eventsObjArray['cq-id']);
                        //$("#"+topicpage_eventComponentArray[arrayIndex]+" .article-image img").attr('alt', imageVal).attr('src', imageVal);
                        
                        if (scPromoIDs == "")
                    		scPromoIDs = eventsObjArray['cq-id'];
                    	else
                    		scPromoIDs += "," + eventsObjArray['cq-id'];
	            	}
            	});
            	/*if(topicpage_eventComponentArray.length > dataObjArray.length){
            		for(var i=dataObjArray.length; i<topicpage_eventComponentArray.length; i++) {
            			$("#"+topicpage_eventComponentArray[i]).hide();
            		}
            	}*/
            	hideEmptyPromosTopicPage(topicpage_eventComponentArray, dataObjArray);
            }
            else if(objectType == 'featured') {
            	var featuredPromosCount = 0;
            	var standardPromosCount = 0;
            	$.each(dataObjArray, function(arrayIndex, featuredObjArray){
            		var indexVal = featuredObjArray['index'];
        	        var urlVal = featuredObjArray['url'];
        	        var heading1Val = featuredObjArray['heading1'];
        	        var heading2Val = featuredObjArray['heading2'];
        	        var descriptionVal = featuredObjArray['description'];
        	        var contentTypeVal = featuredObjArray['content-type'];
        	        var imageVal = featuredObjArray['image'];
        	        var pageTypeVal = featuredObjArray['page-type'];
        	        var pageViewsVal = featuredObjArray['page-views'];
        	        var featured_standard_type = featuredObjArray['featured'];
        	        if(featuredObjArray['tags'] != undefined)
	            		tagsString += featuredObjArray['tags']+"|";
        	        if(featuredObjArray['description'] == undefined)
        	        	descriptionVal = heading2Val;
	            	
        	        if(featured_standard_type == '1' && featuredPromosCount < topicpage_featuredComponentArray.length){// value 1 means featured type
        	        	if(topicpage_featuredComponentArray.length > 0 && (featuredPromosCount < topicpage_featuredComponentArray.length)) {
        	        		$("#"+topicpage_featuredComponentArray[featuredPromosCount]+" .promo-label").html(contentTypeVal);
        	             	$("#"+topicpage_featuredComponentArray[featuredPromosCount]+" a").attr('href', urlVal).attr('cq-id',dataObjArray['cq-id']);
							$("#"+topicpage_featuredComponentArray[featuredPromosCount]+" .secondary-headline.white-title").html(heading1Val);
							$("#"+topicpage_featuredComponentArray[featuredPromosCount]+" .secondary-headline.green-title").html(heading2Val);
        	                $("#"+topicpage_featuredComponentArray[featuredPromosCount]+" .article-image img").attr('alt', imageVal).attr('orgsrc', imageVal);
        	                featuredPromosCount++;
        	                
        	                if (scPromoIDs == "")
                        		scPromoIDs = featuredObjArray['cq-id'];
                        	else
                        		scPromoIDs += "," + featuredObjArray['cq-id'];
        	            }
        	        }
        	        else if(featured_standard_type != '1' || featuredPromosCount >= topicpage_featuredComponentArray.length){
        	        	if(topicpage_standardComponentArray.length > 0 && (standardPromosCount < topicpage_standardComponentArray.length)) {
        	                $("#"+topicpage_standardComponentArray[standardPromosCount]+" .promo-label").html(contentTypeVal);
        	                $("#"+topicpage_standardComponentArray[standardPromosCount]+" .tertiary-headline").attr('href', urlVal).html(heading1Val).attr('cq-id',featuredObjArray['cq-id']);
        	                $("#"+topicpage_standardComponentArray[standardPromosCount]+" .page-description-for-promo").attr('href', urlVal).html(descriptionVal).attr('cq-id',featuredObjArray['cq-id']);
        	                //$("#"+topicpage_standardComponentArray[standardPromosCount]+" .article-image img").attr('alt', imageVal).attr('src', imageVal);
        	                standardPromosCount++;
        	                
        	                if (scPromoIDs == "")
                        		scPromoIDs = featuredObjArray['cq-id'];
                        	else
                        		scPromoIDs += "," + featuredObjArray['cq-id'];
        	            }
        	        }
                    	
            	});
            }
        });
    });
}
function  populateTopicPageSimilarTrendsTagsData(resultSetsArray) {
    $.each(resultSetsArray, function(arrayIndex, arrayObjects){
        $.each(arrayObjects, function(objectType, dataObjArray){
        	$.each(dataObjArray, function(arrayIndex, tagsObjArray){
            	var indexVal = tagsObjArray['index'];
            	var urlVal = tagsObjArray['url'];
            	var tagVal = tagsObjArray['tag'];            	
            	var dynamicString = "<li><a class='body-copy' href='"+urlVal+"' onclick='javascript:return trackTags(\"" + tagsObjArray['cq-name'] + "\");'>"+tagVal+"</a></li>";
            	$("div.similar-trends ul.article-tags").append(dynamicString);
            	if(tagValuesString == ""){
            		tagValuesString = tagsObjArray['cq-name'];
            	}else{
            		tagValuesString += "," + tagsObjArray['cq-name'];
            	}
        	});
        	$("div.similar-trends ul.article-tags").append("<li class='for-clear'></li>");
        });
    });
    
  //Append Tag Values
    if (tagValuesString != '') {
    	$CQ("#sc_event25").attr("record", "'event25', {'list1':tagValuesString}");
    }
    //Fires SiteCat Event
    $CQ(document).trigger("customevent");
}
function hideEmptyPromosTopicPage(promosArray, dataArray){
	if(promosArray.length > dataArray.length){
		for(var i=dataArray.length; i<promosArray.length; i++) {
			if(wcmMode == 'DISABLED') {
				$("#"+promosArray[i]).hide();
			}
			else {
				$("#"+promosArray[i]+" .promo-label").html(emptyPromoMessage);
			}
		}
	}
}

function  hideEmptyFeaturedStandardPromos() {
    for(var i=0; i < topicpage_featuredComponentArray.length; i++){
    	if($("#"+topicpage_featuredComponentArray[i]+" .promo-label").html() == '' && wcmMode == 'DISABLED'){
    		$("#"+topicpage_featuredComponentArray[i]).hide();
    	}else if($("#"+topicpage_featuredComponentArray[i]+" .promo-label").html() == '' && wcmMode != 'DISABLED'){
    		$("#"+topicpage_featuredComponentArray[i]+" .promo-label").html(emptyPromoMessage);
    	}
    }
    for(var i=0; i < topicpage_standardComponentArray.length; i++){
    	if($("#"+topicpage_standardComponentArray[i]+" .promo-label").html() == '' && wcmMode == 'DISABLED'){
    		$("#"+topicpage_standardComponentArray[i]).hide();
    	}else if($("#"+topicpage_standardComponentArray[i]+" .promo-label").html() == '' && wcmMode != 'DISABLED'){
    		$("#"+topicpage_standardComponentArray[i]+" .promo-label").html(emptyPromoMessage);
    	}
    }
}

function trackTags(name) {
	var events = new Array();
    events[0] = "event26";
    
    //Define the data needs to be passed to SiteCatalyst
    var data = new Object();
    data['pageName'] = sc_currentPageName + '_TagClick_' + name;
    data['prop75'] = sc_currentPageName + '_TagClick_' + name;
    data['list1'] = name;
    data['eVar31'] = name;
    
    recordSitecatEvent(events, data, "TagClick");
}