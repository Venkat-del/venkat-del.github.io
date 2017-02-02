//Form Script
var fileVal;
$(document)
		.ready(
				function() {
					$('.rfp-page .form_rightcol input[type=file]').val('');
					$('.main-container form .form_button_submit')
							.click(
									function() {

										if ($('#TopicDropdown').val() == '') {
											$('.topic_select .form_error')
													.show();
										} else {
											$(
													'.main-container.contact-us-page form')
													.submit();
										}
										if ($('#IndustryDropdown').val() == '') {
											$('.industry_select .form_error')
													.show();
										} else {
											$('.main-container.rfp-page form')
													.submit();
										}

									});
					$('.form_rightcol input[type=file]')
							.change(
									function() {

										fileVal = $(
												'.form_rightcol input[type=file]')
												.val();

										// $(this).parent().append("<input
										// type='hidden' name='hiddenFile'
										// id='submitRfpFile'
										// value='"+fileVal+"'/>");

										document
												.getElementById("submitRfpFilePath").value = fileVal;

									});
				});
/*
 * var
 * fileVal,submitContactButton,submitRfpButton,industryDropdownValue,topicDropdownValue;
 * $('.ie9 .main-container form').submit(function(e){
 * if($('#TopicDropdown').val()!=''){ $('.main-container .form-component
 * .form-section form').submit(); }else{ $('.topic_select .form_error').show();
 * return false; } if($('#IndustryDropdown').val()!=''){ $('.main-container
 * .form-component .form-section form').submit(); }else{ $('.industry_select
 * .form_error').show(); return false; } }); $('.ie9
 * #TopicDropdown').change(function(){$('.topic_select .form_error').hide();});
 * $('.ie9 #IndustryDropdown').change(function(){$('.industry_select
 * .form_error').hide();}); });
 * 
 * function showHideTopicError(isShow) { if (isShow == true) { $('.topic_select
 * .form_error').show(); localStorage.setItem("showTopicError", 1); } else {
 * $('.topic_select .form_error').hide(); localStorage.setItem("showTopicError",
 * 0); } } function selectedTopic(topicValue){
 * localStorage.setItem("topicValue", topicValue);
 * $('.main-container.contact-us-page #TopicDropdown option').each(function(){
 * if($(this).val()==topicValue){ $(this).attr('selected','selected'); } }); }
 * function showHideIndustryError(isShow) { if (isShow == true) {
 * $('.industry_select .form_error').show();
 * localStorage.setItem("showIndustryError", 1); } else { $('.industry_select
 * .form_error').hide(); localStorage.setItem("showIndustryError", 0); } }
 * function selectedIndustry(industryValue){
 * localStorage.setItem("industryValue", industryValue);
 * $('.main-container.rfp-page #IndustryDropdown option').each(function(){
 * if($(this).val()==industryValue){ $(this).attr('selected','selected'); } }); }
 * 
 * $(function(){ submitContactButton = $('.main-container.contact-us-page form
 * .form_button_submit'); submitRfpButton = $('.main-container.rfp-page form
 * .form_button_submit'); if(submitContactButton!='undefined'){
 * topicDropdownValue=$('.main-container.contact-us-page #TopicDropdown').val();
 * showHideTopicError(localStorage.getItem("showTopicError"));
 * selectedTopic(localStorage.getItem("topicValue"));
 * localStorage.removeItem("showTopicError");
 * localStorage.removeItem("topicValue"); submitContactButton.click(function() {
 * if($('.main-container.contact-us-page #TopicDropdown').val()!='') {
 * topicDropdownValue=$('.main-container.contact-us-page #TopicDropdown').val();
 * showHideTopicError(false); selectedTopic(topicValue); } else {
 * showHideTopicError(true); selectedTopic(topicValue); }
 * $('.main-container.contact-us-page .form-component .form-section
 * form').submit(); }); } if(submitRfpButton!='undefined'){
 * rfpDropdownValue=$('.main-container.rfp-page #IndustryDropdown').val();
 * showHideIndustryError(localStorage.getItem("showIndustryError"));
 * selectedIndustry(localStorage.getItem("industryValue"));
 * localStorage.removeItem("showIndustryError");
 * localStorage.removeItem("IndustryValue"); submitRfpButton.click(function() {
 * if($('.main-container.rfp-page #IndustryDropdown').val()!='') {
 * industryDropdownValue=$('.main-container.rfp-page #IndustryDropdown').val();
 * showHideIndustryError(false); selectedIndustry(industryValue); } else {
 * showHideIndustryError(true); selectedIndustry(industryValue); }
 * $('.main-container.rfp-page .form-component .form-section form').submit();
 * }); } });
 */
