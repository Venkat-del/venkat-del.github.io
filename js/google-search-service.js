angular.module('googleSearch',['ngSanitize','ui.bootstrap'])
   .factory('dataService',function($compile){

   	var dataService = {};
   	var searchTerm, selectFacet = "", pageCount = 0, includeOption = cse_local, rcount, sort_attribute = '', exact_term = '', exclude_term = '';
   	/* to set the screen with data */
   	dataService.setData = function(query, count) {
   			rcount = count;
   			searchTerm = query;
   			angular.element('.all-search-results').show();
			angular.element('.primary-headline').empty().html(results_for + ' "<span class="query-term">' + query + '</span>"');
			angular.element('.all').html(cse_AllResultsLabel);
			angular.element('#floatingCirclesG').fadeOut("slow");
			angular.element('.all-search-results').fadeIn("slow");
			angular.element('.wrapper').css({ "opacity" : '1'});
			angular.element('.search-sorting').show();
			angular.element('.advanced').show();
			angular.element('.content-filters').show();
			angular.element(".page-btn").removeClass("btn-blue").addClass("btn-white");
			angular.element('.page-btn a span.audible').remove();
			angular.element(".search-pagination li:nth-child("+(pageCount+1)+")").addClass("btn-blue").removeClass("btn-white") ;
			angular.element(".facet-btn:contains('PDFs')").hide();

			angular.element('<span class="audible">Current page</span>').insertAfter(angular.element(".search-pagination li:nth-child("+(pageCount+1)+") a span.ng-binding"));
	};
	/* for initial loading of the page */
   	dataService.loading = function() {
			$('.wrapper').css({"opacity" : '0.5'});
			$('#floatingCirclesG').fadeIn("slow");
	};
	/* to set value of page no from the pagination */
	dataService.Page = function(page) {
		pageCount = page;
	}
	/* to set value of facet */
	dataService.Facet = function(facet) {
		selectFacet = facet;
	}
	/* to get value of facet */
	dataService.getFacet = function() {
		return selectFacet;
	}
	/* to return computed page start value for pagination */
	dataService.Start = function() {
			return parseInt(pageCount, 10) * parseInt(10, 10);
	};
	/* to add facet in query in case available */
	dataService.QueryWithFacet = function(query) {
		if (selectFacet !== "" && typeof selectFacet != 'undefined' ) {
			loadSameFacets = true;
			return query + " " + selectFacet;
		} else {
			loadSameFacets = false;
			return query;
		}
	};
	/* to set query parameters */
   	dataService.QueryParams = function(query){
		var queryParams =  {
			key : cse_key,
			hl : cse_hl,
			sig : cse_sig,
		//	cx : '008113462624956073801:Dcom-Global',
			cx : dataService.SelectedCse(),
			q : dataService.QueryWithFacet(query),
			sort: sort_attribute,
			exactTerms: exact_term,
        	excludeTerms: exclude_term,
		//	fileType : fileInfo,
			num : 10,
			start : dataService.Start(),
			noncache : new Date().getTime(),
		};		
		return queryParams;
	}
	/* to get dcom all or global
	/** get the active current search configuration (member firm level vs. include all member firms)*/
	dataService.SelectedCse = function() {
		return cse_cx + includeOption;
	};
	/* to perform google search and fetch json data from REST API */
   	dataService.gSearch = function(query) {
        if (query !== "") { 	
        	dataService.loading();
			return $.ajax({
				url : "https://www.googleapis.com/customsearch/v1element",
				dataType : "jsonp",
				async: "false",
				data: dataService.QueryParams(query),
				success : function(data) {
							return data;			
				},
				error: function (error) { 
							return error;
				}
			}); 
        }    
    }
    /* to populate Profile data */
    dataService.personInfo = function(person) {
    		var _pI="";
			try {
				var _pL = "";
				var _pAL= person.richSnippet.postaladdress.addresslocality;
				var _pAC= person.richSnippet.postaladdress.addresscountry;
				if(_pAL !=="" && _pAC !=="" && typeof _pAL!= 'undefined' && typeof _pAC!= 'undefined'){
					_pL = _pAL+", "+_pAC;
				}
				_pI+=_pL;
				} catch (err) {
				}
			try {
				try {
					var _pT = person.richSnippet.postaladdress.telephone;
					if(typeof _pT != 'undefined' ) {
						if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
							var _pTLink = _pT.replace(/[^0-9+]/g,"");
							_pT = '<a href="tel:'+_pTLink+'">'+_pT+'</a>';
						} 
						if( _pI!=""){
							_pI+=" | "+phone_key+": "+_pT;
						}else{
							_pI+=phone_key+": "+_pT;
						}
					}
				} catch (err) {
				}
				 return _pI;
			} catch (err) {
			};
    };
    /* to check if result belongs to any PDF files */
    dataService.ifInfo = function(file) {
    		try {
				if (file.fileFormat) {
					return true;
				} else {
					return false;
				}
			} catch (err) {
			}
    };
    /* to check if result belongs to any profile page */
    dataService.ifProfile = function(person) {
    		try {
				if (person.richSnippet.person) {
					return true;
				} else {
					return false;
				}
			} catch (err) {
			}
    };
    /* to check if result belongs to Offices */
    dataService.officeInfo = function(office) {
    		try {
				if (office.richSnippet.organization) {
					return true;
				} else {
					return false;
				}
			} catch (err) {
			}
    };
    /* Office telephone micro-data */
	dataService.getPhone = function(result) {
			try {
				var _oT = result.richSnippet.organization.telephone;
				var _oTNum = _oT.split(':');
				if( _oTNum[1]!=""){
					_oT = phone_key + ": " +_oTNum[1];
				}
				if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
					var _oTLink = _oTNum[1].replace(/[^0-9+]/g,"");
					_oT = phone_key + ': <a href="tel:'+_oTLink+'">'+_oTNum[1]+'</a>';	
				}
				return _oT;
			} catch (err) {
			};	
	};
	/* Office Map details */
	dataService.getMap = function(result) {
			try {
				var _oM = "https://www.google.com/maps/place/";
				_oM += result.richSnippet.postaladdress.streetaddress +"," +result.richSnippet.postaladdress.addresslocality+"," +result.richSnippet.postaladdress.addresscountry;
				return _oM;
			} catch (err) {
			};
	};
    /* to pull data if result belongs to PDF file */
    dataService.fileInfo = function(fileData) {
    		try {
					var _a = By_key+": "+fileData.richSnippet.metatags.author;
					if (fileData.richSnippet.metatags.author) {
						return _a;
					};
				} catch (err) {
			};
    };
    /* WrapInTag to change or manipulate from one tag to desired tag */
	dataService.wrapInTag = function(tag, words, text) {
		var regex = new RegExp(words, 'gi'), 
		replacement = '<' + tag + '>$&</' + tag + '>';
		var scriptString = text.replace(regex, replacement);
		//var mydiv = document.createElement("mydiv");
		//mydiv.innerHTML = scriptString;
		//return mydiv;
		return scriptString;
	};
	/* highlightSearch function to make selected text enclosed in <strong> tag */
	dataService.highlightSearch = function (text){
		return dataService.wrapInTag('strong',searchTerm, text);
	};
	/* To get the headline for each result */
	dataService.getHeadline = function(result) {
			try {
				var _h = result.richSnippet.metatags.ogTitle;			
			} catch (err) {
			};
			try{
			   return dataService.highlightSearch(_h);
			} catch (err){};
			try{
				var _h = result.titleNoFormatting;
				return dataService.highlightSearch(_h);
			} catch (err){};
			return (_h);	
	};

	/* To get the desciption for each result */
	dataService.getDescription = function(result) {
			try {
				var _t = result.richSnippet.metatags.ogDescription;
			} catch (err) {
			};
			try{
				return dataService.highlightSearch(_t);
			} catch (err){};
			
			try{
			var _t =result.contentNoFormatting;
				return dataService.highlightSearch(_t);
			} catch (err){};
			return  (_t);	
	};
	
	/* To get the URL from the response and manipulate to get the intended formatted url  for each result */
	dataService.getFormattedURL = function(result) {
			var _fu = "";
			var liteTopic = new RegExp("litetopicpage");
			try {
				_fu = result.unescapedUrl;
				var a = _fu.split("/");
				if (a.length > 8) {
					_fu = "";
					for ( var i = 2; i <= a.length; i++) {
						if (i < 5) {
							_fu += a[i] + "/";
						}
					}
					_fu += "../" + a[a.length - 1];
				}else if(liteTopic.test(a[6])){
				_fu = "";
					for ( var i = 2; i <= a.length; i++) {
						if (i < 5) {
							_fu += a[i] + "/";
						}
					}
					_fu += ".. " + a[a.length - 1].replace("litetopicpage.","");
				}
			} catch (err) {
			}
			try {
				 return dataService.highlightSearch(decodeURI(_fu));
			} catch (err) {
			};
			return decodeURI(_fu);
	};
	/** To get the Thumbnail Image for each result**/
	dataService.Thumbnail = function(result) {
			var imgsrc = "";
			try {
				imgsrc = result.richSnippet.metatags.thumbnail;
				if(imgsrc.indexOf("promo_images") > 0 && imgsrc.indexOf("/cq5dam.web") < 0){
					imgsrc = imgsrc + "/jcr:content/renditions/cq5dam.web.250.250.mobile.jpeg"
				}
			} catch (err) {
			}
			if (imgsrc === "") {
				try {
					imgsrc = result.richSnippet.cseImage.src;
				} catch (err) {
				}
			}
		/*	if (!dataService.isValidImg(imgsrc)) {
				imgsrc = "";
			} */
			return imgsrc;
	};
