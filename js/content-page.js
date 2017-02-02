var headerHeight;
var windowWidth = window.innerWidth;
var windowHeight;
// Transition time for the left and right pages
var time = 500;
var scrollEndNSFlag = false;
var scrollEndDMFlag = false;
var isScrolledOnce = false; 
var isScrolledTillEnd = false;
var cookieRendered = true;

// Widths of the left and right pages, and the margin needed for the right page
var leftWidth,rightWidth,rightMargin;
var rightDotBottom, rightDotModBottom,rightBoxModBottom,footerPos,leftDotModTop,leftBoxModTop;
var leftClicked = false;
var rightClicked = false;
var returnAria= $('.return-statement .heading a span').html();
var discover= $(".main-container.content-page .green-dot-animation.left a.dot").attr('aria-labelledby');
var next= $(".main-container.content-page .green-dot-animation.right a.dot").attr('aria-labelledby');
// Declare all of the DOM objects here	
var mainContainer = $(".main-container.content-page .content.main");
var leftContainer = $(".main-container.content-page .content.left");
var rightContainer = $(".main-container.content-page .content.right");
var leftDot = $(".main-container.content-page .green-dot-animation.left");
var rightDot = $(".main-container.content-page .green-dot-animation.right");
var leftDotLink = $(".main-container.content-page .green-dot-animation.left a.dot");
var rightDotLink = $(".main-container.content-page .green-dot-animation.right a.dot");
var leftBox = $(".main-container.content-page .box-link.left");
var rightBox = $(".main-container.content-page .box-link.right");
var returnFromLeft = $(".main-container .left .return-statement a");
var returnFromRight = $(".main-container .right .return-statement a");
var inPresent= $(".inline-nav-container .inline-nav-content-page");

// Calculate the percentage of the main container's left and right margins
var mainContainerMarginPercentDesktop = 0.06;
var mainContainerMarginPercentMobile = 0.02;

// Main container variables
var mainContainerWidth;
var mainContainerLeftMargin;
var mainContainerRightMargin;

// Green dot position variables
var leftDotLeft;
var rightDotRight;

// Link box position variables
var leftBoxTop;
var rightBoxBottom;
var additionalLeft = 0;
var additionalRight = 0;
var isDMReported = false;
var isNSReported = false;

var ns_promoList = "";
var dm_promoList = "";
var tagslist = "";
var greenDotTop,leftContainerTop;
var cookieHeight = $(".cookie-container").outerHeight(true);

function cookieHeightRemoved(){
    if (leftDotLink.hasClass("selected")) {
    	leftContainerTop = leftContainerTop - cookieHeight;
    	leftContainer.css('top',leftContainerTop);
    	leftBoxTop = leftBoxTop - cookieHeight;
    	greenDotTop = greenDotTop - cookieHeight;
    	leftBox.css('top',leftBoxTop+'px');
		leftDot.css('top',greenDotTop+'px');
		positionLeftOnResize();
    } else if (rightDotLink.hasClass("selected")) {
    	leftContainerTop = leftContainerTop - cookieHeight;
    	leftContainer.css('top',leftContainerTop);
		leftBoxTop = leftBoxTop - cookieHeight;
    	greenDotTop = greenDotTop - cookieHeight;
		leftBox.css('top',leftBoxTop);
		leftDot.css('top',greenDotTop);
    	
       positionRightOnResize();
    } else {
		 positionDot("left");
        positionDot("right");
    }
}/*
Calculate all the metrics needed for the transitions, and when the window resizes
*/
function calculateAllMetrics () {
	headerHeight = $("#header").outerHeight();
	windowWidth = window.innerWidth;
	if (windowWidth > 1200) {
		windowWidth = 1200;
	}
	windowHeight = window.innerHeight;
	mainContainerWidth = mainContainer.outerWidth();
	if (matchMedia('(min-width: 768px)').matches) {
		mainContainerLeftMargin = mainContainerMarginPercentDesktop * windowWidth;
		mainContainerRightMargin = mainContainerMarginPercentDesktop * windowWidth;
	} else {
		mainContainerLeftMargin = mainContainerMarginPercentMobile * windowWidth;
		mainContainerRightMargin = mainContainerMarginPercentMobile * windowWidth;
	}
}

/*
Calculate the left position of the left green dot
*/
function calculateLeftDotLeft () {
	if (matchMedia('(min-width: 768px)').matches) {
		var width = leftBox.outerWidth(true);
		var boxRightMargin = leftBox.css("margin-right");
		var dotWidth = leftDotLink.outerWidth();
		if (boxRightMargin.indexOf("%") > 0) {
			boxRightMargin = (parseInt(boxRightMargin)/100)*windowWidth;
		} else {
			boxRightMargin = parseInt(boxRightMargin);
		}
		leftDotLeft = width - boxRightMargin - (dotWidth/3);
		if (matchMedia('(min-width: 1201px)').matches) {
			additionalLeft = ($(window).width() - mainContainer.outerWidth())/2 - leftBox.outerWidth(true);
			leftDotLeft += additionalLeft;
		} else {
			additionalLeft = 0;
		}
	} else {
		leftDotLeft = 0;
	}
}

