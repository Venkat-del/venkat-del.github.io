  //functions related to network chart
years = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
  //get the year filter value
  myVar = document.getElementById('languages').value;

  //function to connect the timegraph with the network chart using event listeners
  var link_time = function(){
    jQuery.each($("#d3plus_viz"),function(i,k){
    k.addEventListener('click',function(d){
      //console.log(d);
      var m = d&& d.target; r_n = $(m).closest("g").attr("id").replace("d3plus_group_","").replace("_rect","");plot_time(r_n,color_data);
      })
    })

    eventFire(document.getElementById("d3plus_group_EARTH_DRILLING_eg_DEEP_DRILLING__rect"), 'click');
    input_data = getcolordata()
    color_data = input_data[0]
    suggest(input_data[1])
    document.getElementById("auto").onclick = function fun()
      {
     cat = document.getElementById("tags").value;
     if(document.getElementById("d3plus_group_"+cat.replace(/ /g,"_")+"_rect"))
      eventFire(document.getElementById("d3plus_group_"+cat.replace(/ /g,"_")+"_rect"), 'click');
     document.getElementById("tags").value = "";
    }

  }



  // function to plot the network chart
  function load_chart(myVar){
  document.getElementById("viz").innerHTML = ""
  var visualization = d3plus.viz()
    .container("#viz")  // container DIV to hold the visualization
    .type("network")    // visualization type
    .data("data/size"+myVar+".csv", filetype=".csv")  // sample dataset to attach to nodes
    .nodes("data/nodes"+myVar+".csv")   // x and y position of nodes
    .edges("data/weights"+myVar+".csv") // list of node connections
    .edges({"arrows": 5})
    .edges({"large":20})
    .focus({
     "tooltip" : false
   })
   .height(412)
    .size("size")       // key to size the nodes
    .id("name")         // key for which our data is unique on
    .draw()
  setTimeout(link_time, 1000);           // finally, draw the visualization!
  }
  load_chart(myVar)
  //function to load the chart whenever the window size changes
  $(window).resize(function() {
  load_chart(document.getElementById('languages').value)

  });
  window.onload = function() {


  plot_time("EARTH_DRILLING_eg_DEEP_DRILLING_",color_data);

};


  ///intiating the timeline chart

  //declaring the margins and sizes of the charts
  var margin = {top: 25, right: 200, bottom: 0, left: 15},
    width = 500,
    height = 400;
  //declring the scale for axes and values
  var c = d3.scale.category10();
  var x = d3.scale.linear()
    .range([0, width+25]);

  var vx = d3.scale.linear()
    .domain([0,9])
    .range([width/11, width- (width/11)*2]);
  //decalring the axis
  var xAxis = d3.svg.axis()
    .scale(vx)
    .ticks(10)
    .tickFormat(function(d) { return years[d]; })
    .orient("top");
  //declaring the svg for the time line graph
  var svg = d3.select("#time").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("preserveAspectRation","xMidYMin")
    .attr("viewBox","10 0 "+(width + margin.right )+" "+(height + margin.top + margin.bottom))
    .style("margin-left", margin.left + "px")
    .style("width","100%")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  //function to truncate the string
  function truncate(str, maxLength, suffix) {
    if(str.length > maxLength) {
      str = str.substring(0, maxLength + 1);
      str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
      str = str + suffix;
    }
    return str;
  }

  //function to display the values on hover
  function mouseover(p) {
    var g = d3.select(this).node().parentNode;
    d3.select(g).selectAll("circle").style("display","none");
    d3.select(g).selectAll("text.value").style("display","block");
  }

  //function to revert circles back on hover out
  function mouseout(p) {
    var g = d3.select(this).node().parentNode;
    d3.select(g).selectAll("circle").style("display","block");
    d3.select(g).selectAll("text.value").style("display","none");
  }

  //function to draw th chart with the given parameters
  var chart = function(error, data,lim,color_data,source) {
    //console.log(data)
    //cleanup:change string (from CSV) into number format

    svg.selectAll('*').remove();
    if(sort_data.length > 1){
    top_per = parseInt((sort_data[0]['2015'] - sort_data[0]['2006'])*100/sort_data[0]['2006'])
    next_top = parseInt((sort_data[1]['2015'] - sort_data[1]['2006'])*100/sort_data[1]['2006'])
    html = "<h6> The chart shows the variation of 'flow of patents' from the given source over the years. The top two desinations are: </br> &emsp;&emsp;1."+properCase(sort_data[0].cat.replace(/_/g," "))+" ("+top_per+"% increase from 2006 to 2015)</br> &emsp;&emsp;2."+properCase(sort_data[1].cat.replace(/_/g," "))+" ("+next_top+"% increase from 2006 to 2015)</br>"
    }
    else if (sort_data.length == 1){

      top_per = parseInt((sort_data[0]['2015'] - sort_data[0]['2006'])*100/sort_data[0]['2006'])
      html = "<h6> The chart shows the variation of 'flow of patents' from the given source over the years. The top two desinations are: </br> &emsp;&emsp;1."+properCase(sort_data[0].cat.replace(/_/g," "))+" ("+top_per+"% increase from 2006 to 2015)</br>"

      }
    else{
      html = "<h6> Sorry, we do not have any data to show for this particular category </h6>"
    }
    div = document.getElementById("det_tm")
    div.innerHTML=html
    properties = d3.keys(data[0]);
    jQuery.each(data, function(i, d){
      jQuery.each(properties,function(j,p){
        if (d[p] == "") {
          d[p] = 0;
        };
      });
    });
    //console.log(properties);
    x.domain([0,properties.lengths]);
    xScale = d3.scale.linear()
      .domain([0,properties.length])
      .range([50, width+25]);
    rScale = d3.scale.linear()
        .domain([lim[1]-0.5, parseFloat(lim[0])+0.5])
        .range([2, 13]);
    trScale = d3.scale.linear()
        .domain([0, lim[2]+1])
        .range([0, 10]);
    svg.attr("height",data.length*25)
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 0 + ")")
      .call(xAxis);

    for (var j = 0; j < data.length; j++) {
      //console.log(color_data[data[j][properties[10]].replace(/[ ]/g,"_").replace(/[\[.,\]]/g,"")]);
      var g = svg.append("g").attr("class","item");

      var circles = g.selectAll("circle")
        .data(d3.entries(data[j]))
        .enter()
        .append("circle");

      var text = g.selectAll("text")
        .data(d3.entries(data[j]))
        .enter()
        .append("text");


      circles
        .attr("cx", function(d, i) {
          if(i == 11)
           return 625;
          return xScale(i);
        })
        .attr('class', function(d, i) {
          if(i == 11)
           return "total";
        })
        .attr("cy", j*25+20)
        .attr("r", function(d,i) {
          if(i==10)
            return 0;
          if(i == 11)
            return trScale(data[j][properties[i]]);
          if(i >= 0 && data[j][properties[i]])
            return rScale(data[j][properties[i]]);
        })
        .style("fill", color_data[data[j][properties[10]].replace(/[ ]/g,"_").replace(/[\[.,\]]/g,"")]);

      text
        .attr("y", j*25+25)
        .attr("x",function(d, i) {
          if(i == 11)
           return 625;
          else if (i==10) {
            return width-70
          }
          return xScale(i);
        })
        .attr("class","value")
        .attr('text-anchor',function(d,i) {
          if(i==10){
          return null;
        }
        else{
          return "middle"
        }
      })
        .text(function(d,i){
          if(i==10){
            return truncate(data[j][properties[10]],20,"...")
          }
          else if(i >= 0 && data[j][properties[i]])
          return data[j][properties[i]];
        })
        .style("fill", color_data[data[j][properties[10]].replace(/[ ]/g,"_").replace(/[\[.,\]]/g,"")])
        .style("display","none");

      g.append("text")
        .attr("y", j*25+25)
        .attr("x",width-70)
        .attr("class","label")
        .text(truncate(data[j][properties[10]],20,"..."))
        .style("fill", color_data[data[j][properties[10]].replace(/[ ]/g,"_").replace(/[\[.,\]]/g,"")])
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    };

  };
