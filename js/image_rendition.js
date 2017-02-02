var desktopExtn = ".desktop";
var tabletExtn = ".tablet";
var mobileExtn = ".mobile";
var renditionsPath = "/_jcr_content/renditions/cq5dam.web.";

function setImage(src, aspectRatio, extn) {
    var deviceAr=aspectRatio+extn;
    switch (deviceAr) {
        case "1:1.desktop":
            src = src + renditionsPath + "231.231.desktop.jpeg";
            break;
		case "4:1.desktop":
            src = src + renditionsPath + "1400.350.desktop.jpeg";
			break;
		case "2:1.desktop":
            src = src + renditionsPath + "700.350.desktop.jpeg";
            break;
		case "1:1.mobile":
            src = src + renditionsPath + "250.250.mobile.jpeg";
            break;
        case "4:1.mobile":
            src = src + renditionsPath + "768.192.mobile.jpeg";
            break;
        case "2:1.mobile":
            src = src + renditionsPath + "400.200.mobile.jpeg";
            break;
		case "1:1.tablet":
            src = src + renditionsPath + "350.350.tablet.jpeg";
            break;
        case "4:1.tablet":
            src = src + renditionsPath + "1024.256.tablet.jpeg";
            break;
		case "2:1.tablet":
            src = src + renditionsPath + "500.250.tablet.jpeg";
            break;
    }
	return src;
}

function setAllImgsRendition() {
    var images = $("img[data-orgsrc]");
	if (images != null) {
		for ( var i = 0; i < images.length; i++) {
			var JqueryObj = $(images[i]);
			var src = JqueryObj.attr("data-orgsrc");
			var aspectRatio = JqueryObj.attr("data-aspectratio");
			if (src !="") {
				if (matchMedia('(min-width: 1024px)').matches) {
                    console.log("desktop");
                    console.log(JqueryObj.parents('div.descriptive-featured-promo').length);
					JqueryObj.attr("src", setImage(src, aspectRatio,desktopExtn));
				} else if (matchMedia('(max-width: 767px)').matches) {
                    if(JqueryObj.parents('div.descriptive-featured-promo').length){
                        console.log('changing ar');
                        console.log(JqueryObj.parents('div.descriptive-featured-promo').length);
                        aspectRatio='4:1';
                    }
					JqueryObj.attr("src", setImage(src, aspectRatio, mobileExtn));
				} else if (matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) {
					JqueryObj.attr("src", setImage(src, aspectRatio,tabletExtn));
				}
			}
		}
	}
}

function setAllDesktopImages() {
    var images = $("img[data-orgsrc]");
    if (images != null) {
		for ( var i = 0; i < images.length; i++) {
			var JqueryObj = $(images[i]);
			var src = JqueryObj.attr("data-orgsrc");
			var aspectRatio = JqueryObj.attr("data-aspectratio");
			if (src !="") {
				JqueryObj.attr("src", setImage(src, aspectRatio,desktopExtn));
			}
        }
    }
}