/*
Calculate the right position of the right green dot
*/
function calculateRightDotRight () {
	var dotWidth = rightDotLink.outerWidth();
   	if (matchMedia('(min-width: 768px)').matches) {
	    var width = rightBox.outerWidth(true);
	    var removeExtraRight = 4;
	    if ($.browser.msie) removeExtraRight = 7;
		rightDotRight = width + dotWidth/3 - removeExtraRight;
		if (matchMedia('(min-width: 1201px)').matches) {
			additionalRight = ($(window).width() - mainContainer.outerWidth())/2 - rightBox.outerWidth(true);
			rightDotRight += additionalRight;
		} else {
			additionalRight = 0;
		}
	} else {
		rightDotRight = dotWidth;
	}
}

/*
Calculate the top position of the left link box
*/
function calculateLeftBoxTop () {
	var toggleShowHide = false;
	if (leftContainer.css("display") == "none") {
		toggleShowHide = true;
		leftContainer.show();
	}
	 var extraHeight = $('.headerintro').outerHeight(true) - $('.headerintro .header-intro').outerHeight(true);
	leftBoxTop = headerHeight + leftContainer.children("div.return-statement").outerHeight(true) + leftContainer.children("div.green-dots-container").outerHeight(true)/2 - leftBox.outerHeight(true)/2;
	//leftBoxTop = leftBoxTop + extraHeight;
	
	if (toggleShowHide) {
		leftContainer.hide();
	}
}

/*
Calculate the top position of the left link box
*/
function calculateRightBoxBottom () {
	var toggleShowHide = false;
	if (rightContainer.css("display") == "none") {
		toggleShowHide = true;
		rightContainer.show();
	}
	rightBoxBottom = rightContainer.children("div.return-statement").outerHeight(true) + rightContainer.children("div.green-dots-container").outerHeight(true) / 2 - rightBox.outerHeight(true) / 2;
	if (toggleShowHide) {
		rightContainer.hide();
	}
}
function fixDiscoverBottom(){
	footerPos=$('#footer-section').offset().top;
	windowHeight=$(window).height();
	var scrollTop=$(window).scrollTop();
	var scrollBottom=scrollTop+windowHeight;
	if(cookieRendered){
		leftDotModTop=greenDotTop+scrollBottom-footerPos+306-cookieHeight;
        leftBoxModTop=leftBoxTop+scrollBottom-footerPos+262-cookieHeight;
	}else{
		leftDotModTop=greenDotTop+scrollBottom-footerPos+356;
        leftBoxModTop=leftBoxTop+scrollBottom-footerPos+312;
	}
	if((scrollBottom>=footerPos)&&(!(leftDotLink.hasClass('selected')))){
		var langsel = $(".languageselector").outerHeight(true);
        var computedvalgreenDotTop = greenDotTop+langsel;
        var computedvalleftBoxTop  = leftBoxTop+langsel;
	        if(cookieRendered){
	            leftDot.css('top',computedvalgreenDotTop  +'px').css('bottom','');
	            leftBox.css('top',computedvalleftBoxTop +'px').css('bottom','');
	        }
	        else{  
	            leftDot.css('top',computedvalgreenDotTop - 50+ 'px').css('bottom','');
	            leftBox.css('top',computedvalleftBoxTop - 50 +'px').css('bottom','');
	        }
	}else{
		leftDot.css('top',greenDotTop+'px').css('bottom','');
		leftBox.css('top',leftBoxTop+'px').css('bottom','');
		} 
	
}
/*De1226 Fix for the defect */
function fixNextStepsBottom(){
	footerPos=$('#footer-section').offset().top;
	windowHeight=$(window).height();
	var scrollTop=$(window).scrollTop();
	var scrollBottom=scrollTop+windowHeight;
	if((scrollBottom>=footerPos)&&(!(rightDotLink.hasClass('selected')))){
		rightDotModBottom=rightDotBottom+scrollBottom-footerPos+10;
		rightBoxModBottom=rightBoxBottom+scrollBottom-footerPos+10;
		rightDot.css('bottom',rightDotModBottom+'px');
		rightBox.css('bottom',rightBoxModBottom+'px');
	}
	else{
		rightDot.css('bottom',rightDotBottom+'px');
		rightBox.css('bottom',rightBoxBottom+'px');
	} 
}
/*
Position the dot relative to the main container when the page loads or the window is resized
*/
function positionDot (selector) {
	var height;
	var dotHeight;
    	var cookieLeftBoxTop,cookieGreenDotTop;
	if (selector == "left") {
		
	    dotHeight = leftDotLink.outerHeight();
	    height = leftBox.outerHeight(true);
	    calculateLeftDotLeft();
    	    calculateLeftBoxTop();
	    greenDotTop = leftBoxTop + height/2 - dotHeight/2;
	    //alert(greenDotTop);
	    leftContainerTop = headerHeight;		
	    cookieLeftBoxTop = leftBoxTop;
	    cookieGreenDotTop = greenDotTop;
		var dotTimer;
		if (matchMedia('(max-width: 767px)').matches) {
			dotTimer = 1000;
		}else{
			dotTimer = 500;
		}
		setTimeout(function () {
			
	    	if (cookieRendered) {
				//alert(cookieRendered);
		    		greenDotTop = cookieGreenDotTop + cookieHeight;
			        leftBoxTop = cookieLeftBoxTop + cookieHeight;
                    leftContainerTop = headerHeight + cookieHeight;
                    
			}
	    	
			leftContainer.css("top",leftContainerTop);
			leftBox.css({
				"top": leftBoxTop,
				"left": additionalLeft
			});
			leftDot.css("top",greenDotTop);
            leftBox.fadeIn(function() {
				leftDot.css("left", leftDotLeft);
				leftDot.fadeIn(300);
				if (leftContainer.css('display') == "none")
					leftBox.css("visibility", "visible")
			});
		}, dotTimer);
		
/*DE1718 Start Added by Aslam  for setting Discover more box when Cookie is Enabled*/
		setTimeout(function () {
				if (cookieRendered == true ) {			        
			        var combineleftcontheight = leftBoxTop + cookieHeight;
			      	leftBox.css("top",combineleftcontheight);
				}
								
		}, 1500);
/*DE1718 End Added by Aslam  for setting Discover more box when Cookie is Enabled*/

	} else if (selector == "right") {
	    dotHeight = rightDotLink.outerHeight();
	    height = rightBox.outerHeight(true);
		calculateRightDotRight();
		calculateRightBoxBottom();
		rightDotBottom= rightBoxBottom + (height / 2) + (dotHeight / 2);
		rightBox.css({
		    "bottom": rightBoxBottom,
			"right": additionalRight
		});
		rightBox.fadeIn(500, function() {
		    rightDot.css("bottom",rightDotBottom );
		    rightDot.css("right", rightDotRight);
		    rightDot.fadeIn(300);
		    if (rightContainer.css('display') == "none"){
		        rightBox.css("visibility", "visible");
				fixNextStepsBottom();
			}
		});
	}
}

