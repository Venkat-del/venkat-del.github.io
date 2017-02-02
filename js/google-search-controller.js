angular.module('googleSearch').controller('searchOnSubmit', function($scope, $sce, dataService, $http, $compile, limitToFilter){
    var searchLocation = document.location;
    $scope.SearchResults = '';
    $scope.dataService = dataService;
    $scope.facets = {};
    $scope.query;
    /* the function that gets triggered through search box */
    $scope.search = function() {
        $scope.query = angular.element('#gSearch').val();
        dataService.Page(0);
        /* to check for results page */
        if (resultsPage) {
            if (($scope.query !== "") && ($('#gSearch').attr('placeholder') !== $scope.query)) {
                 location.href = searchLocation + "#qr=" + encodeURIComponent($scope.query);
            } else {
                $('#gSearch').focus();
                return false;
            }
        } else {
                if ($scope.query !== "" && ($('#gSearch').attr('placeholder') !== $scope.query)) {
                    location.href = searchLocation + "#qr=" + encodeURIComponent($scope.query);
                }else{
                    $('#gSearch').focus();
                    return false;
                }
        }
        dataService.setSort('');
        $scope.callGoogleAPI($scope.query, 'false');
    };
    $scope.callGoogleAPI = function(query, checkResult){

        dataService.gSearch(query)
            .success(function (data) {
                    if(jQuery.isEmptyObject($scope.facets)) {
                        $scope.facets = data.context.facets;
                        $scope.pagination(data.cursor.pages);
                    }
                    if(checkResult == 'true'){
                        $scope.pagination(data.cursor.pages);
                    }
                    $scope.SearchResults = data.results;
                    $scope.promotions = data.promotions;
                    $scope.count = data.cursor.resultCount;
                    $scope.spelling = data.spelling;
                    dataService.setData($scope.query, $scope.count);
                    $scope.$apply();        
            })
            .error(function (error) {
                        console.log(error);
            }); 
    };
    $scope.pagination=function(pages){
        $scope.pages = pages;
        $scope.$apply(); 
    }; 
    $scope.hasSuggestions = function(spelling) {
        if(spelling)
            return true;
        else
            return false;
    };
    $scope.personInfo = function(person) {
        return dataService.personInfo(person);
    };
    $scope.fileInfo = function(fileData) {
        return dataService.fileInfo(fileData);
    }; 
    $scope.ifFile = function(file) {
        return dataService.ifInfo(file);
    };
    $scope.ifOffice = function(office) {
        return dataService.officeInfo(office);
    };
    $scope.ifProfile = function(person) {
        return dataService.ifProfile(person);
    };
    $scope.getHeadline = function(result) {
        return dataService.getHeadline(result);
    };
    $scope.getDescription = function(result) {
        return dataService.getDescription(result);
    };
    $scope.getURL = function(result) {
        return dataService.getFormattedURL(result);
    };
    $scope.getImageThumbnail = function(result) {
        return dataService.Thumbnail(result);
    };
    $scope.getPhone = function(result) {
        return dataService.getPhone(result);
    };
    $scope.getMap = function(result) {
        return dataService.getMap(result);
    };
    /* function to handle facet request */
    $scope.doFacet = function(facet,e) {
        dataService.setSort('');
        dataService.Page(0);
        dataService.Facet(facet);
        if(angular.element("#globalresults").is(":checked"))
        dataService.ReplaceHash($scope.query,facet, 1, "", 1);
        else
        dataService.ReplaceHash($scope.query,facet, 1, "", 0);
        $scope.callGoogleAPI($scope.query, 'true');
        angular.element(".facet-btn").removeClass("btn-blue").addClass("btn-white");
        if(angular.element(".content-button:contains('PDFs')").hasClass("btn-blue")){
            angular.element(e.currentTarget).removeClass("btn-white").addClass("btn-blue");
            angular.element(".content-button:contains('PDFs')").removeClass("btn-blue");
        }
        else {
            if(dataService.getFacet() == "more:pdfs"){
                angular.element(".facet-btn:contains('All')").addClass("btn-blue");
            }
          //  angular.element(".facet-btn:contains('All')").addClass("btn-blue");
            angular.element(e.currentTarget).removeClass("btn-white").addClass("btn-blue");
        }
    };
    /* function to handle facet request */
    $scope.searchGlobal = function(e,domain) {
        dataService.setSort('');
        dataService.Page(0);
        if (domain == "all") {
            dataService.ReplaceHash($scope.query,"", 1, "", 1);
            $("#globalresults").attr("checked","true");
            $("#localresults").removeAttr("checked");
        }
        else{
            dataService.ReplaceHash($scope.query,"", 1, "", 0);
            $("#localresults").attr("checked","true");
            $("#globalresults").removeAttr("checked");
        }
        $scope.callGoogleAPI($scope.query, 'true');
    };
    /* function to handle pagination request */
    $scope.doPage = function(page,e) {
        dataService.Page(page-1);
        if(angular.element("#globalresults").is(":checked"))
        dataService.ReplaceHash($scope.query,'', page, "", 1);
    else
        dataService.ReplaceHash($scope.query,'', page, "", 0);
        angular.element('body, html').animate({scrollTop : angular.element('.content-filters').offset().top},500); 
        $scope.callGoogleAPI($scope.query, 'false');
        angular.element('#includeGlobal').focus().attr('tabindex','0');
    };
    /* to handle search option for suggestions */
    $scope.searchSuggestion = function(query) {
        dataService.Page(0);
        dataService.ReplaceHash(query,'', 1, "", 0);
        $scope.callGoogleAPI(query, 'false');
    };
    $scope.resultCount = function() {
        return dataService.resultCountFormatted();
    };
    $scope.reset = function() {
        dataService.Facet('');
        dataService.ReplaceHash($scope.query,'', 1, "", 0);
        angular.element(".content-button:contains('PDFs')").removeClass("btn-blue");
        angular.element(".facet-btn").removeClass("btn-blue").addClass("btn-white");
        angular.element(".facet-btn:contains('All')").addClass("btn-blue");
        $scope.callGoogleAPI($scope.query, 'false');  
    };
    $scope.getAutoResult = function(value) {
        return $http.jsonp("https://clients1.google.com/complete/search?callback=JSON_CALLBACK&q="+value+"&client=partner&h1="+cse_hl+"&partnerid=008113462624956073801%3ADcom-Global&sugexp=gsnos%252Cn%253D13&gs_rn=25&gs_ri=partner&types=t&ds=cse&cp=3&gs_id=0").then(function(response){
          var fragPromos = document.createDocumentFragment();
          var words = [],suggestions=response.data[1];
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
          angular.element("#gSearchForm ul.dropdown-menu li:has('img')").remove();
          angular.element('#gSearchForm ul.dropdown-menu').append(fragPromos);
          return limitToFilter(words, 5);
        }); 
    };
    $scope.onSelect = function ($item, $model, $label) {
        $scope.$item = $item;
        $scope.$model = $model;
        $scope.$label = $label;
        $scope.query = $item;
        dataService.ReplaceHash($scope.query,"", 1, "", 0);
        $scope.callGoogleAPI($item,'true');
    };
   
 /*   $scope.getAutoResult = function(value) {
      //  var value = $('#gSearch').val();
        if (value) {
        //    dataService.getAutoResult(value);
         return $.ajax({
            url: 'https://clients1.google.com/complete/search',
            jsonp: "callback",
            type: 'POST',
            dataType: "jsonp",
            data: {
                q: value,
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
                    var autoCount = 1;
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
                                 if(autoCount<=5){
                                    //    var promoItem = document.createElement('li');
                                     //   $(promoItem).attr('data-value',value[0]);
                                     // var autoResult = angular.element("<a ng-click=" + $scope.callGoogleAPI(value[0].replace(/\s/g, '')) + ">"+value[0]+'</a>');
                                     //   var autoResult = angular.element("<a href='#'>"+value[0]+'</a>');
                                     //   var linkFn = $compile(autoResult);
                                     //   var element = linkFn($scope);
                                     //   $(promoItem).append(element); 
                                     //   $(words).append(promoItem);
                                     words.push(value[0]);
                                        autoCount++;
                                 }
                        };
                    });
                    console.log(results);
                    console.log(words);
                    return results[1].map(function(item){
                        return item.;
                      }); 
                    return words;
                   
              }
              $('#gSearchForm ul.dropdown-menu').empty().append(words);
              $('#gSearchForm ul.dropdown-menu').append(fragPromos); 
              $('#gSearchForm ul.dropdown-menu').show().css("width","84%");
            }
          });
        };
    };
    */
    $scope.suggestContent_404 = function(query){
            return dataService.suggestContent_404(query);     
    };
    var errorPage = "false";
    if(errorPage){ //404 page do some suggestions

                    if(window.location.href.indexOf("view") > -1){
                    var path = window.location.pathname;
                    var index = path.split("/");
                    path = index[index.length - 2];
                    path = path.replace(/-/g,' ');
                    var keywordToSearch = decodeURIComponent(path.replace(/\/+/g, ' ').trim());
                    $scope.suggestContent_404(keywordToSearch);
              }else if(window.location.href.indexOf("www2") > -1){
                    var path = window.location.pathname;
                    var index = path.split("/");
                    path = index[index.length - 1];
                    path = path.replace('.html','');
                    path = path.replace(/-/g,' ');
                    var keywordToSearch = decodeURIComponent(path.replace(/\/+/g, ' ').trim());
                    $scope.suggestContent_404(keywordToSearch);
                    
                }else if(window.location.href.indexOf("lg/en") > -1){
                    var path = window.location.pathname;
                    var index = path.split("/");
                    path = index[index.length - 1];
                    path = path.replace('.html','');
                    path = path.replace(/-/g,' ');
                    var keywordToSearch = decodeURIComponent(path.replace(/\/+/g, ' ').trim());
                    $scope.suggestContent_404(keywordToSearch);

                }else if(window.location.href.indexOf("re/ro") > -1){
                    var path = window.location.pathname;
                    var index = path.split("/");
                    path = index[index.length - 1];
                    path = path.replace('.html','');
                    path = path.replace(/-/g,' ');
                    var keywordToSearch = decodeURIComponent(path.replace(/\/+/g, ' ').trim());
                    $scope.suggestContent_404(keywordToSearch);             
                }                  
        }
        
        /* Advanced Search */
     /*   $scope.ifPDF = function() {
            if(dataService.getFacet() == "more:pdfs")
                return true;
            else
                return false;
        };
        $scope.sort_pdfs = function(e){
            dataService.setSort('date'); 
            dataService.ReplaceHash($scope.query,"more:pdfs", 1, "date",0);
            $scope.callGoogleAPI($scope.query,'false');
       }; */
       // https://www.google.com/cse?cx=[CSEID]&output=xml&q=animal+more:pagemap:myprivate12345-document-rating&pgmpk=myprivate12345
   /*     $scope.sort_Date_Topic = function(){
                dataService.setSort('date');
                $scope.callGoogleAPI($scope.query,'false');
              //   https://www.google.com/cse?cx=000525776413497593842:aooj-2z_jjm&q=comic+con&sort=date-sdate:a
              //https://cse.google.com/cse?cx=008113462624956073801%3ADcom-Global&q=deloitte+more%3Aarticles&sort=date:a#gsc.tab=0&gsc.q=deloitte%20more%3Aarticles
        };
        $scope.sort_Date_Article = function(e){
            if(angular.element(e.currentTarget).hasClass("active")){
                dataService.setSort('date:a');
                angular.element(e.currentTarget).removeClass("active");
            }
            else {
                dataService.setSort('date:d');
                angular.element(e.currentTarget).addClass("active");
            }  
            dataService.ReplaceHash($scope.query,"", 1, "date",0);
            $scope.callGoogleAPI($scope.query,'false');
       };
        $scope.ifArticle = function() {
            if(dataService.getFacet() == "more:articles")
                return true;
            else
                return false;
        }; 
       $scope.setexcludedTerm = function() {
            var value = angular.element('#excludeSearch').val();
            dataService.setexcludedTerm(value);
            $scope.callGoogleAPI($scope.query, 'false');
        };
        $scope.setexactTerm = function() {
            var value = angular.element('#exactSearch').val();
            dataService.setexactTerm(value);
            $scope.callGoogleAPI($scope.query, 'false');
        }; */
        $scope.selectedItemChanged = function(){
            if($scope.selectSort == 'Date'){
                dataService.setSort('date');
                dataService.ReplaceHash($scope.query,"", 1, "date",0);           
            }
            else{
                dataService.setSort('');
                dataService.ReplaceHash($scope.query,"", 1, "",0);
            }
            $scope.callGoogleAPI($scope.query,'false');
        }
});
