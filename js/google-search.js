var scOnLoadReported = false;
var cse_local,cse_cx,cse_sig,cse_all,currentFacets;
var loadSameFacets = true;
var newSearchInstance = true;
var errorPage = $('.error-page').length;
/**
 * Site cat code to 
 * populate prop7,
 * poulate eVar49 and 
 * fire event38
 */
function reportOnLinkClick(item,link){
	var querySearched = self.getParameterByName("qr");
	/*Removes the protocol*/
	var linkWithoutQueryParams = link.replace('http://','').replace('https://','');
	/*Extracts the content path from URL*/
	linkWithoutQueryParams =  linkWithoutQueryParams.substring(linkWithoutQueryParams.indexOf("/"),linkWithoutQueryParams.lastIndexOf('.htm'));
	var pageNo = "1";
    var currentPageParam = self.getParameterByName("p");
	var linkNo = item;
	var facet = "";
    var currentFacetParam = self.getParameterByName("f");
    if(currentPageParam !== undefined && currentPageParam!== ''){
        pageNo = currentPageParam;
        linkNo = ((currentPageParam-1)*10) + item;
    }
    if(currentFacetParam !== undefined){
        if(currentFacetParam === ''){
            facet = "all";
        }else{
            facet = currentFacetParam.toLowerCase().replace('more:','');
        }
    }
    if( querySearched !== undefined && querySearched !== '') {
     var events = new Array();
     querySearched = querySearched.toLowerCase();
        
     var events = new Array();
     var data = new Object();	
     events[0] = "event38";
     data['prop7'] = querySearched;
     data['googleSearchTermLink_eVar49'] = querySearched+"|"+linkWithoutQueryParams;
     data['googleSearchTermResult_prop49'] = pageNo+"|"+linkNo+"|"+facet;

     recordSitecatEvent(events, data, "GoogleSearchResultClicked");
    }

}

/**
 * WrapInTag to change or manipulate from one tag to desired tag
 **/
var wrapInTag = function(tag, words, text) {
	var regex = new RegExp(words, 'gi'), 
	replacement = '<' + tag + '>$&</' + tag + '>';
	return text.replace(regex, replacement);
};

/**
 * highlightSearch function to make selected text enclosed in <strong> tag
 **/
var highlightSearch = function (text){
	return wrapInTag('strong',pageVM.Query(), text);
};


CSEPage = function() {
	var self = this;

	self.DoPage = function() {
		pageVM.ReplaceHash(pageVM.Query(), pageVM.Facet(), self.label(), "", false, pageVM.Cse());
	};

	self.IsActive = ko.computed(function() {
		return pageVM.Page() === parseInt(self.label(), 10);
	});

	self.IsCurrent = ko.computed(function() {
		if( pageVM.Page()=== self.label() )
		{
			return Current_page_key;
		}else{ return View_page_key ;}
	});
};

CSECursor = function() {
	var self = this;

	self.pages = ko.observableArray();
	self.resultCount = ko.observable();

	self.LoadJSON = function(data) {
		var mapping = KoMap(CSECursor);
		mapping.pages = KoMap(CSEPage);

		ko.mapping.fromJS(data, mapping, self);
	};
};

CSEFacet = function() {
	var self = this;

	self.label = ko.observable();
	self.label_with_op = ko.observable();
	self.anchor = ko.observable();
	self.count = ko.observable();

	self.DoFacet = function() {
		pageVM.ReplaceHash(pageVM.Query(), self.label_with_op(), 1, "", false, pageVM.Cse());
	};

	/** checks if the facet is active **/
	self.IsActive = ko.computed(function() {
		return pageVM.Facet() === self.label_with_op();
	});

};

/** custom event KO binded  on click for each anchor tags to track which result is being clicked**/
CSETrackResultClick = function(data, event) { 
    event.preventDefault(); 
	var count,link,redirectUrl;  
    if( $(event.target).prop("tagName")==="STRONG"){
        count=$('h2.tertiary-headline a').index($(event.target).parent())+1;
		link = $(event.target).parent().attr('href');
        redirectUrl = $(event.target).parent().attr('data-trackUrl');

    } else{
        count=$('h2.tertiary-headline a').index(event.target)+1;
        link = $(event.target).attr('href');
        redirectUrl = $(event.target).attr('data-trackUrl');
    }
	reportOnLinkClick(count,link);
    window.location = redirectUrl;
    return true;
};