/*
Position the left and right pages when the page loads or when the window is resized
*/
function positionPageContent () {
	leftWidth = leftContainer.outerWidth();
	leftContainer.animate({marginLeft: 0-leftWidth}, 0);
	//alignRightContent();
	rightWidth = rightContainer.outerWidth();
	rightMargin = $(".main-container.content-page").outerWidth();
	rightContainer.animate({marginLeft: rightMargin}, 0);
}

/*
Position the main content's margins when the window is resized
*/
function positionMargins () {
	mainContainer.css("margin-left", mainContainerLeftMargin);
	mainContainer.css("margin-right", mainContainerRightMargin);
}

/*
Set the height of the left content container
*/
function setLeftContentHeight () {
	var remainingHeight = windowHeight - headerHeight;
	var returnLeft = leftContainer.children("div.return-statement").outerHeight(true);
	remainingHeight -= leftContainer.children("div.return-statement").outerHeight(true) + leftContainer.children("div.green-dots-container").outerHeight(true);
        var cookieAddHeight = remainingHeight;
	if (cookieRendered) {
		   remainingHeight = cookieAddHeight - cookieHeight;		      	
	}
	leftContainer.children("div.left-content").css("height", remainingHeight);
    leftContainer.css("padding-top",returnLeft);
}
/*
Set the height of the right content container
*/
function setRightContentHeight () {
	var remainingHeight = windowHeight - headerHeight;
	remainingHeight -= rightContainer.children("div.return-statement").outerHeight(true) + rightContainer.children("div.green-dots-container").outerHeight(true);

	var height = 0;
	var left = 0;
	$(".right-content .content-promo-column", rightContainer).each(function() {


		if ($(this).outerHeight(true) > height) {
			height = $(this).outerHeight(true);
		}

        /*Server side script for Next Steps Promos in CQ Environment
		 Now even if promo-label is not there it will work, .box class is there in all the promos */

		/*if (isEditMode == true || isDesignMode == true || $(this).find(".box").length > 0 ){

            $(this).css("left", left + "%");
		    left += 25;

        } else {*/

            /* Added to fix DE181045. Observed isEditMode,isDesignMode is of type string so the above condition fails.*/
           /* if(typeof isEditMode === 'string' || typeof isDesignMode === 'string') {
    
                if (isEditMode === 'true' || isDesignMode === 'true' || $(this).find(".box").length > 0 ){
                    $(this).css("left", left + "%");
                    left += 25;
                }
             } 
        }*/


	});
	if (remainingHeight > height) {
		height = remainingHeight;
	}
    	var cookieAddHeight = height;
    	var cookieAddPadding =0;
	if (cookieRendered) {
		   height = cookieAddHeight - cookieHeight;		      	
		   cookieAddPadding = cookieHeight*2;
	}
        rightContainer.children("div.right-content").css({"height": remainingHeight});
	rightContainer.children("div.right-content").children("div.alignment-container").css({"height": height,"padding-top": cookieAddPadding});

	//rightContainer.children("div.right-content").children("div.alignment-container").css("height", height);
}


/*
Disable the default arrow keys/spacebar scroll
*/
var disableArrowKeys = function (e) {
    var tagName = document.activeElement.tagName.toLowerCase();
    if (tagName == "textarea" || tagName == "input")
        return;

	switch(e.keyCode){
		case 37: case 39: case 38:  case 40: // Arrow keys
		case 32: e.preventDefault(); break; // Space
		default: break; // do not block other keys
	}
};

