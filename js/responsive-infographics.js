//The variable below "renditionCache" will keep track of which SVG renditions exist.
//We determine if a "Mobile" friendly SVG rendition exists by making an HTTP-HEAD request client-side
//If the HEAD requests returns a 404 then we know the Mobile rendition does not exists
//Rather than keep making a HEAD requests each time the user resizes their screen we will store the available renditions in this cache object
var renditionCache = {};
function setInfographicRendition(containerId) {
	// svgContainer is the parent of the SVG object that we use on the main HTML page
	var svgContainer = $("#infographic-zoom-" + containerId);
	
	//modalContainer is the parent <div> for the SVG object that is shows when the user goes fullscreen (modal)
	var modalContainer = $("#infographic-zoom-modal-" + containerId);
    var svgObj = svgContainer.find('.infographic-img');
    var modalObj = modalContainer.find('.infographic-img');
	
	if (svgObj != null && modalObj!=null) {
		//Step 1 - get the source for the path to the SVG from the data-svgsrc attribute
		var originalsrc = svgObj.attr("data-svgsrc");
		var imgalt = svgObj.attr("data-alt");
		var renditionsrc = "";
		if (originalsrc !="" && originalsrc != null && originalsrc != undefined) {
			//Step 2 - create a path to the .png version of the infographic
			var extn = originalsrc.split('.').pop().toLowerCase();		 
			if(extn == 'png'){
				imgsrc = originalsrc;			 
			}else{
				imgsrc = originalsrc + "image.png";			  
			}
			//Step 3 - determine if this screen resolution requires a mobile-friendly version
			if (matchMedia('(max-width: 767px)').matches || matchMedia('(max-device-width: 767px)').matches) {
			
				//Step 4 - build the path to the mobile-friendly SVG
				renditionsrc = originalsrc + "mobile.svg";
				
				//Have we already verified that the mobile-friendly rendition exits?  Check our renditionCahe....
				if(renditionCache[originalsrc]==null){
					//Nope, we have not checked yet.  Do it now by making an HTTP HEAD requests...
					
					$.ajax({
						type: "HEAD",
						async: true,
						url: renditionsrc,
						success: function(message){
							// Success - the mobile rendition exists.
							// Continue with building SVG objects using the mobile SVG path
							renditionCache[originalsrc]={mobile:true};
							createSvgObject(svgContainer, svgObj, renditionsrc, imgsrc, imgalt);
							createSvgObject(modalContainer, modalObj, renditionsrc, imgsrc, imgalt);
						},
						error: function (xhr, ajaxOptions, thrownError) {
							// FAIL (probably a 404)) - The mobile rendition does not exists.
							// Continue with building SVG objects using the mobile SVG path
							renditionCache[originalsrc]={mobile:false};
							createSvgObject(svgContainer, svgObj, originalsrc, imgsrc, imgalt);
							createSvgObject(modalContainer, modalObj, originalsrc, imgsrc, imgalt);
						}
					});					
				}else if(renditionCache[originalsrc].mobile){
					// We already checked.  According to our rendition cache a mobile version does exist.
					// Continue with building SVG objects using the original SVG path
					createSvgObject(svgContainer, svgObj, renditionsrc, imgsrc, imgalt);
					createSvgObject(modalContainer, modalObj, renditionsrc, imgsrc, imgalt);
				}else{
					// We already checked.  According to our rendition cache a mobile version does not exist.
					// Continue with building SVG objects using the original SVG path
					createSvgObject(svgContainer, svgObj, originalsrc, imgsrc, imgalt);
					createSvgObject(modalContainer, modalObj, originalsrc, imgsrc, imgalt);
				}
			} else {
				createSvgObject(svgContainer, svgObj, originalsrc, imgsrc, imgalt);
				createSvgObject(modalContainer, modalObj, originalsrc, imgsrc, imgalt);
			}
		}
	}
}

function createSvgObject(parent, container, svgsrc, imgsrc, imgalt){
	var parentid = $(parent).attr("id");
	var childid = parentid + "_svg";
	var child = $("#" + childid);
	var loadsvg = true;
	
	//Check if the browser supports SVG.
	if (!Modernizr.svg) {
		// Oh, oh.  SVG not supported.  Create an Image using the imgsrc
		if(child.length<=0){
			var svgobj = $("<img class=\"panzoom\"  id=\"" + childid + "\" src=\"" + imgsrc + "\" alt=\"alt\" width=\"100%\"  preserveAspectRatio=\"xMinYMin meet\" \>");
			$(container).append(svgobj);
		}
	}else{
		// Yeah. Modern browser that supports SVG.  Build an SVG
		
		if(child.length>0){
			//if the SVG already exists and teh SVG src is already the same as the source requested no need to swap anything
			//in other words, the screen size changed but no need to change the SVG size.
			if($("#" + childid).attr("data") == svgsrc){
				loadsvg=false;
			}
		}
		
		if(loadsvg){
			//Otherwise, the SVG either does not exist or the one currently on the page needs to be changed because the screen resolution has changed.
			var svgobj=null;
			/*if(/MSIE (9\.[\.0-9]{0,})/i.test(navigator.userAgent)){
				// Well, the user is using IE9.  IE9 only supports svg inside an <object> tab. 
				// We don't want that for other browser because it breaks the ability for dragging the SVG in PanZoom.
				svgobj = $("<object class=\"panzoom\" data=\"" + svgsrc + "\" id=\"" + childid + "\" type=\"image/svg+xml\" preserveAspectRatio=\"xMinYMin meet\" />");
				$(container).empty();
				$(container).append(svgobj);
			}else{
				//User is not using IE9.  So, we can safely use an SVG inside an Image tag.(*/
				svgobj = $("<img class=\"panzoom\" src=\"" + svgsrc + "\" id=\"" + childid + "\" alt=\"alt\" />");
				$(container).empty();
				$(container).append(svgobj);
			//}
			
			//Now that we have injected the SVN image into the DOM, setup PanZoom
			parent.find('.panzoom').panzoom({
				$zoomIn: parent.find(".zoom-in"),
				$zoomOut: parent.find(".zoom-out"),
				$zoomRange: parent.find(".zoom-range"),
				$reset: parent.find(".reset"),
				$set: $("#" + childid)
			});
			
			//Finally, setup RangeSlider for the range input
			parent.find(".zoom-range").rangeslider({
				// Deactivate the feature detection
				polyfill: false,

				// Callback function
				onInit: function() {},

				// Callback function
				onSlide: function(position, value) {},

				// Callback function
				onSlideEnd: function(position) {}
			});

		}
	}

}

$(document).ready(function(){

	var infographics = $('.infographic');
	if(infographics.length>0){
		infographics.each(function(){
			var infoAttr = $(' .infographic-zoom > div', this).attr('id');
			var uuid = infoAttr.substring(17);
	    	setInfographicRendition(uuid);	    		    	
	    	//binding buttons	    	
	    			});
		$(window).resize(function(){
			infographics.each(function(){
			var infoAttr = $(' .infographic-zoom > div', this).attr('id');
			var uuid = infoAttr.substring(17);
	    	setInfographicRendition(uuid);
			});
		});
	}
	
});