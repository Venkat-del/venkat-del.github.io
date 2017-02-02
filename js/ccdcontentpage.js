var articlepage_careersComponentArray = [];//NS
var articlepage_employeeComponentArray = [];//NS
var articlepage_eventComponentArray = [];//NS
var articlepage_featuredComponentArray = [];//DM
var articlepage_standardComponentArray = [];//DM
var articlepage_solutionsComponentArray = [];//NS

var discoverMore_promoComponentString = '';
var nextSteps_promoComponentString = '';

var maxLengthArray = 5;
var tagsStringForDMTags = "";

var articlepage_curatedCareersComponentArray = [];//NS
var articlepage_curatedEmployeeComponentArray = [];//NS
var articlepage_curatedEventComponentArray = [];//NS
var articlepage_curatedFeaturedComponentArray = [];//DM
var articlepage_curatedStandardComponentArray = [];//DM
var articlepage_curatedSolutionsComponentArray = [];//NS

var tagValuesArray = [];
var curatedPromosCount = 0;

function registerCuratedPromos(divID, promoType) {
	if(promoType == 'career') {
		articlepage_curatedCareersComponentArray.push(divID);
	} else if(promoType == 'profiles') {
		articlepage_curatedEmployeeComponentArray.push(divID);
	} else if(promoType == 'events') {
		articlepage_curatedEventComponentArray.push(divID);
	} else if(promoType == 'featured') {
		articlepage_curatedFeaturedComponentArray.push(divID);
	} else if(promoType == 'standard') {
		articlepage_curatedStandardComponentArray.push(divID);
	} else if(promoType == 'solutions') {
		articlepage_curatedSolutionsComponentArray.push(divID);
	}
	curatedPromosCount++;
}


function registerPromos(divID, promoType) {
    if(promoType == 'career') {
    	articlepage_careersComponentArray.push(divID);
    } else if(promoType == 'profiles') {
    	articlepage_employeeComponentArray.push(divID);
    } else if(promoType == 'events') {
    	articlepage_eventComponentArray.push(divID);
    } else if(promoType == 'featured') {
    	articlepage_featuredComponentArray.push(divID);
    } else if(promoType == 'standard') {
    	articlepage_standardComponentArray.push(divID);
    } else if(promoType == 'solutions') {
    	articlepage_solutionsComponentArray.push(divID);
    }
}
function findMaxLengthArray(){
	var promoArrayLength = [];
	promoArrayLength.push(articlepage_careersComponentArray.length);
	promoArrayLength.push(articlepage_employeeComponentArray.length);
	promoArrayLength.push(articlepage_eventComponentArray.length);
	promoArrayLength.push(articlepage_solutionsComponentArray.length);
	promoArrayLength.push(articlepage_featuredComponentArray.length + articlepage_standardComponentArray.length);
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
	if(contentPageTagsString == '')
		contentPageTagsString = "*";
	var contentPageJsonURL = "";
	var discoverMoreTagsJsonURL = "";
	if(resultCount > 0){
		contentPageJsonURL += memberFirmSNPURL;
		contentPageTagsString = escape(contentPageTagsString);
		contentPageJsonURL += "?count="+resultCount;
		contentPageJsonURL += "&do=next-disc";
		contentPageJsonURL += "&sp_x_1=sc-pagename&sp_q_1="+contentPageExclusionList+"&sp_q_required_1=-1&callback=?";
		contentPageJsonURL += "&q="+contentPageTagsString;
		//$.getJSON(memberFirmSNPURL+"?q=*&count="+resultCount+"&do=next-disc&sp_x_1=page-name&sp_q_1="+contentPageExclusionList+"&callback=?",function(result){
		$.getJSON(contentPageJsonURL, function(result){
	        $.each(result, function(i, resultSetsArray){
	        	populateNextStepsAndDiscoverMorePromosJSONData(resultSetsArray);
	        });
	        //hideEmptyPromos();
	        tagsStringForDMTags = tagsStringForDMTags.replace(/\|/g, "\" \"");
	        tagsStringForDMTags = "\""+tagsStringForDMTags+"\"";
	        tagsStringForDMTags += contentPageCuratedPromosTags;
	        tagsStringForDMTags = escape(tagsStringForDMTags);
	        discoverMoreTagsJsonURL += memberFirmSNPURL;
	        discoverMoreTagsJsonURL += "?do=disc-tag";
	        discoverMoreTagsJsonURL += "&sp_x_1=sc-pagename&sp_q_1="+moreTopicTagsURLHashValue+"&sp_q_required_1=-1&callback=?";
	        discoverMoreTagsJsonURL += "&q="+tagsStringForDMTags;
	        if(resultCount > 0 || curatedPromosCount > 0) {
		        $.getJSON(discoverMoreTagsJsonURL, function(result){
		            $.each(result, function(i, resultSetsArray){
		            	populateDiscoverMoreSimilarTrendsTagsData(resultSetsArray);
		            });
		        });
	        }
	      
	        
	    });
	}else{
		if(curatedPromosCount > 0) {
			tagsStringForDMTags += contentPageCuratedPromosTags;
	        tagsStringForDMTags = escape(tagsStringForDMTags);
	        discoverMoreTagsJsonURL += memberFirmSNPURL;
	        discoverMoreTagsJsonURL += "?do=disc-tag";
	        discoverMoreTagsJsonURL += "&sp_x_1=sc-pagename&sp_q_1="+moreTopicTagsURLHashValue+"&sp_q_required_1=-1&callback=?";
	        discoverMoreTagsJsonURL += "&q="+tagsStringForDMTags;
	        $.getJSON(discoverMoreTagsJsonURL,function(result){
	            $.each(result, function(i, resultSetsArray){
	            	populateDiscoverMoreSimilarTrendsTagsData(resultSetsArray);
	            });
	        });
        }
	}
	//For recalculating the window size after populating the divs dynamically from CCD
    $(window).resize();
 // To fix the images loading problem for CCD Content.
    setAllImgsRendition();
});

