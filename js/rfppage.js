//Form Script
var fileVal;
$(document).ready(function() {
					$('.rfp-page .form_rightcol input[type=file]').val('');
					$('.main-container form .form_button_submit').click(function() {
						var booleanValue = true;
                       
						if ($('#IndustryDropdown').val() == '') {
							$('.industry_select .form_error').show();
							booleanValue = false;
                         
							}
                        else {
                            var i = 0;
							 $('.form_rightcol input[type=file]').each(function(){
									if($(this).val() != ''){
										if(!jQuery.browser.msie){
											var file = $('.form_rightcol input[type=file]').get(i).files[0];


											var reader = new FileReader();
											var filesize = file.size;
                                           
											var oneMegabye = 10485760;

												if (filesize > oneMegabye) {
													$('+ .submitRfpFilePath + .file_form_error',this).show();
													booleanValue = false;
												} 
												reader.readAsDataURL(file);
											}

                                    }
									i++;

								 });
							}
							if(booleanValue){
                               
										$('.main-container.rfp-page form').submit();
									}

						});
					$('.form_rightcol input[type=file]').change(function() {
                       
                        $('+ .submitRfpFilePath + .file_form_error',this).hide();
                       
							});
    });
