//additional function on top of svgs to have required features
//initiate the list of years
years = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
//combine csvs and plot the graph
//funtion to detect mouse click events in IE
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
//convert a string into proper case
function properCase(in_str) {
  in_str_lst = in_str.toLowerCase().split(' ');
  for (var i = 0; i < in_str_lst.length; i++) {
    in_str_lst[i] = in_str_lst[i].charAt(0).toUpperCase() + in_str_lst[i].slice(1);
  }
  return in_str_lst.join(' ');
}
//function to combine csvs to plot the timeline graph
function multiCsv(files, callback) {
  var results = [];
  var error = "";
  var filesLength = (files || []).length;
  var callbackInvoked = false;
  for (var i = 0; i < filesLength; i++) {
    (function(url) {
      d3.csv(url, function(data) {
         data.forEach(function(d) {
                d.year=url.replace("data/weights","").replace(".csv","")
        });
        if (data === null) {
          error += "Error retrieving \"" + url + "\"\n";
        } else {
          results.push(data);
        }
        // all files retrieved or an error occurred
        if (!callbackInvoked && (error || results.length === filesLength)) {
          if (error) {
            callback(error, null); // might want to send partial results here
          } else {
            //console.log(results);
            results_f = d3.merge(results);
            callback(null, d3.merge(results));
          }
          callbackInvoked = true;
        }
      });
    })(files[i]);

  }

}
//generate the list of filenames for timeline graph
file_list = years.map(function(i) {
  return 'data/weights' + i+".csv";
})
//function to nest the data in the required format
var nest_data=function(total_data){
  var nested_data = d3.nest()
  .key(function(d) { return d.source; })
  .key(function(d) { return d.target; })
  .rollup(function(d) {
      return d.reduce(function(prev, curr) {
        prev[curr["year"]] = curr["weight"];
        return prev;
      }, {});
    })
  .entries(total_data);
  return nested_data
}
//function to create the data in the required format to plot
var create_chart_data=function(nested_data,source){
  min=20
  max=0
  max_total=0
  nested_data.forEach(function(d){
    //console.log([d.key.replace(/ /g,"").replace(",",""),source.replace("_","")]);
    if (d.key.replace(/[\[\]. ,_]/g,"")==source.replace(/_/g,"")){

      chart_data = []
      d.values.forEach(function(t){
        obj={}
        sum=0

        obj['cat'] = t.key
        years.forEach(function(y){
          if (parseFloat(t.values[y]) < min)
            min = parseFloat(t.values[y]);
          if (parseFloat(t.values[y]) > max)
            max = parseFloat(t.values[y]);
          obj[y] = t.values[y]?parseFloat(t.values[y]):0
          sum += obj[y]
        })
        obj['total'] = sum.toFixed(2)
        if (sum > max_total)
          max_total = sum;
        chart_data.push(obj)
      });

      };
  })
  return [chart_data,max,min,max_total]
}
//calling the function to combine csvs and the data cleaning
plot_time=function(source){

  if(source=="d3plus_viz"){
    return null
  }
multiCsv(file_list, function (err, results) {
  chart_data=[]
  if (err) {
    return;
  }
  //source="POSITIVE DISPLACEMENT MACHINES FOR LIQUIDS"

  nested_data = nest_data(results)
  return_data = create_chart_data(nested_data,source)
  chart_data = return_data[0]

  lim = [return_data[1],return_data[2],return_data[3]]
  sort_data = chart_data.sort(function(a, b) {
    return  parseFloat(b.total) - parseFloat(a.total);
  });
  html = "<h6 ><label>Source: &nbsp;</label>"+properCase(source.replace(/_/g," "))+"</h6>"
  div = document.getElementById("heading")
  div.innerHTML=html
  //console.log(sort_data);
  chart(null,sort_data,lim,color_data,source)

})
};
//get the list of colors from the network chart
var getcolordata=function(){
  var color_data={}
  var cats=[]
  $('.d3plus_rect').find("rect").each(function(d,i){color_data[$(i).closest("g").attr("id").replace("d3plus_group_","").replace("_rect","")]=$(i).attr("fill");})
  $('.d3plus_rect').find("rect").each(function(d,i){cats.push($(i).closest("g").attr("id").replace("d3plus_group_","").replace("_rect","").replace(/_/g," "));})
  return [color_data,cats];
}
//time gap so that the network chart is loaded before connecting it to the timeline graph
setTimeout(link_time, 1000);
//suggestions for the search box from the list of available categories
var suggest = function(categories) {
    $( "#tags" ).autocomplete({
      source: categories
    });
  };