function  populateNextStepsAndDiscoverMorePromosJSONData(resultSetsArray) {
	
	var featuredPromosCount = 0;
	var standardPromosCount = 0;
	
    $.each(resultSetsArray, function(arrayIndex, arrayObjects){
        $.each(arrayObjects, function(objectType, dataObjArray){
            if(objectType == 'career' && articlepage_careersComponentArray.length > 0 ) {
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
	            	var pageTypeVal = careersObjArray['page-type'];
	            	var pageViewsVal = careersObjArray['page-views'];	            	
	            	if(careersObjArray['tags'] != undefined)
	            		tagsStringForDMTags += careersObjArray['tags']+"|";
	            	
	            	if(articlepage_careersComponentArray.length > arrayIndex){
	            		$("#"+articlepage_careersComponentArray[arrayIndex]+" .promo-label").html(contentTypeVal);
                        $("#"+articlepage_careersComponentArray[arrayIndex]+" .tertiary-headline").attr('href', urlVal).html(heading1Val).attr('cq-id',careersObjArray['cq-id']);;
                        $("#"+articlepage_careersComponentArray[arrayIndex]+" .page-description-for-promo").attr('href', urlVal).html(descriptionVal).attr('cq-id',careersObjArray['cq-id']);;
                        //$("#"+nextsteps_globalCareersComponentArray[arrayIndex]+" .article-image img").attr('alt', imageVal).attr('src', imageVal);
                        
                        if(nextSteps_promoComponentString == '')
    	            		nextSteps_promoComponentString = careersObjArray['cq-id'];
    	            	else
    	            		nextSteps_promoComponentString += "," + careersObjArray['cq-id'];
	            	}
                    	
            	});
            	/*if(articlepage_careersComponentArray.length > dataObjArray.length){
            		for(var i=dataObjArray.length; i<articlepage_careersComponentArray.length; i++) {
            			$("#"+articlepage_careersComponentArray[i]).hide();
            		}
            	}*/
            	hideEmptyPromosContentPage(articlepage_careersComponentArray, dataObjArray);
            }
            else if(objectType == 'profiles' && articlepage_employeeComponentArray.length > 0) {
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
	            	var imageVal = employeesObjArray['image'];
	            	if(employeesObjArray['tags'] != undefined)
	            		tagsStringForDMTags += employeesObjArray['tags']+"|";
	            	
	            	
	            	
	            	if(articlepage_employeeComponentArray.length > arrayIndex){
	            		$("#"+articlepage_employeeComponentArray[arrayIndex]+" .promo-label").html(contentTypeVal);
                        $("#"+articlepage_employeeComponentArray[arrayIndex]+" .tertiary-headline").attr('href', urlVal).html(profileGivenNameVal).attr('cq-id',employeesObjArray['cq-id']);
                        $("#"+articlepage_employeeComponentArray[arrayIndex]+" .employee-image img").attr('alt', imageVal).attr('orgsrc', imageVal);
                        $("#"+articlepage_employeeComponentArray[arrayIndex]+" a").attr('href', urlVal);
                        $("#"+articlepage_employeeComponentArray[arrayIndex]+" .employee-title p").html(employeeTitleVal);
                        
                        if(nextSteps_promoComponentString == '')
    	            		nextSteps_promoComponentString = employeesObjArray['cq-id'];
    	            	else
    	            		nextSteps_promoComponentString += "," + employeesObjArray['cq-id'];
	            	}
                    	
            	});
            	/*if(articlepage_employeeComponentArray.length > dataObjArray.length){
            		for(var i=dataObjArray.length; i<articlepage_employeeComponentArray.length; i++) {
            			$("#"+articlepage_employeeComponentArray[i]).hide();
            		}
            	}*/
            	hideEmptyPromosContentPage(articlepage_employeeComponentArray, dataObjArray);
            }
            else if(objectType == 'events' && articlepage_eventComponentArray.length > 0) {
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
	            	if(eventsObjArray['tags'] != undefined)
	            		tagsStringForDMTags += eventsObjArray['tags']+"|";
	            	
	            	
	            	
	            	if(articlepage_eventComponentArray.length > arrayIndex){
	            		$("#"+articlepage_eventComponentArray[arrayIndex]+" .promo-label").html(contentTypeVal);
                        $("#"+articlepage_eventComponentArray[arrayIndex]+" .tertiary-headline").attr('href', urlVal).html(heading1Val).attr('cq-id',eventsObjArray['cq-id']);
                        $("#"+articlepage_eventComponentArray[arrayIndex]+" .page-description-for-promo").attr('href', urlVal).html(descriptionVal).attr('cq-id',eventsObjArray['cq-id']);
                        //$("#"+articlepage_eventComponentArray[arrayIndex]+" .article-image img").attr('alt', imageVal).attr('src', imageVal);
                        
                        if(nextSteps_promoComponentString == '')
    	            		nextSteps_promoComponentString = eventsObjArray['cq-id'];
    	            	else
    	            		nextSteps_promoComponentString += "," + eventsObjArray['cq-id'];
	            	}
            	});
            	/*if(articlepage_eventComponentArray.length > dataObjArray.length){
            		for(var i=dataObjArray.length; i<articlepage_eventComponentArray.length; i++) {
            			$("#"+articlepage_eventComponentArray[i]).hide();
            		}
            	}*/
            	hideEmptyPromosContentPage(articlepage_eventComponentArray, dataObjArray);
            }
            else if(objectType == 'solutions' && articlepage_solutionsComponentArray.length > 0) {
            	$.each(dataObjArray, function(arrayIndex, solutionsObjArray){
	            	var indexVal = solutionsObjArray['index'];
	            	var urlVal = solutionsObjArray['url'];
	            	var heading1Val = solutionsObjArray['heading1'];
	            	var heading2Val = solutionsObjArray['heading2'];
	            	var descriptionVal = solutionsObjArray['description'];
	            	var contentTypeVal = solutionsObjArray['content-type'];
	            	var addressVal = solutionsObjArray['address'];
	            	var cityVal = solutionsObjArray['city'];
	            	var eventDateVal = solutionsObjArray['event-date'];
	            	if(solutionsObjArray['tags'] != undefined)
	            		tagsStringForDMTags += solutionsObjArray['tags']+"|";
	            	
	            	
	            	if(articlepage_solutionsComponentArray.length > arrayIndex){
	            		$("#"+articlepage_solutionsComponentArray[arrayIndex]+" .promo-label").html(contentTypeVal);
                        $("#"+articlepage_solutionsComponentArray[arrayIndex]+" .tertiary-headline").attr('href', urlVal).html(heading1Val).attr('cq-id',solutionsObjArray['cq-id']);
                        $("#"+articlepage_solutionsComponentArray[arrayIndex]+" .page-description-for-promo").attr('href', urlVal).html(descriptionVal).attr('cq-id',solutionsObjArray['cq-id']);
                        //$("#"+articlepage_eventComponentArray[arrayIndex]+" .article-image img").attr('alt', imageVal).attr('src', imageVal);
                        
                        if(nextSteps_promoComponentString == '')
    	            		nextSteps_promoComponentString = solutionsObjArray['cq-id'];
    	            	else
    	            		nextSteps_promoComponentString += "," + solutionsObjArray['cq-id'];
	            	}
            	});
            	/*if(articlepage_solutionsComponentArray.length > dataObjArray.length){
            		for(var i=dataObjArray.length; i<articlepage_solutionsComponentArray.length; i++) {
            			$("#"+articlepage_solutionsComponentArray[i]).hide();
            		}
            	}*/
            	hideEmptyPromosContentPage(articlepage_solutionsComponentArray, dataObjArray);
            }
            else if(objectType == 'featured') {
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
        	        
        	        if(featuredObjArray['description'] == undefined)
        	        	descriptionVal = heading2Val;
	            	
        	        if(featuredObjArray['tags'] != undefined)
	            		tagsStringForDMTags += featuredObjArray['tags']+"|";
        	        
        	        
        	        
        	        if(featured_standard_type == '1' && featuredPromosCount < articlepage_featuredComponentArray.length){// value 1 means featured type
        	        	if(articlepage_featuredComponentArray.length > 0 && (featuredPromosCount < articlepage_featuredComponentArray.length)) {
        	        		$("#"+articlepage_featuredComponentArray[featuredPromosCount]+" .promo-label").html(contentTypeVal);
        	                $("#"+articlepage_featuredComponentArray[featuredPromosCount]+" a").attr('href', urlVal).attr('cq-id',dataObjArray['cq-id']);
							$("#"+articlepage_featuredComponentArray[featuredPromosCount]+" .secondary-headline.white-title").html(heading1Val);
							$("#"+articlepage_featuredComponentArray[featuredPromosCount]+" .secondary-headline.green-title").html(heading2Val);
        	                $("#"+articlepage_featuredComponentArray[featuredPromosCount]+" .article-image img").attr('alt', imageVal).attr('orgsrc', imageVal);
        	                featuredPromosCount++;
        	                
        	                if (featuredObjArray['cq-id'] != undefined) {
        	        	        if(discoverMore_promoComponentString == '')
        	        	        	
        	        	        	discoverMore_promoComponentString = featuredObjArray['cq-id'];
        		            	else
        		            		discoverMore_promoComponentString += "," + featuredObjArray['cq-id'];
                	        }
        	            }
        	        }
        	        else if(featured_standard_type != '1' || featuredPromosCount >= articlepage_featuredComponentArray.length){
        	        	if(articlepage_standardComponentArray.length > 0 && (standardPromosCount < articlepage_standardComponentArray.length)) {
        	                $("#"+articlepage_standardComponentArray[standardPromosCount]+" .promo-label").html(contentTypeVal);
        	                $("#"+articlepage_standardComponentArray[standardPromosCount]+" .tertiary-headline").attr('href', urlVal).html(heading1Val).attr('cq-id',featuredObjArray['cq-id']);
        	                $("#"+articlepage_standardComponentArray[standardPromosCount]+" .page-description-for-promo").attr('href', urlVal).html(descriptionVal).attr('cq-id',featuredObjArray['cq-id']);
        	                //$("#"+articlepage_standardComponentArray[standardPromosCount]+" .article-image img").attr('alt', imageVal).attr('src', imageVal);
        	                standardPromosCount++;
        	                
        	                if (featuredObjArray['cq-id'] != undefined) {
        	        	        if(discoverMore_promoComponentString == '')
        	        	        	
        	        	        	discoverMore_promoComponentString = featuredObjArray['cq-id'];
        		            	else
        		            		discoverMore_promoComponentString += "," + featuredObjArray['cq-id'];
                	        }
        	            }
        	        }
                    	
            	});
            	hideEmptyFeaturedStandardPromos();
            }
            /*else if(objectType == 'tags') {
            	$.each(dataObjArray, function(arrayIndex, tagsObjArray){
                	var indexVal = tagsObjArray['index'];
                	var urlVal = tagsObjArray['url'];
                	var tagVal = tagsObjArray['tag'];
                	tagValuesArray.push(tagsObjArray['cq-name']);
                	var dynamicString = "<li><a class='small-body-copy' href='"+urlVal+"' onclick='javascript:return trackTags(\"" + tagsObjArray['cq-name'] + "\");'>"+tagVal+"</a></li>";
                	$("div.similar-trends ul.article-tags").append(dynamicString);
            	});
            	$("div.similar-trends ul.article-tags").append("<li class='for-clear'></li>");
            }*/
        });
    });
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
function  populateDiscoverMoreSimilarTrendsTagsData(resultSetsArray) {
    $.each(resultSetsArray, function(arrayIndex, arrayObjects){
        $.each(arrayObjects, function(objectType, dataObjArray){
        	$.each(dataObjArray, function(arrayIndex, tagsObjArray){
            	var indexVal = tagsObjArray['index'];
            	var urlVal = tagsObjArray['url'];
            	var tagVal = tagsObjArray['tag'];
            	tagValuesArray.push(tagsObjArray['cq-name']);
            	var dynamicString = "<li><a class='body-copy' href='"+urlVal+"' onclick='javascript:return trackTags(\"" + tagsObjArray['cq-name'] + "\");'>"+tagVal+"</a></li>";
            	$("div.similar-trends ul.article-tags").append(dynamicString);
        	});
        	$("div.similar-trends ul.article-tags").append("<li class='for-clear'></li>");
        });
    });
}
function hideEmptyPromosContentPage(promosArray, dataArray){
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
    for(var i=0; i < articlepage_featuredComponentArray.length; i++){
    	if($("#"+articlepage_featuredComponentArray[i]+" .promo-label").html() == '' && wcmMode == 'DISABLED'){
    		$("#"+articlepage_featuredComponentArray[i]).hide();
    	}else if($("#"+articlepage_featuredComponentArray[i]+" .promo-label").html() == '' && wcmMode != 'DISABLED'){
    		$("#"+articlepage_featuredComponentArray[i]+" .promo-label").html(emptyPromoMessage);
    	}
    }
    for(var i=0; i < articlepage_standardComponentArray.length; i++){
    	if($("#"+articlepage_standardComponentArray[i]+" .promo-label").html() == '' && wcmMode == 'DISABLED'){
    		$("#"+articlepage_standardComponentArray[i]).hide();
    	}else if($("#"+articlepage_standardComponentArray[i]+" .promo-label").html() == '' && wcmMode != 'DISABLED'){
    		$("#"+articlepage_standardComponentArray[i]+" .promo-label").html(emptyPromoMessage);
    	}
    }
}