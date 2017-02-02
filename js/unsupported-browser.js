/* DE1558 to support IE7 */
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  };
}


//creating cookie 
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
c_value+="; domain=.deloitte.com;path=/";
document.cookie=c_name + "=" + c_value;
}

$(document).ready(function(){
	(function(){
		$('#legacyMsg a').each(function(){
			$(this).click(setBrowserCookies);
		});
	})();

	 // Set a cookie to prevent this being displayed again
	 function setBrowserCookies(event){
			evt = event || window.event; 
				var targetElement = evt.target || evt.srcElement;
				//$.cookie('dcomUnsupportedBrowser', 'Accepted', { expires: 30 , path: '/' });
             	setCookie('dcomUnsupportedBrowser','Accepted',30);
				if($(targetElement).attr('id')=='legacy'){
					// redirect here 
				};
	          }	
	$('#disclaimer a').click(setBrowserCookies);
});
