function MoveAssetFragments() {

	var styleIndex = 0;
    var scriptIndex = 0;

    $("dl dt[data-asset-type='js']").each(function() {

        var getsrc = $(this).attr("data-asset-src");
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = getsrc;
        newScript.id = 'NewScript_'+scriptIndex;
        document.body.appendChild(newScript); //for Script
        var findscriptbody = $("dl dt[data-asset-type='js']");
		// removing script tags from dt tag
        findscriptbody.remove();
        scriptIndex ++;

    });


    $("dl dt[data-asset-type='css']").each(function() {

        var gethref = $(this).attr("data-asset-src");
        var headID = $("head")[0]; //for stylesheet
        var newStyle = document.createElement('link');
        newStyle.rel = 'stylesheet';
        newStyle.type = 'text/css';
        newStyle.href = gethref;
        newStyle.id = 'NewStyle_'+styleIndex;
        headID.appendChild(newStyle);
        var findstylebody = $("dl dt[data-asset-type='css']");
		// removing link tags from dt tag
        findstylebody.remove();
        styleIndex ++;

    });

}

$(document).ready(function() {
    MoveAssetFragments();
	// removing dl structure completely from DOM
    setTimeout(function() {
        $("dl").remove();
    }, 3000);
});