/*
Hide the footer when the left or right page is open, and show it when the main content is re-shown
*/
function TestScrollup(e)
{
    alert('down')
    $("#divLog").html(e.target.getAttribute("class") + "<br/>" + $("#divLog").scrollTop() + "<br/>" + $("#divLog").html());
    var element = null;
    if ($(".main-container .right").css('display') == "block")
        element = $(".main-container .right-content")
    else
        element = $(".main-container .left-content")

    var scrollHeight = element[0].scrollHeight;
    var scrollTop = element.scrollTop()
    if (element.scrollTop()==0)
        e.preventDefault();
    $("#divLog").html(" scrollHeight: " + scrollHeight + " scrollTop" + scrollTop + $(".main-container .right-content").outerHeight() + " Sub: " + (scrollHeight - scrollTop) + "<br/>" + $("#divLog").html());

}
function TestScrolldown(e) {
    alert('up')
    $("#divLog").html(e.target.getAttribute("class") + "<br/>" + $("#divLog").scrollTop() + "<br/>" + $("#divLog").html());
    var element = null;
    if ($(".main-container .right").css('display') == "block")
        element = $(".main-container .right-content")
    else
        element = $(".main-container .left-content")

    var scrollHeight = element[0].scrollHeight;
    var scrollTop = element.scrollTop()
    if (element[0].scrollHeight - element.scrollTop() <= element.outerHeight())
        e.preventDefault();
    $("#divLog").html(" scrollHeight: " + scrollHeight + " scrollTop" + scrollTop + $(".main-container .right-content").outerHeight() + " Sub: " + (scrollHeight - scrollTop) + "<br/>" + $("#divLog").html());

}
var oldTouch = 0; // use in touchstart and move event of document. DE152

function toggleScroll (action) {
	if (action == "hide") {
		$("#footer-section").hide();
		$(".main-container.content-page").css({
			marginBottom: "0"
		});
		$("body").css("overflow", "hidden");
		window.addEventListener("keydown", disableArrowKeys, false);
		$(document).on("touchstart", function (e) {
		    oldTouch = e.originalEvent.touches[0].pageY;//Added for Ipad4  which is check in "touchmove" event
		});
		$(document).on("touchmove", function (e) {
		    /*
            Reson to Add: in ipad4 in horizontal view when user scroll on right or left container div, Main Content div also get scroll at end point of right/left content page scroll. 
            When right or left content div is open then main content div should not get scroll.
            */
		    var targetElement = $(e.target)
		    if (targetElement.parents('.right').length == 0 && targetElement.parents('.left').length == 0) {//ancestors 
		        e.preventDefault();
		        return;
		    }
		    if (targetElement.getAttribute("class") == "return-statement")//.parents(".return-statement")[0])
		    {
		        e.preventDefault();
		        return;
		    }
		    var element = null;
		    if ($(".main-container .content.right").css('display') == "block")
		        element = $(".main-container .right-content")
		    else
		        element = $(".main-container .left-content")
		   
		    if (oldTouch - e.originalEvent.touches[0].pageY > 0) {
		        var scrollheight = element[0].scrollHeight;
		        var scrolltop = element.scrollTop();
		        if ((scrollheight - scrolltop) <= element.outerHeight()) {
		            e.preventDefault();
		        }
		    }
		    else {
		        if (oldTouch - e.originalEvent.touches[0].pageY < 0 && element.scrollTop() == 0)
		            e.preventDefault();
		    }
		    oldTouch = e.originalEvent.touches[0].pageY
		});
		
	} else if (action == "show") {
	    $(document).unbind('touchmove');
	    $(document).unbind('touchstart');
		$("#footer-section").show();
		$(".main-container.content-page").css({
			height: "auto",
			marginBottom: "2%"
		});
		$("body").css("overflow", "auto");
		window.removeEventListener("keydown", disableArrowKeys, false);
	}
}

/*
Position the Left dot on screen resize
*/
function positionLeftOnResize () {
	calculateLeftBoxTop();
	calculateLeftDotLeft();
	calculateRightDotRight();
	setLeftContentHeight();
	leftWidth = leftContainer.outerWidth();
	mainContainer.css("margin-left", leftWidth);
	var leftDotTop;
	leftContainerTop = headerHeight;
	setTimeout(function () {
				if (cookieRendered) {
					leftContainerTop = headerHeight + cookieHeight;
				}
				leftContainer.css("top",leftContainerTop);
				leftDotTop=$(".left .green-dots-container").offset().top-18;
				leftBox.css("top", leftBoxTop);
				leftDot.css("top",leftDotTop);
	}, 400);
	
	
	var leftToSet = leftWidth-2*(leftDotLink.width()/3);
	if (matchMedia('(min-width: 1200px)').matches) {
		leftToSet += ($(window).width()-1200)/2;
	} else {
		additionalLeft = 0;
	}
	leftDot.css("left", leftToSet);
	leftContainer.css("margin-left", 0);
}