CSEContext = function() {
	var self = this;

	self.facets = ko.observableArray();

	self.LoadJSON = function(data) {
		if(data.facets.length===0 && pageVM.PreviousFacets().length>0){
			data.facets = pageVM.PreviousFacets();
		}
		if(newSearchInstance){
			loadSameFacets=false;
		}
		if(!loadSameFacets){
            currentFacets=pageVM.PreviousFacets();
        }
        else{
			data.facets = currentFacets;
        }
		newSearchInstance = false;
		var mapping = KoMap(CSEContext);
		mapping.facets = KoMap(CSEFacet);

		ko.mapping.fromJS(data, mapping, self);
	};
};
CSESpelling = function() {
	var self = this;
	
	self.correctedQuery = ko.observable();
	self.originalQuery = ko.observable();
	self.type = ko.observable();
	
	self.LoadJSON = function(data) {
		var mapping = KoMap(CSESpelling);
		ko.mapping.fromJS(data, mapping, self);
	};
	
	self.TrimSuggestions = function(q){
        try{
			 var q = q.split("more:");

			return q[0];
        }catch(err){
        }

	};

    self.ShowCorrected = ko.computed(function() {
		return self.TrimSuggestions(self.correctedQuery());
	}, this);

    self.ShowOriginal = ko.computed(function() {
		return self.TrimSuggestions(self.originalQuery());
	}, this);

	self.DoCorrected = function() {

		pageVM.ReplaceHash(self.ShowCorrected(), pageVM.Facet(), 1, pageVM.Sort(), false);
	};

	self.DoIncorrect = function() {
		pageVM.ReplaceHash(self.ShowOriginal(), pageVM.Facet(), 1, pageVM.Sort(), true);
	};

	/** if the results has spelling suggestions*/
	self.HasSpelling = ko.computed(function() {
		return(typeof self.type()!=="undefined" && self.type()!=="");
	}, this);
	
	self.HasCorrected = ko.computed(function() {
		return(typeof self.type()!=="undefined" && self.type()==="SPELL_CORRECTED_RESULTS");
	}, this);
	
	self.HasIncorrect = ko.computed(function() {
		return(typeof self.originalQuery()!=="undefined" && self.originalQuery()!=="");
	}, this);
	
	self.HasDYM = ko.computed(function() {
		return(typeof self.type()!=="undefined" && self.type()==="DYM");
	}, this);

};
CSEPromotion = function() {
	var self = this;
	self.LoadJSON = function(data) {
		var mapping = KoMap(CSEPromotion);
		ko.mapping.fromJS(data, mapping, self);
	};
	/** check for Promotions/Best Bets image **/
	
	self.Isthumb = ko.computed(function() {
		try {
			if (self.image === undefined ) {
			return false;
			} else {
				return true;
			}
		} catch (err) {

		}
    });
	/** Gets the Promotions/Best Bets url**/
	self.thumbURL = ko.computed(function() {
		try {
			if (self.image === undefined ) {
			return false;
			} else {
				return(self.image.url());
				
			}
		} catch (err) {

		}
    });
	/** Gets Promotions/Best Bets body text**/
	self.BodyLines = ko.computed(function() {
		try {
		
			if (self.bodyLines().length ) {
			return self.bodyLines()[0].title();
			} else {
				return "";
				
			}
		} catch (err) {

		}
    });
};