/*  dataService.isValidImg = function(path) {
			path = path === null ? "" : path;
			return path.indexOf("http") === 0;
	}; */

	/* replaceHash function implementation */
	dataService.ReplaceHash = function(query, facet, page, sort, flagGlobal) {
			var scope;
			if(flagGlobal == 0) {
				scope = cse_local;
				includeOption = cse_local;
			}
			else {
				scope = cse_all;
				includeOption = cse_all;
			}
			if (facet == "") {
				selectFacet = selectFacet;
			}else{
				selectFacet = facet;
			}
			var _hash = "#qr=" + encodeURIComponent(query);
			if (typeof (selectFacet) !== "undefined" && selectFacet !== "") {
				_hash += "&f=" + encodeURIComponent(selectFacet);		
			}
			if (typeof (page) !== "undefined" && !isNaN(page)) {
				_hash += "&p=" + encodeURIComponent(page);
			} else {
			}
			if (sort === "date") {
				_hash += "&s=date";
			} else {
			}
				
			if (typeof (scope) !== "undefined" && scope !== "") {
				try{
					if(scope.indexOf('-') === -1){
							scope = scope;
						} else{
							scope  = scope.split('-');
							if(scope[1]!==undefined){
								scope = scope[1];
							}else{
								scope = scope[0];		
							}
						}	
				}catch(err){		
				}  	  
				_hash += "&country=" + encodeURIComponent(scope);
			}
			window.location.hash = _hash;	
		};
		/* to show result count with facet info */
		dataService.resultCountFormatted = function() {
			try{
					var resultCount="";	
					try{
						if (rcount == 0) {
							$('#noResults').show();
						}
						else {
							$('#noResults').hide();	
						}
						resultCount=parseInt(rcount.replace(",",""),10);
						}catch(err){}
						if(resultCount>100){
							resultCount=max_results;
						}else{
							resultCount+= " "+word_results;
						}
						if(selectFacet!=="" && typeof selectFacet != undefined){
							var facetIs = selectFacet.replace("more:","");
								return facetIs.charAt(0).toUpperCase() + facetIs.slice(1)+": "+resultCount ;
						}else {
								return cse_AllResultsLabel+": "+resultCount;
						}
			}catch (err){
			}; 
		};

		/* handling 404 page closest page */
		dataService.suggestContent_404 = function(val){
            $.ajax({
                url : "https://www.googleapis.com/customsearch/v1element",
                jsonp : "callback",
                dataType : "jsonp",
                data: dataService.QueryParams(val),
                success : function(response) {
                    if((response.results != null) && (response.results.length != 0)){
                        var closestMatch = dataService.getHTMLOnlyResult(response.results);
                        //handle empty results 
                        $('a#404-suggested-link').html(closestMatch);
                        $('a#404-suggested-link').attr('href',closestMatch);
                        if(closestMatch){
                            $(".closest-match").show();
                        }                   
                    }
                }
            });
		}

		dataService.getHTMLOnlyResult = function(data){
			for (var i = 0; i < data.length; i++){
			var resultUrl= data[i].unescapedUrl;
						resultUrl = resultUrl.substring(resultUrl.length - 4,resultUrl.length);
				if(resultUrl=="html"){
					return data[i].unescapedUrl;
				}
			}
			return false;
		}
		dataService.setSort = function(sort_value) {
			sort_attribute = sort_value;
		};
		dataService.setexcludedTerm = function(value) {
			exclude_term = value;
		};
		dataService.setexactTerm = function(value) {
			exact_term = value;
		};
    return dataService;
  });	