/*
Position the Right dot on screen resize
*/
function positionRightOnResize () {
	var viewportWidth = 0.19*windowWidth;
	if (matchMedia('(max-width: 767px)').matches) {
		viewportWidth = 0.09*windowWidth;
		
	}
	var marginOffset = mainContainerWidth - viewportWidth;
	calculateRightBoxBottom();
	calculateLeftDotLeft();
	calculateRightDotRight();
	setRightContentHeight();
	mainContainer.css("margin-left", 0-marginOffset);
	mainContainer.css("margin-right", 0);
	rightBox.css("bottom", rightBoxBottom);
	rightDot.css("bottom", rightBoxBottom + rightBox.outerHeight(true)/2 + rightDotLink.outerHeight()/2);
	var rightToSet = rightWidth+(2*(rightDotLink.width()/3));
	if (matchMedia('(min-width: 1200px)').matches) {
		rightToSet += ($(window).width()-1200)/2;
	} else {
		additionalRight = 0;
	}
	rightDot.css("right", rightToSet);
	var percentToShow = 0.2;
	if (matchMedia('(max-width: 767px)').matches) {
		percentToShow = 0.1;
	}
	rightContainer.css("margin-left", percentToShow*windowWidth);
}

function reportDiscoverMore() {
	dm_promoList = "";
	tagslist = "";
	
	CQ_Analytics.EventDataMgr.data = {};
	
	//Remove NS vars if already visited
	$CQ("#sc_ns_event27").removeAttr("record");
	
	//Remove page load tags as they should not be reported in NS & DM
	$CQ("#sc_pl_tags").removeAttr("record");
	
	//Need to remove this incase of Employye Profile Pages
	$CQ("#sc_rel_emp_promoList").removeAttr("record");
	
	$CQ("#templateSpan").removeAttr("record");
	$CQ("#pageNameSpan").removeAttr("record");
	
	if (!isDMReported) {
		
		dm_promoList = discoverMore_promoComponentString;
		
		//### ----- Next Steps - Curated impressions
		//Append Featured Promos
		for(i=0; i < articlepage_curatedStandardComponentArray.length; i++) {
			if(articlepage_curatedStandardComponentArray[i] != ''){
				if (dm_promoList == "")
					dm_promoList = articlepage_curatedStandardComponentArray[i];
				else
					dm_promoList += "," + articlepage_curatedStandardComponentArray[i];
			}
		}

		//Append standard promos
		for(i=0; i < articlepage_curatedFeaturedComponentArray.length; i++) {
			if(articlepage_curatedFeaturedComponentArray[i] != ''){
				if (dm_promoList == "")
					dm_promoList = articlepage_curatedFeaturedComponentArray[i];
				else
					dm_promoList += "," + articlepage_curatedFeaturedComponentArray[i];
			}
		}
        // removing trailing and leading commas
		dm_promoList = dm_promoList.replace(/(^,)|(,$)/g, "");
		for(i=0; i < tagValuesArray.length; i++) {
			if (tagslist == "")
				tagslist = tagValuesArray[i];
			else
				tagslist += "," + tagValuesArray[i];
		}
		
		var eventsArray = new Array();
		var valuesObj = new Object();
		var index = 0;
		
		
		if(dm_promoList != ''){
			if($CQ("#sc_scroll_event29") != null && $CQ("#sc_scroll_event29") != undefined && $CQ("#sc_scroll_event29") != 'undefined'){
	    		$CQ("#sc_scroll_event29").removeAttr("record");
	    	}
	    	if($CQ("#sc_scroll_event30") != null && $CQ("#sc_scroll_event30") != undefined && $CQ("#sc_scroll_event30") != 'undefined'){
	    		$CQ("#sc_scroll_event30").removeAttr("record");
	    	}
			$CQ("#sc_dm_event27").attr("record", "'event27', {'list2':dm_promoList}");
		}
		// removing trailing and leading commas
		tagslist = tagslist.replace(/(^,)|(,$)/g, "");
		if (tagslist != '') {
			$CQ("#sc_dm_event25").attr("record", "'event25', {'list1':tagslist}");
		}
		$CQ("#templateSpan").attr("record", "'pageView', {'prop52':sc_template+'_disc_more'}");
		$CQ("#pageNameSpan").attr("record", "'pageView', {'pageName':sc_currentPageName+'_disc_more'}");
		if($CQ("#sc_pageView") != null && $CQ("#sc_pageView") != undefined){
			$CQ("#sc_pageView").removeAttr("record");
		} 
		//Track along with page load params - This method is defined in green-dot.js
		//trackPageViewAgain();
	
		
		isDMReported = true;
	}
}