CSEResult = function() {
	var self = this;
	
	/** Thumbnail check for each result**/
	self.HasThumbnail = ko.computed(function() {
		return self.Thumbnail() !== "";
	});
	
	/** To get the headline for each result**/
	self.Headline = ko.computed(function() {
		try {
			var _h = self.richSnippet.metatags.ogTitle();
			
		} catch (err) {
		};
		
		try{
			return highlightSearch(_h);
		} catch (err){};
		
		try{
			var _h = self.titleNoFormatting();
			return highlightSearch(_h);
		} catch (err){};
		return (_h);
	
	});
	
	/** To get the description for each result**/
	self.Teaser = ko.computed(function() {
		try {
			var _t = self.richSnippet.metatags.ogDescription();
			
		} catch (err) {
		};
		try{
			return highlightSearch(_t);
		} catch (err){};
		
		try{
		var _t =self.contentNoFormatting();
			return highlightSearch(_t);
		} catch (err){};
		return  (_t);
	});
	
	/** To get the URL for each result**/
	self.Url = ko.computed(function() {
		var _u = "";
		try {
			_u = self.unescapedUrl();
		} catch (err) {
		}

		return _u;
	});
	
	/** To get the URL from the response and manipulate to get the intended formatted url  for each result**/
	self.FormattedUrl = ko.computed(function() {
		var _fu = "";
		var liteTopic = new RegExp("litetopicpage");
		try {
			_fu = self.unescapedUrl();
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
			return highlightSearch(decodeURI(_fu));
		} catch (err) {
		};
		return decodeURI(_fu);
	});

	/** To get the Thumbnail Image for each result**/
	self.Thumbnail = ko.computed(function() {
		var imgsrc = "";
		try {
			imgsrc = self.metatags.ogImage();
		} catch (err) {
		}

		if (imgsrc === "") {
			try {
				imgsrc = self.richSnippet.cseThumbnail.src();
			} catch (err) {
			}
		}

		if (!self.isValidImg(imgsrc)) {
			imgsrc = "";
		}

		return imgsrc.trim();
	});

	self.isValidImg = function(path) {
		path = path === null ? "" : path;
		return path.indexOf("http") === 0;
	};

	/**
	 * Profiles micro-data for 
	 * 1. Persons-City name, country name followed by phone  number
	 * 2. Office - Phone number followed by link to view map for the address
	 * 3. PDF - Author name 
	 * **/
	
	
	 /** checks if result has Person micro-data*/
	 self.Person = ko.computed(function() {

		try {

			if (self.richSnippet.person()) {

				return true;
			} else {
				return false;
			}
		} catch (err) {

		}

	});
	
	 /** Profiles micro-data*/
	self.Personinfo = ko.computed(function() {
		var _pI="";
		try {
            var _pL = "";
            if(self.richSnippet.postaladdress.addresslocality()!=="" && self.richSnippet.postaladdress.addresscountry()!==""){
				_pL = self.richSnippet.postaladdress.addresslocality()+", "+self.richSnippet.postaladdress.addresscountry();
            }
				_pI+=_pL;
            } catch (err) {
            }
        try {


			try {
				var _pT = self.richSnippet.postaladdress.telephone();
				if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
					var _pTLink = _pT.replace(/[^0-9+]/g,"");
					_pT = '<a href="tel:'+_pTLink+'">'+_pT+'</a>';
				} 
                if( _pI!=""){
                	_pI+=" | "+phone_key+": "+_pT;
                }else{
					_pI+=phone_key+": "+_pT;
                }

            } catch (err) {
            }

			return _pI;

		} catch (err) {

		};
		

	});
	/** Office  micro-data*/
	self.Office = ko.computed(function() {
		
		try {
			
			if (self.richSnippet.organization) {
				return true;
			} else {
				return false;
			}
		} catch (err) {

		}
    });
	
	/** Office telephone micro-data*/
	self.OfficeTelephone = ko.computed(function() {
		try {
			var _oT = self.richSnippet.organization.telephone();
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
    });
	
	/** building google maps link using address micro-data*/
	self.OfficeMap = ko.computed(function() {
		try {
			var _oM = "https://www.google.com/maps/place/";
			_oM += self.richSnippet.postaladdress.streetaddress() +","
				+self.richSnippet.postaladdress.addresslocality()+","
				+self.richSnippet.postaladdress.addresscountry();
			return _oM;

		} catch (err) {

		};
    });
	
	/** Files data micro-data*/
		self.isFile = ko.computed(function() {
		
		try {
			
			if (self.fileFormat) {
				return true;
			} else {
				return false;
			}
		} catch (err) {

		}
    });
		/** Author name micro-data*/
		self.Author = ko.computed(function() {
			try {
				var _a = By_key+": "+self.richSnippet.metatags.author();
				return _a;

			} catch (err) {

			};
	    });
	

};

