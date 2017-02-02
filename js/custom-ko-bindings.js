ko.bindingHandlers.typeahead = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		var $element = $(element);
		var allBindings = allBindings();
		
		
		//Convert the bindings on this into an object
		var bootstrapOptions = { source: ko.utils.unwrapObservable(valueAccessor()) };

		if (allBindings.typeahead) {
			//If autoselect=false then override the default bootstrap behavior.  
			//Follow the link below until bootrap fixes this issue:
			//https://github.com/angular-ui/bootstrap/issues/908
		
			$.each(allBindings.typeahead, function(optionName, optionValue) {
				bootstrapOptions[optionName] = ko.utils.unwrapObservable(optionValue);
			});

		}
		
		//add autcomplete="off" to the input
		$element.attr("autocomplete", "off");
		
		//Configure Bootstrap Typeahead
		$element.typeahead(bootstrapOptions);

		if(allBindings.typeahead.autoselect !== undefined && allBindings.typeahead.autoselect===false){
			var typeaheadInstance = $element.data("typeahead");
			var origRenderFunc = typeaheadInstance.render;
			
			typeaheadInstance.render = function() {
				var result = origRenderFunc.apply(this, arguments);
				result.$menu.children().first().removeClass("active")
				return result;
			}
		}
		
		
	}
};