function reportNextSteps() {
	ns_promoList = "";
	
	//Remove page load tags as they should not be reported in NS & DM
	$CQ("#sc_pl_tags").removeAttr("record");
	
	//Remove DM vars if already visited
	$CQ("#sc_dm_event27").removeAttr("record");
	$CQ("#sc_dm_event25").removeAttr("record");
	
	//Need to remove this incase of Employye Profile Pages
	$CQ("#sc_rel_emp_promoList").removeAttr("record");
	
	
	$CQ("#templateSpan").removeAttr("record");
	$CQ("#pageNameSpan").removeAttr("record");
	
	CQ_Analytics.EventDataMgr.data = {};
	
	if (!isNSReported) {
		
		ns_promoList = nextSteps_promoComponentString;
		
		//## --- NS TSart
		//Append Careers
		for(i=0; i < articlepage_curatedCareersComponentArray.length; i++) {
			if(articlepage_curatedCareersComponentArray[i] != ''){
				if (ns_promoList == "")
					ns_promoList = articlepage_curatedCareersComponentArray[i];
				else
					ns_promoList += "," + articlepage_curatedCareersComponentArray[i];
			}
		}

		//Append Profiles
		for(i=0; i < articlepage_curatedEmployeeComponentArray.length; i++) {
			if(articlepage_curatedEmployeeComponentArray[i] != ''){
				if (ns_promoList == "")
					ns_promoList = articlepage_curatedEmployeeComponentArray[i];
				else
					ns_promoList += "," + articlepage_curatedEmployeeComponentArray[i];
			}
		}

		//Append Events
		for(i=0; i < articlepage_curatedEventComponentArray.length; i++) {
			if(articlepage_curatedEventComponentArray[i] != ''){
				if (ns_promoList == "")
					ns_promoList = articlepage_curatedEventComponentArray[i];
				else
					ns_promoList += "," + articlepage_curatedEventComponentArray[i];
			}
		}

		//Append Solutions
		for(i=0; i < articlepage_curatedSolutionsComponentArray.length; i++) {
			if(articlepage_curatedSolutionsComponentArray[i] != ''){
				if (ns_promoList == "")
					ns_promoList = articlepage_curatedSolutionsComponentArray[i];
				else
					ns_promoList += "," + articlepage_curatedSolutionsComponentArray[i];			
			}
		}
        // removing trailing and leading commas
		ns_promoList = ns_promoList.replace(/(^,)|(,$)/g, "");

		isNSReported = true;
	}
}