KoMap = function(objType) {
	return {
		create : function(options) {
			var item = new objType();
			ko.mapping.fromJS(options.data, {}, item);
			return item;
		}
	};
};

var SearchModel = function() {
	var self = this;

	self.context = ko.observable();
	self.cursor = ko.observable();
	self.promotions = ko.observableArray();
	self.spelling = ko.observable();
	self.results = ko.observableArray();

	self.Sort = ko.observable("");
	self.Query = ko.observable("");
	self.Facet = ko.observable("");
	self.PreviousFacets = ko.observableArray("");
	self.Page = ko.observable(1);
	self.PageSize = ko.observable(10);
	self.Cse = ko.observable(cse_local);
	self.Force = ko.observable(false);

	self.Global = ko.observable(false);
	self.ToggleContext = function(data, event){
		if (self.Global()) {
			self.Cse(cse_all);
			self.ReplaceHash(self.Query(), "", 1, self.Sort(), false, cse_all);

		} else {
			self.Cse(cse_local);
			self.ReplaceHash(self.Query(), "", 1, self.Sort(), false, cse_local);

		}
		return true;
	};

    /*self.Toggle = function(data, event ) {

        $(event.target).val($(event.target).val() == 'local'? 'all' : 'local');
        if($('#globalresults').val()=='local'){
			self.ReplaceHash(self.Query(), "", 1, self.Sort(), false, cse_local);
        }else{
			self.ReplaceHash(self.Query(), "", 1, self.Sort(), false, cse_all);
        }

    };*/

	self.QueryWithFacet = ko.computed(function() {
		if (self.Facet() !== "") {
			loadSameFacets = true;
			return self.Query() + " " + self.Facet();
		} else {
			loadSameFacets = false;
			return self.Query();
		}
	});

	self.Start = ko.computed(function() {
		return parseInt(self.Page(), 10) * parseInt(self.PageSize(), 10);
	});

	self.ResultCount = ko.computed(function() {
		if (typeof (self.cursor()) === "undefined") {
			return 0;
		} else {
			try {
				return parseInt(self.cursor().resultCount().replace(/\,/g, ''),
						10);
			} catch (err) {
			}
			return 0;
		}
	});


	/** Result count formatted with :facet name*/
	self.ResultCountFormatted = ko.computed(function() {
        try{
	        if (typeof (self.cursor()) === "undefined") {
				return 0;
			} else {
	        	var rcount="";
	        	
	        	try{
	        		rcount=parseInt(self.cursor().resultCount().replace(",",""),10);

	        	}catch(err){}

	        	if(rcount>100){
	        		rcount=max_results;
                }else{
					rcount+= " "+word_results;
                }

				if(self.getParam("f")!==""){
                    var facetIs = self.getParam("f").replace("more:","");
						return facetIs.charAt(0).toUpperCase() + facetIs.slice(1)+": "+rcount ;
					}else {
						return cse_AllResultsLabel+": "+rcount;
	                }
			}
        }catch (err){
        };
	});
	
	/** checks if the search has results*/
	self.HasResults = ko.computed(function() {
		return self.ResultCount() > 0;
	}, this);
	self.HasFacets = ko.computed(function() {
		try{
			return self.context().facets().length > 1;
			}catch(err){};
	}, this);

	/** No results*/
	self.NoResults = ko.computed(function() {
		return !self.HasResults();
	}, this);

	/** if the results has Promotions*/
	self.HasPromotions = ko.computed(function() {
		return self.promotions().length > 0;
	}, this);
		

	/** get the active current search configuration (member firm level vs. include all member firms)*/
	self.SelectedCse = ko.computed(function() {
		return cse_cx + self.Cse();
	});

	/** replace hash values to rest the the search parameters*/
	self.ReplaceHash = function(query, facet, page, sort, force, scope) {
		self.Query(query);
		self.Facet(facet);
		var _hash = "#qr=" + encodeURIComponent(query);
		if (typeof (facet) !== "undefined" && facet !== "") {
			_hash += "&f=" + encodeURIComponent(facet);
        
        }
		if (typeof (page) !== "undefined" && !isNaN(page)) {
			self.Page(parseInt(page, 10));
			_hash += "&p=" + encodeURIComponent(page);
		} else {
			self.Page(1);
		}
		if (sort === "date") {
			self.Sort("date");
			_hash += "&s=date";
		} else {
			self.Sort("");
		}
		
		if(force===true){
			self.Force(true);
			_hash += "&fr=1";
		}else{
			self.Force(false);
			_hash += "&fr=0";
		}
		
		if (typeof (scope) !== "undefined" && scope !== "") {
			try{
				if(scope.indexOf('-') === -1){
						scope = scope;
					}else{
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

		/*self.Search();*/
	};
	
	/** Sort by date out of scope in US1698*/
	self.SortDate = function() {
		self.ReplaceHash(self.Query(), self.Facet(), self.Page(), "date", false, self.Cse());
	};

	self.SortRelevance = function() {
		self.ReplaceHash(self.Query(), self.Facet(), self.Page(), "", false, self.Cse());
	};

	/** Search box submit events are binided to this function*/
	self.searchOnSubmit = function(data,event) {
					
        self.Cse(cse_local);

        var query = $('#gSearch').val();
		if (resultsPage) {
			if ((query !== "") && ($('#gSearch').attr('placeholder') !== query)) {
				/*location.hash = "#qr=" + encodeURIComponent(query);*/
				self.ReplaceHash(query, "", 1, self.Sort(), false, self.Cse());
			} else {
				$('#gSearch').focus();
				return false;

			}
		} else if (errorPage) {
            if(data=='404Search'){
                query = $('#404Search').val();
                if (query !== "" && ($('#404Search').attr('placeholder') !== query)) {
                    location.href = searchLocation + "#qr=" + encodeURIComponent(query);
                }
                else{
                    $('#404Search').focus();
                    return false;
                }

            }else{
                if (query !== "" && ($('#gSearch').attr('placeholder') !== query)) {
					location.href = searchLocation + "#qr=" + encodeURIComponent(query);
                }else{
					$('#gSearch').focus();
                    return false;
                }
            }
        } else {
            	if (query !== "" && ($('#gSearch').attr('placeholder') !== query)) {
					location.href = searchLocation + "#qr=" + encodeURIComponent(query);
                }else{
					$('#gSearch').focus();
                    return false;
                }
		}
	};
	/** initiates the search*/
	self.DoSearch = function() {
		var query = self.Query();
		self.ReplaceHash(query, self.Facet(), self.Page(), self.Sort(), false);
	};

	var searchTermTyped = "";
	self.UpdateSearchTerm = function(data, event){
		searchTermTyped=event.currentTarget.value;
	};
	
		/** initiates the search*/
	self.TypeaheadUpdater = function (item) {
		if(item !== undefined){
			if(item.match(/^http([s]?):\/\/.*/)){
				//jumpp to promotions page directly
				window.location = item;
				
			}else{
				$('input.gsc-input').val(item);
				pageVM.searchOnSubmit();
			}
		}else{
			/*when hit enter without choosing suggestions*/
			$('input.gsc-input').val(searchTermTyped);
			pageVM.searchOnSubmit();
			return searchTermTyped;
		}
	};
	
	self.TypeaheadSource = function (query, process) {
	  $.ajax({
		url: 'https://clients1.google.com/complete/search',
		jsonp: "callback",
		type: 'POST',
		dataType: "jsonp",
		data: {
			q: query,
			client: "partner",
			hl: cse_hl,
			partnerid: cse_cx + cse_local,
			sugexp: "gsnos%2Cn%3D13",
			gs_rn: 25,
			gs_ri: "partner",
			types: "t",
			ds: "cse",
			cp: 3,
			gs_id: 0
		},
		success: function(results, status) {
			var fragPromos = document.createDocumentFragment();
			if(status==="success"){
				var words = [],suggestions=results[1];
				$.each(suggestions, function(index, value){
					if(value[3] !== undefined && value[3].a !==""){
							  var promotion =  value[3].a; 
							  var promoItem = document.createElement('li');
							  
							  //if has image in promo
							  if(value[3].c!==""){
								  $(promoItem).append('<img src="'+ value[3].c+'"/>');
                              }else{
								 $(promoItem).append('<div>&nbsp;</div>');
                              }
							 $(promoItem).addClass('promotions').attr('data-value',value[3].b);
							  $(promoItem).append('<p><a href="'+value[3].b+'">'+promotion+'</a>'+value[3].d+'</p>');
							 $(fragPromos).append(promoItem);

						}else{
								
								words.push(value[0]);
							};

				});
		  }
		  process(words);
		  $('#gSearchForm ul.typeahead').append(fragPromos);
		  $('#gSearchForm ul.typeahead').css({
			  'width': $('.gsc-input').outerWidth(true)+'px'
		  });

		}
	  });
	};

	/** Loading function to do pre loading UI manipulations*/
	self.loading = function() {

		$('.wrapper').css({
			"opacity" : '0.5'
		});
		$('#floatingCirclesG').fadeIn("slow");
		if(self.HasFacets()){
			$('.content-filters').fadeIn("slow");
			}
       $('#noResults').css({"margin":"9999px"});


	};
	
	self.QueryParams = function(){
		var queryParams =  {
			key : cse_key,
			hl : cse_hl,
			sig : cse_sig,
			cx : self.SelectedCse(),
			q : self.QueryWithFacet(),
			num : self.PageSize(),
			start : self.Start()-10,
			sort : self.Sort(),
			noncache : new Date().getTime(),
			prettyPrint : "false",
			rsz : "filtered_cse"
		};

		if(self.Force()===true){
			queryParams.nfpr = 1;
		}
		
		return queryParams;
	};
	
	/** Search using Google API using AJAX.*/
	self.Search = function() {
		if (self.Query() !== "") {

           

			self.loading();
			$.ajax({
				url : "https://www.googleapis.com/customsearch/v1element",
				jsonp : "callback",
				dataType : "jsonp",
				data: self.QueryParams(),
				success : function(response) {
					var allFacet = new CSEFacet();
					allFacet.label("");
					allFacet.label_with_op("");
					allFacet.anchor(cse_AllResultsLabel);
					allFacet.count(0);
					
					if(typeof response.context!=="undefined" && typeof response.context.facets!=="undefiend" && response.context.facets.length>0){
						pageVM.PreviousFacets(response.context.facets);
					}
					
					var ctx = new CSEContext();
					ctx.LoadJSON(response.context);
					ctx.facets().splice(0, 0, allFacet);
					self.context(ctx);

					
					var csr = new CSECursor();
					
					csr.LoadJSON(response.cursor);
					
					self.cursor(csr);
					var spl = new CSESpelling();
					if (response.spelling) {
						spl.LoadJSON(response.spelling);
					}
					self.spelling(spl);

					if (response.promotions) {
						$(".promotions").css({"display":"block"});
						ko.mapping.fromJS(response.promotions,
					 			KoMap(CSEPromotion), self.promotions);
                    }else{
						 $('.promotions').css({"display":"none"});
                    }

                    if (response.results) {
						ko.mapping.fromJS(response.results, KoMap(CSEResult),
								self.results);
					}

					self.searchResultsReady();
				}
			});
        }
    };
    self.getHTMLOnlyResult = function(data){
        for (var i = 0; i < data.length; i++){

		var resultUrl= data[i].unescapedUrl;
					resultUrl = resultUrl.substring(resultUrl.length - 4,resultUrl.length);
            if(resultUrl=="html"){
            	return data[i].unescapedUrl;
            }
        }

        return false;

    }

    self.suggestContent_404 = function(query){
    	self.Query(query);
    	$.ajax({
			url : "https://www.googleapis.com/customsearch/v1element",
			jsonp : "callback",
			dataType : "jsonp",
			data: self.QueryParams(),
			success : function(response) {
				var allFacet = new CSEFacet();
				allFacet.label("");
				allFacet.label_with_op("");
				allFacet.anchor(cse_AllResultsLabel);
				allFacet.count(0);
				if((response.results != null) && (response.results.length != 0)){
					var closestMatch = self.getHTMLOnlyResult(response.results);
					//handle empty results 
					$('a#404-suggested-link').html(closestMatch);
					$('a#404-suggested-link').attr('href',closestMatch);
                    if(closestMatch){
						$(".closest-match").show();
                    }                   
				}
			}
		});
    };

    /** Init the search configs on the page load*/
	self.SetSearchParams = function(){
		self.Query(self.getParam("qr"));
		self.Facet(self.getParam("f"));
		var page = self.getParam("p");
		if (page !== "" && !isNaN(page)) {
			self.Page(parseInt(page, 10));
		}
		if (self.getParam("s") === "date") {
			self.Sort("date");
		}
		if (self.getParam("fr") === "1") {
			self.Force(true);
		}
		if (self.getParam("country") == "All") {
			self.Cse(cse_all);
			self.Global(true);
		}else{
 			self.Cse(cse_local);
			self.Global(false);
		}	
	};
	
    /** Init the search configs on the page load*/
	self.init = function() {
		self.SetSearchParams();		
		self.Search();


	};

	/** Utility function to Get URL paramenters set by Hashing*/
	self.getParam = function(param) {
		var regex = new RegExp("[\\?#&]" + param + "=([^&#]*)"), results = regex
				.exec(location.search);
        results = (results == null ? regex.exec(location.hash) : results);
		return results == null ? "" : decodeURIComponent(results[1].replace(
				/\+/g, " "));
	};

	/** Function to do post rendering logics and UI manipulations */
	self.searchResultsReady = function() {

		if(self.Query() !== ""){

			$('#gSearch').val(self.getParam("qr"));
			/*DE1715*/
            var titleFragment = document.createDocumentFragment();
			$(titleFragment).append(results_for).append(' &quot;');
            var span = document.createElement('span');
            $(span).addClass('query-term').text(self.getParam("qr"));
			$(titleFragment).append(span).append('"');
            $('.primary-headline').empty().append(titleFragment);

        }

         document.title = $('.primary-headline').text();
        $('.search-sorting').show();
		$('.primary-headline').show();

		if (self.NoResults()) {
			
           $('#noResults').css({"margin":"0"});
            $('#noResults').fadeIn("slow");
		}
		$('#floatingCirclesG').fadeOut("slow");
		$('.all-search-results').fadeIn("slow");

		$('.wrapper').css({
			"opacity" : '1'
		});

        window.scrollTo(0, 0);
        
        /**
	     * Site cat code to 
	     * populate prop7,
	     * fire event14 and
	     * fire event39
	     */

        if(!scOnLoadReported){

		var querySearched = self.getParam("qr");
		var events = new Array();
	    var data = new Object();

            if( querySearched != undefined && querySearched != '') {
                 querySearched = querySearched.toLowerCase();
                 events[0] = "event14";

                    if (self.NoResults()) {
                         events[0] = "event39";
                        
                    }	

                    data['prop7'] = querySearched;

                    recordSitecatEvent(events, data, "GoogleSearchResultsLoaded");
    
            }

            scOnLoadReported =true;
        }

	};

};
var pageVM = new SearchModel();
$(document).ready(function() {

	pageVM.init();
	ko.applyBindings(pageVM);

   	$(window).on('hashchange', function() {
        scOnLoadReported = false;
		 pageVM.init();

	});
	if(errorPage){ //404 page do some suggestions
			/* start updating the script for legacy URLs*/

		  		if(window.location.href.indexOf("view") > -1){
		  		var path = window.location.pathname;
	   	   	  	var index = path.split("/");
	   	   	  	path = index[index.length - 2];
	   	   	  	path = path.replace(/-/g,' ');
	      		var keywordToSearch = decodeURIComponent(path.replace(/\/+/g, ' ').trim());
	      		//console.log('converted path name to keyword: ',keywordToSearch);
	      		pageVM.suggestContent_404(keywordToSearch);
	      		//pageVM.suggestContent_404('TMT');
	     /*update the below condition with "www2 instead of "us". This is for AEM / CQ */
	   		//}else if(window.location.href.indexOf("us") > -1){
	   	  }else if(window.location.href.indexOf("www2") > -1){
	   			var path = window.location.pathname;
	   	   		var index = path.split("/");
	      		path = index[index.length - 1];
	      		path = path.replace('.html','');
	      		path = path.replace(/-/g,' ');
	      		var keywordToSearch = decodeURIComponent(path.replace(/\/+/g, ' ').trim());
	      		//console.log('converted path name to keyword: ',keywordToSearch);
	      		pageVM.suggestContent_404(keywordToSearch);
	      		
	   		}
		  	/* end updating the script for legacy URLs*/
	}
});
