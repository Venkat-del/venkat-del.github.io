/**
 * jquery.taboverflow.js
 *
 * Author: Travis Dahl
 *
 * Description: Plugins to make PMT's tabulations scrollable in case the window's 
 * 				width becomes too small to display all of the tabs. 
 * 
 * Example: $(".tabbedMenu").taboverflow();
 * 
 * Notes: there are 2 global events on window resize and body click
 * 
 * TODO: maybe find an alternative to the global body click event.\
 *
 * */
(function($) {

	/***************************************************
	 * 
	 * taboverflow plugin - allows tabs scrolling when the window's width is too small to display all tabs
	 * 
	 * **************************************************/
	$.fn.taboverflow = function(options) {

		var opts = $.extend( {}, $.fn.taboverflow.defaults, options);
		
		$(window).resize(function() {
			$('.tabbedMenu').toggleOverflowArrow();
		});	
		
		$('body').click(function () {	
			$('.tabList ul').hide("fast");	
		});	
			
		return this.each(function() {
			$this = $(this);
			$.fn.taboverflow.prepareDom($this);
			$.fn.taboverflow.setListWidth($this);
			$.fn.taboverflow.toggleTabslist($this);
			$this.toggleOverflowArrow();
						
			$this.parents().find('.menuScrollRight').scrollTabs({"direction":"right"});
			$this.parents().find('.menuScrollLeft').scrollTabs({"direction":"left"});			
		});
	};

	/**
	 * Wraps the tabs with necessary DIVs and add anchors to scroll left and
	 * right
	 */
	$.fn.taboverflow.prepareDom = function($this) {
		if ($this.parents(".tabHeader").find(".tabbedMenuWrap").length === 0) {
			$this.wrap('<div class="tabbedMenuWrap"><div class="tabbedScrollWrap"></div></div>');
			$this.parents(".tabHeader").find(".tabbedMenuWrap").prepend('<a href="javascript:void(0);" style="display:none;" class="menuScrollLeft scrollArrows">&nbsp;</a><a href="javascript:void(0);" style="display:none;" class="menuScrollRight scrollArrows">&nbsp;</a><div class="tabList"><a class="tabListLink">&nbsp;</a></div>');
			
			var thisTabList = $this.parents(".tabHeader").find(".tabList");
			$this.clone()
				.removeAttr("class")
				.appendTo(thisTabList)
				.find("li")
				.removeAttr("style")
				.removeAttr("id")
				.find("a")
				.attr("id", function() {
						return this.id + "_tabList";
					});
		}
	};

	/**
	 * Sets the width of the UL containing the tabs
	 * */
	$.fn.taboverflow.setListWidth = function($this) {
		var tabsTotalWidth = 0;

		$this.find('li').each(function() {
			tabsTotalWidth = (($(this).width() + 1) + (tabsTotalWidth));
		});

		if (($.browser.msie) && ($.browser.version == 7)) {
			var accountForBorders = 10;
		}else{
			var accountForBorders = 2;	
		}

		tabsTotalWidth = (tabsTotalWidth + accountForBorders);
		$this.width(tabsTotalWidth + "px");
	};
	
	$.fn.taboverflow.toggleTabslist = function($this) {
		var $tabList = $this.parents().prev(".tabList");
		
		$tabList.find('.tabListLink').click(function (event) {	
			event.stopPropagation();
			$(this).siblings('ul').toggle("fast");	
		});		
		
		$tabList.click(function (event) {	
			event.stopPropagation();			
		});
	};

	
	/****************************************************************************
	 * 
	 * toggleOverflowArrow plugin to toggle the elements allowing to scroll
	 * 
	 * ***************************************************************************/
	$.fn.toggleOverflowArrow = function(options) {

		var opts = $.extend( {}, $.fn.toggleOverflowArrow.defaults, options);

		return this.each(function() {
			$this = $(this);

			var tabsTotalWidth = $this.width();
			var wrapperWidth = $this.parents(".tabbedScrollWrap").width();
			$this.parents(".tabbedScrollWrap").scrollLeft(0);
			
			if (wrapperWidth > tabsTotalWidth) {
				$this.parents(".tabHeader").find(".scrollArrows, .tabList").hide();
			} else {
				$this.parents(".tabHeader").find(".scrollArrows, .tabList").show();
			}
		});
	};
	
	/****************************************************************************
	 * 
	 * scrollTabs plugin to allow the scrolling of the tabs
	 * 
	 * ***************************************************************************/
	$.fn.scrollTabs = function(options) {

		var opts = $.extend( {}, $.fn.scrollTabs.defaults, options);
		var scrollingLength = 200;
		
		return this.each(function() {
			$this = $(this);
			
			$this.bind("click",function(){
				var offset = $(this).siblings(".tabbedScrollWrap").scrollLeft();	
				switch(opts.direction){
					case "right":
						offset = offset + scrollingLength;
						break;
					case "left":
						offset = offset - scrollingLength;
						break;
				}
													  
				$(this).siblings(".tabbedScrollWrap").animate({ scrollLeft: offset}, "fast", "linear", function() {});
			});	
		});
		
		$.fn.scrollTabs.defaults = {};
	};
})(jQuery);