$(document).ready(function() {
    if ((matchMedia('(min-width: 768px)').matches) ) {
       $(".related-topics").css('display','block');
     }
	// Call all the page set up functions on page load
	setTimeout(function () {
        calculateAllMetrics();
        positionPageContent();
        leftContainer.css("top", headerHeight);

		positionDot("left");
	    positionDot("right");
	}, 5000);

	/*
	Show the left content on left dot click, and hide it when it is reclicked
	*/
	leftBox.click(function() {leftDotLink.click();})
	leftDotLink.click(function(e) {
		e.preventDefault();
		if (!$(this).hasClass("selected")) {
			toggleScroll ("hide");
			leftWidth = leftContainer.outerWidth();
			rightBox.animate({right: "-=9999px"}, time, "linear");
			rightDot.animate({right: "-=9999px"}, time, "linear");
			$(".main-container.content-page .green-dot-animation.left a.dot span").removeClass("icon-plus").addClass("icon-chevron-right");
			mainContainer.animate({marginLeft: leftWidth}, time, "linear");
			var leftToSet = leftWidth-2*(leftDotLink.width()/3);
			if (matchMedia('(min-width: 1200px)').matches) {
				leftToSet += ($(window).width()-1200)/2;
			}
			if (matchMedia('(max-width: 500px)').matches){
				mainContainer.css('height', '330px');
    		}
            if (matchMedia('(max-width: 767px)').matches){
				mainContainer.css('height', '350px');
				
    		}
            if (matchMedia('(min-width: 768px)').matches){
				mainContainer.css('height', '800px');
    		} 
            if (matchMedia('(min-width: 1024px)').matches){
				mainContainer.css('height', '600px');
				
    		}
			leftDot.animate({left: leftToSet}, time, "linear");
			leftBox.css("left", "-9999px");
			leftContainer.show().animate({marginLeft: "0"}, time, "linear");
			setLeftContentHeight();
			$(this).addClass("selected");

			$(".main-container.content-page .green-dot-animation.left a.dot").attr('aria-labelledby',returnAria);
			fixNextStepsBottom();
			scrollEndDMFlag = true;

			//Report Discover more data to SiteCat
			//reportDiscoverMore();
		} else {
			toggleScroll ("show");
			scrollEndDMFlag = false;

			leftWidth = leftContainer.outerWidth();
			rightBox.animate({right: additionalRight}, time, "linear");	
			rightDot.animate({right: rightDotRight}, time, "linear");
			rightDot.css("bottom", rightBoxBottom + rightBox.outerHeight(true)/2 + rightDotLink.outerHeight()/2);
			mainContainer.animate({marginLeft: mainContainerLeftMargin}, time, "linear");
			leftDot.animate({left: leftDotLeft}, time, "linear");
			$(".main-container.content-page .green-dot-animation.left a.dot span").removeClass("icon-chevron-right").addClass("icon-plus");
			leftContainer.animate({marginLeft: 0-leftWidth}, time, "linear", function() {
				$(this).hide();
				leftBox.css("left", additionalLeft);
			});
			if (matchMedia('(max-width: 500px)').matches){
				mainContainer.css('height', 'auto');
    		}
            if (matchMedia('(max-width: 767px)').matches){
				mainContainer.css('height', 'auto');
    		}
            if (matchMedia('(min-width: 768px)').matches){
				mainContainer.css('height', 'auto');
    		} 
            if (matchMedia('(min-width: 1024px)').matches){
				mainContainer.css('height', 'auto');
			}
			$(this).removeClass("selected");
            $(".main-container.content-page .green-dot-animation.left a.dot").attr('aria-labelledby',discover);
			fixNextStepsBottom();
		}
	});
	
	returnFromLeft.click(function (e){
		e.preventDefault();
        leftClicked = true;
		leftDotLink.click();
		toggleScroll ("show");
		leftWidth = leftContainer.outerWidth(true);
		rightBox.animate({right: additionalRight}, time, "linear"); 
		rightDot.animate({right: rightDotRight}, time, "linear");
		rightDot.css("bottom", rightBoxBottom + rightBox.outerHeight(true)/2 + rightDotLink.outerHeight()/2);
		mainContainer.animate({marginLeft: mainContainerLeftMargin}, time, "linear");
		leftDot.animate({left: leftDotLeft}, time, "linear");
		$(".main-container.content-page .green-dot-animation.left a.dot span").removeClass("icon-chevron-right").addClass("icon-plus");
		leftContainer.animate({marginLeft: 0-leftWidth}, time, "linear", function() {
			$(this).hide();
			leftBox.css("left", additionalLeft);
		});
		$(".main-container.content-page .green-dot-animation.left a.dot").removeClass("selected");
		fixNextStepsBottom();
	});

	/*
	Show the right content on right dot click, and hide it when it is reclicked
	*/
	rightBox.click(function() {rightDotLink.click();})
	rightDotLink.click(function (e) {
		e.preventDefault();
		var viewportWidth = 0.19*windowWidth;
		if (matchMedia('(max-width: 767px)').matches) {
			viewportWidth = 0.09*windowWidth;
		}
		var marginOffset = mainContainerWidth - viewportWidth;
		if (!$(this).hasClass("selected")) {
			toggleScroll ("hide");
			rightWidth = rightContainer.outerWidth();
			leftBox.animate({left: "-=9999px"}, time, "linear");
			leftDot.animate({left: "-=9999px"}, time, "linear");
			mainContainer.animate({marginLeft: 0-marginOffset}, time, "linear");
			mainContainer.animate({marginRight: 0}, time, "linear");
			var rightToSet = rightWidth+(2*(rightDotLink.width()/3));
			if (matchMedia('(min-width: 1200px)').matches) {
				rightToSet += ($(window).width()-1200)/2;
			} else{
			    rightToSet -= 14;
			}    
			rightDot.animate({right: rightToSet}, time, "linear");
			$(".main-container.content-page .green-dot-animation.right a.dot span").removeClass("icon-chevron-right").addClass("icon-chevron-left");
			rightBox.css("right", "-9999px");
			var percentToShow = 0.2;
			if (matchMedia('(max-width: 767px)').matches) {
				percentToShow = 0.1;
			}
			if (matchMedia('(max-width: 500px)').matches){
				mainContainer.css('height', '330px');
    		}
            if (matchMedia('(max-width: 767px)').matches){
				mainContainer.css('height', '350px');

    		}
            if (matchMedia('(min-width: 768px)').matches){
				mainContainer.css('height', '800px');

    		} 
            if (matchMedia('(min-width: 1024px)').matches){
				mainContainer.css('height', '600px');

    		}
			rightContainer.show().animate({marginLeft: percentToShow*windowWidth}, time, "linear");
			setRightContentHeight();
			$(this).addClass("selected");
			$(".main-container.content-page .green-dot-animation.right a.dot").attr('aria-labelledby',returnAria);
            fixNextStepsBottom();
            scrollEndNSFlag = true;

			//report Next Steps analytics
			//reportNextSteps();
		} else {
            scrollEndNSFlag = false;

			toggleScroll ("show");
			rightWidth = rightContainer.outerWidth();
			leftBox.animate({left: additionalLeft}, time, "linear");	
			leftDot.animate({left: leftDotLeft}, time, "linear");
			leftDot.css("top", leftBoxTop + leftBox.outerHeight(true)/2 - leftDotLink.outerHeight()/2);
			mainContainer.animate({marginLeft: mainContainerLeftMargin}, time, "linear");
			mainContainer.animate({marginRight: mainContainerRightMargin}, time, "linear");
			leftDot.animate({left: leftDotLeft}, time, "linear");
			rightDot.animate({right: rightDotRight}, time, "linear");

			$(".main-container.content-page .green-dot-animation.right a.dot span").removeClass("icon-chevron-left").addClass("icon-chevron-right");
			rightContainer.animate({marginLeft: rightMargin}, time, "linear", function() {
				$(this).hide();
				rightBox.css("right", additionalRight);
			});
			if (matchMedia('(max-width: 500px)').matches){
				mainContainer.css('height', 'auto');
				}
            if (matchMedia('(max-width: 767px)').matches){
				mainContainer.css('height', 'auto');

    		}
            if ((matchMedia('(min-width: 768px)').matches) && (matchMedia('(max-width: 1024px)').matches)){
            	mainContainer.css('height', 'auto');
    		} 
            if (matchMedia('(min-width: 1024px)').matches){
				mainContainer.css('height', 'auto');
			}
			$(this).removeClass("selected");
            $(".main-container.content-page .green-dot-animation.right a.dot").attr('aria-labelledby',next);
           	
			fixNextStepsBottom();	
			fixDiscoverBottom();
		}
	});

	returnFromRight.click(function (e){
		e.preventDefault();
        rightClicked = true;
		rightDotLink.click();
		fixDiscoverBottom();
		$(".green-dot-animation.right .nest a.dot").focus();
		//window.document.focus();
		//$("#footer-section .footerlinks .first ul li a:first").focus();
		
		/*var viewportWidth = 0.19*windowWidth;
		if (matchMedia('(max-width: 767px)').matches) {
			viewportWidth = 0.09*windowWidth;
		}
		var marginOffset = mainContainerWidth - viewportWidth;
		toggleScroll ("show");
		rightWidth = rightContainer.outerWidth();
		leftBox.animate({left: additionalLeft}, time, "linear"); 
		leftDot.animate({left: leftDotLeft}, time, "linear");
		leftDot.css("top", leftBoxTop + leftBox.outerHeight(true)/2 - leftDotLink.outerHeight()/2);
		mainContainer.animate({marginLeft: mainContainerLeftMargin}, time, "linear");
		mainContainer.animate({marginRight: mainContainerRightMargin}, time, "linear");
		leftDot.animate({left: leftDotLeft}, time, "linear");
		rightDot.animate({right: rightDotRight}, time, "linear");
		$(".main-container.content-page .green-dot-animation.right a.dot span").removeClass("icon-chevron-left").addClass("icon-chevron-right");
		rightContainer.animate({marginLeft: rightMargin}, time, "linear", function() {
			$(this).hide();
			rightBox.css("right", additionalRight);
		});
		$(".main-container.content-page .green-dot-animation.right a.dot").removeClass("selected");*/
	});
	
	/* Function for the inline navigation */
	$(".content-page .inline-nav-container-links").click(function(e) {
		e.preventDefault();
		var component = $(this).attr("href");
		var location = $(component).position().top;
		var headerHeight = $("#header").outerHeight(true);
		var location_other= location+headerHeight;


		if (matchMedia('(max-width: 767px)').matches) {
			$('html, body').stop().animate({scrollTop: location_other}, 500, 'swing');
			}
				else {
					$('html, body').stop().animate({scrollTop: location}, 500, 'swing');
				}
           $(component+" a:first").focus();
	return false;
	});
	
	/*
	Functions to call when the window is resized
	*/
	$(window).resize(function(e) {
		if(Modernizr.touch) {
			e.preventDefault();
            calculateAllMetrics();
			positionMargins();
			positionPageContent();
			/*window.onorientationchange = function () {
				calculateAllMetrics();
				positionMargins();
				positionPageContent();
			};*/
		} /*else{
			calculateAllMetrics();
			positionMargins();
			positionPageContent();
		}*/
		if (leftDotLink.hasClass("selected")) {
			positionLeftOnResize();
		} else if (rightDotLink.hasClass("selected")) {
			positionRightOnResize();
		} else {
			
			positionDot("left");
			positionDot("right");
			
		}

		
	});
	//Safari Specific 
	 /*if($.browser.safari==true){
			if (matchMedia('(max-width: 1023px)').matches) {
                 $('.author-panel-3 .box-green-inner').css('width', '25.74%');
			}
    }*/
});
$('.mobile-nav-button,.mobile-search-button,.location-link,li.subnav-item a').click(function (e) {
    if(matchMedia('(max-width: 767px)').matches) {
        setTimeout(function(){
            $(window).resize();
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
            	if($('.mobile-nav-button').hasClass("active")){
                        $(".main-container.content-page .green-dot-animation.left").addClass('mobile');
                }
                else{ 
                    $(".main-container.content-page .green-dot-animation.left").removeClass('mobile');
               }
            }
        },650);
	}
});

