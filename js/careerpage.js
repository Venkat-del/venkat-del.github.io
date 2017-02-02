$(document).ready(function(){
	console.log("_________________Career Page ready handled_____________");
});
/*CQ javascript not reqd on mock-ups 
$CQ(document).on("searchLoaded", function (evt) {
	//Update the pageName variable to reflect the TMP page name:
	sc_currentPageName = getContentPath();
	$CQ(document).trigger("customevent");
	console.log("Sitecat: TMT Search Page Loaded event handled");
});


$CQ(document).on("searchResultsLoaded", function (evt) {
	
	//Update the pageName variable to reflect the TMP page name:
	sc_currentPageName = getContentPath();
	//Set the record attribute to the empty span placed at the Template Level.
	var payLoad = "'event33' , " +  jobParams(); //Event
	$CQ("#career_search").attr("record", payLoad);
	$CQ(document).trigger("customevent");
	
	console.log("Sitecat: TMT Search Results Loaded event handled");
	
});


$CQ(document).on("changeSearchResultsLoaded", function (evt) {
	
	//Update the pageName variable to reflect the TMP page name:
	sc_currentPageName = getContentPath();
	//Set the record attribute to the empty span placed at the Template Level.
	var payLoad = "'event33' , " +  jobParams(); //Event
	$CQ("#career_search").attr("record", payLoad);
	$CQ("#career_searchResults_csl ").attr("record", "'event34', {}");
	$CQ(document).trigger("customevent");
	
	console.log("Sitecat: TMT Change Search Results Loaded event handled");
	
});




$CQ(document).on("jobDescriptionLoaded", function (evt) {
	//Fetching Job Name form title and replacing all spaces with '_'
	var sc_jobName = document.title.replace(/ /g,'_');
	$CQ("#career_jobName").attr("record", "'pageView', {'jobName' : '"+sc_jobName+"'}");
	$CQ(document).trigger("customevent");
	
	console.log("Sitecat: TMT Job Desc Search Loaded event handled");
});



$CQ(document).on("applyButtonClicked", function (evt) {
	//Update the pageName variable to reflect the TMP page name:
	sc_currentPageName = getContentPath();
	var events = new Array();
	events[0] = "event24";
	var data = new Object();
	data['pageName'] = sc_currentPageName + '_ Apply_Click';
	data['prop75'] = sc_currentPageName + '_ Apply_Click';
	recordSitecatEvent(events, data, "Apply_Click");
	
	console.log("Sitecat: TMT Apply Button Clicked event handled");
});

function getContentPath(){
	//fetches path name
    var pathName = location.pathname;
    var contentPath = pathName;
    //check if .html or .htm extension exists
    if(pathName.lastIndexOf('.htm') > 0){
    //removes extension e.g., .htm or .html
	contentPath = pathName.substr(0, pathName.lastIndexOf('.htm'));
	}
    return contentPath;
}

function jobParams(){

	//Define the data needs to be passed to SiteCatalyst
	var dataArray = new Array();
	var siteCatParams = "";
	var location = decodeURIComponent(document.location.href);
	var locArray = null; 
	var countryString = "c";
	var regionString = "r";
	var metroAreaString = "m";
	var audience = "a";
	var functionStr = "f";
	var serviceArea="sa";
	var jobType = "j";
	var resultsPerPage = "n";
	var pageNumber="p";
	var keyWords="k";
	var sort="s";

	if(location!=null){
		locArray = location.split('/');

		if(locArray!=null){

			for(var i=0; i<locArray.length;i++){

				if(locArray[i] == audience && (i+1)<locArray.length && locArray[i+1]!=null ){
					dataArray.push("'jobAudience':'" +locArray[i+1].replace(/\-/g,'_')+"'");

				}else if(locArray[i] == keyWords && (i+1)<locArray.length && locArray[i+1]!=null ){
					var keywordString = locArray[i+1].replace(/\+/g,'_').toLowerCase();
					dataArray.push("'jobSearchKeyword':'" +keywordString+"'");

				}else if(locArray[i] == jobType && (i+1)<locArray.length && locArray[i+1]!=null ){
					dataArray.push("'jobType':'" +locArray[i+1].replace(/\-/g,'_')+"'");

				}else if(locArray[i] == countryString && (i+1)<locArray.length && locArray[i+1]!=null ){
					dataArray.push("'jobCountry':'" +locArray[i+1].replace(/\-/g,'_')+"'");

				}else if(locArray[i] == regionString && (i+1)<locArray.length && locArray[i+1]!=null ){
					dataArray.push("'jobRegion':'" +locArray[i+1].replace(/\-/g,'_')+"'");

				}

			}
		}

	}

	siteCatParams = "{" + dataArray.toString() + "}";

	return siteCatParams;

}
*/
$(".back-to-top a").click(function(e){
		 e.preventDefault();
		 $("#searchform .yui-ac-input").focus();
		 // $('html, body').stop().animate({scrollTop: 0}, 500, 'swing');
		
		
});