/*Focus out issue for discover more*/
returnFromLeft.focusout(function(){
	if(!leftClicked){
		leftDotLink.click();
        $(".content.main a:first").focus();
	}
	leftClicked = false;

    if(inPresent.length>0){
    $(".inline-nav-container .inline-nav-content-page a:first").focus();
    }
   	else{
	$(".content.main a:first").focus();
    }
});

returnFromRight.focusout(function() {
	if(!rightClicked){
		rightDotLink.click();
		fixDiscoverBottom();
	}
	
	rightClicked = false;
});
$(window).scroll(function(){
	if (matchMedia('(min-width: 1025px)').matches) {
		fixDiscoverBottom();
	}
	fixNextStepsBottom();
	
});

/* inline navigation script */
var positionInPage = function() {
	if($('.content-top').height() < ($('.inline-nav-container').height() - articleTitle)) {
		$('.content-top').css("min-height", $('.inline-nav-container').height() - articleTitle);
	}
}
$('.inline-nav-container .explore-content').click(function (e) {
	$('.inline-nav-container i.icon-chevron-down').hide();
	$(this).removeAttr("href");
	$('.inline-nav-container .collapse-content').attr("href","#");
    $('.extended.inline-nav-content-page').removeClass("extended").addClass("explored");
    $(".inline-nav-content-page.explored li a:first").focus();
    $('.inline-nav-container i.icon-chevron-up').show();
    positionInPage();
});

$('.inline-nav-container .collapse-content').click(function (e) {
	$('.inline-nav-container i.icon-chevron-up').hide();
	$(this).removeAttr("href");
	$('.inline-nav-container i.icon-chevron-down').show();
	$('.inline-nav-container .explore-content').attr("href","#");
    $('.explored.inline-nav-content-page').addClass("extended");
    $(".inline-nav-content-page li a:first").focus();
    positionInPage();
});

if($('.inline-nav-container').length > 0) {
	$('.inline-nav-container i.icon-chevron-up').hide();
	if (matchMedia('(min-width: 769px)').matches) {
		var articleTitle = $("#article-title").height();
		$('.inline-nav-container').css("top", -articleTitle);
		positionInPage();	
	}
}
