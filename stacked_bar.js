var cat = ""
function tickXformater(d,i){
	var interval = 2;
	if(that.item.config.xInterval){
		interval = that.item.config.xInterval;
	}
	if(that.width < 500){
		interval = 7;
	}
	var finalI = arguments[2] && arguments[2].length && arguments[2].length -1;
	if((i % interval == 0 && finalI - i > (interval-1)) || i ==  finalI){
		var label = d;
		return label;
	}
}
filt_list = []
var b = {
  w: 100, h: 30, s: 3, t: 10
};
seq_list=[]

function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}
function updateBreadcrumbs(nodeArray, percentageString) {

	// Data join; key function combines name and depth (= position in sequence).
	var g = d3.select("#trail")
			.selectAll("g")
			.data(nodeArray, function(d) { return d })



	// Add breadcrumb and label for entering nodes.
	var entering = g.enter().append("svg:g")
									.attr("transform", function(d, i) {
														return "translate(" + i * (b.w + b.s) + ", 10)";
													})
									.attr("value", function(d, i) {
														return d;
													})
									.on("click",function(d, i) {
														initializeStack(d)
													});

	entering.append("svg:polygon")
			.data(nodeArray)
			.attr("points", breadcrumbPoints)
			.style("fill", function(d){return data_list_new.indexOf(d)>=0?"#0076A8":"#97999B"})
			.style("cursor","pointer");

	entering.append("svg:text")
			.attr("x", (b.w + b.t) / 2)
			.attr("y", b.h / 2)
			.attr("dy", "0.35em")
			.attr("text-anchor", "middle")
			.style("fill","#fff")
			.style("cursor","pointer")
			.text(function(d) { return d.length<13?d:d.substring(0,10)+"..."; });
g.exit().remove();

	// Set position for entering and updating nodes.
//	g.enter()
}
function initializeBreadcrumbTrail() {
// Add the svg area.
var trail = d3.select("#seq").append("svg:svg")
	.attr("width", width)
	.attr("height", 50)
	.attr("id", "trail");
// Add the label at the end, for the percentage.
trail.append("svg:text")
.attr("id", "endlabel")
.style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {

var points = [];
points.push("0,0");
points.push(b.w + ",0");
points.push(b.w + b.t + "," + (b.h / 2));
points.push(b.w + "," + b.h);
points.push("0," + b.h);
if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
points.push(b.t + "," + (b.h / 2));
}
return points.join(" ");
}

data_list = ["Shift Index","Foundation","Flow","Impact","Technology Performance","Infrastructure Penetration","Public Policy","Economic Freedom","Physical Flows","Virtual Flows","Flow Amplifiers","Market","People","Firms"]
data_list_new = ["Shift Index","Foundation","Flow","Impact","Public Policy"]
color_list ={"Foundation":"#ED8B00","Flow":"#005587","Impact":"#009A44","Technology Performance":"#ED8B00","Infrastructure Penetration": "#005587","Public Policy":"#009A44","Economic Freedom":"#ED8B00","Physical Flows":"#ED8B00","Virtual Flows": "#005587","Flow Amplifiers":"#009A44","Market":"#ED8B00","People": "#005587","Firms":"#009A44","Business Freedom":"#ED8B00","Trade Freedom ":"#005587","Fiscal Freedom":"#009A44","Gov't Size":"#FFCD00","Monetary Freedom":"#E3E48D","Investment Freedom":"#0097A9","Financial Freedom":"#00A3E0","Property Rights": "#75787B","Freedom from Corruption ": "#004F59","Labor Freedom":"#005587",'Wireless Subscriptions':"#ED8B00",'Internet Users':"#005587","Computing":"#ED8B00","Digital Storage":"#005587","Bandwidth":"#009A44","Inter-Firm Knowledge Flows":"#ED8B00","Internet Activity":"#005587","Migration of People to Creative Cities":"#ED8B00","Travel Volume":"#005587","Movement of Capital":"#009A44","Worker Passion":"#ED8B00","Social Media Activity":"#005587","Competitive Intensity":"#ED8B00","Labor Productivity":"#005587","Stock Price Volatility":"#009A44","Asset Profitability":"#ED8B00","ROA Performance Gap":"#005587","Firm Topple Rate":"#009A44","Shareholder Value Gap":"#FFCD00","Consumer Power":"#ED8B00","Brand Disloyalty":"#005587","Returns to Talent":"#009A44","Executive Turnover":"#FFCD00"}
var plot_stacked= function(name){
	if(seq_list.indexOf(name) < 0){
	seq_list.push(name)
}else{
	ind = seq_list.indexOf(name)
	seq_list = seq_list.slice(0,ind+1)
}
	//$(".main").html(stacked)
  cat = name
  function tooltipTypeAShow(d) {
  	var leftPosition = d3.event.pageX;
  	if(that.width - leftPosition < 190){
  		leftPosition = leftPosition - 90;
  		that.tooltip.classed('rightPointer',true);
  		that.tooltip.classed('leftPointer',false);
  	}else if(leftPosition < 190){
  		leftPosition = leftPosition + 90;
  		that.tooltip.classed('rightPointer',false);
  		that.tooltip.classed('leftPointer',true);
  	}else{
  		that.tooltip.classed('rightPointer',false);
  		that.tooltip.classed('leftPointer',false);

  	}
      that.tooltip.html("")
      //console.log(d.);
  		that.tooltip.html(d.key)
  	//Position the tooltip and display it
      that.tooltip
          .style("opacity", 0.95)
  	    .style("left",(leftPosition) + "px")
  	    .style("top", (d3.event.pageY - 16) + "px");

      //For auto hide feature
      window.clearTimeout(that.tooltipTimer);
      that.tooltipTimer = window.setTimeout(function(){
      	 that.tooltip.transition()
              .duration(500)
              .style("opacity", 0);
      },4000)
  }




  var margin = {top: 30, right: 70, bottom: 50, left: 70};

  d3.select(".chart-wrapper").style("height","98%")
d3.select(".chart-menu").style("display","none")
d3.select(".notes").style("display","none")
d3.select("#App").style("display","none")
d3.select("#App1").style("display","block")
d3.select(".stacked-chart-menu").style("display","block")
d3.select(".chart-area").style("width","98%")
d3.select(".chart-area").style("height","100%")
var width =  $('#App1').width() - margin.left - margin.right-150,
    height = $(".chart-area").height()- margin.top - margin.bottom-50
var svg = d3.select("#chrt-ovrvw").attr("width",width).attr("height",height)
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#ED8B00", "#005587", "#009A44","#FFCD00","#E3E48D", "#0097A9", "#00A3E0", "#75787B", "#004F59", "#005587","#43B02A"]);
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")

  g.append("g")
      .attr("class", "axis axis--y")
      var stack = d3.stack();
var updateStacked = function(name){
d3.csv("/data/overview/"+name+".csv", type, function(error, data) {
	//console.log(data);
  if (error) throw error;

  data.sort(function(a, b) { return a.State - b.State; });
	sub_data = []
	 $(data).each(function(i,d){
		//console.log(d);
		p = {}
		Object.keys(d).filter(function(k){if (filt_list.indexOf(k) < 0) {	p[k] = d[k];return d[k]

	}})
	sub_data.push(p)
	//console.log(d.filter(function(k){console.log(k);}));
	;})
	old_cols = data.columns
	color_lst = []
	data.columns.slice(1).forEach(function(k,i){color_lst[k]=i})
	data.columns = data.columns.filter(function(d){return filt_list.indexOf(d)<0})
  x.domain(data.map(function(d) { return d.State; }));
  y.domain([0, d3.max(sub_data, function(d) { return d.total; })]).nice();
  z.domain(data.columns.slice(1));
  svg.selectAll(".serie").remove()
  svg.selectAll(".legend").remove()
  svg.selectAll(".title").remove()
  bar_g = g.selectAll(".serie")
    .data(stack.keys(data.columns.slice(1))(data))
    .enter().append("g")
      .attr("class", "serie")
      .attr("fill", function(d) { return color_list[d.key]; })
      .on("click",function(d) { if(data_list.indexOf(d.key)>=0){return initializeStack(d.key)} })
      .on("mousemove", tooltipTypeAShow)
      .on("mouseout", tooltipTypeAHide)
    bar_g.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.State)+5; })
      .attr("y", function(d) { return y(d[1]); })
      .attr("width", x.bandwidth()- x.bandwidth()/3)
      .attr("height", function(d) { return 0; })
      .transition()
      .duration(500)
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth()-x.bandwidth()/3)
			.style("cursor","pointer");

    d3.select(".axis--x")
      .transition()
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("dy", "-0.25em")
      .attr("dx", "1.25em")
      .style("text-anchor","middle")
      .attr("transform", function(d) {
                return "rotate(90)"
                });


  d3.select(".axis--y")
    .call(d3.axisLeft(y).ticks(10, "s"))
    .append("text")
    .attr("x", 2)
    .attr("y", y(y.ticks(10).pop()))
    .attr("dy", "0.35em")
    .attr("text-anchor", "start")
    .attr("fill", "#000")
    .transition()
      var legend = g.selectAll(".legend")
         .data(old_cols.slice(1).reverse())
         .enter().append("g")
           .attr("class", "legend")
           .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; })
					 .attr("value",function(d){return d})
					 .on('click',function(d, i){return toggleFilt(name,d,this)})
					 .style("cursor","pointer")
					 .style("opacity",function(d){if(filt_list.indexOf(d) >= 0){return 0.25}})
     legend.append("rect")
		 			.data(old_cols.slice(1).reverse())
         .attr("width", 18)
         .attr("height", 18)
         .attr("y", height/10-10 )
         .attr("x",width+30)
         .attr("fill", function(d) {return color_list[d]; })
     legend.append("text")
       .style("font-size","12px")
       .attr("y",height/10)
       .attr("x",width+60)
       .attr("dy", ".35em")
       .attr("text-anchor", "start")
       .transition()
       .text(function(d) { return d.length<25?d:d.substring(0,25)+"...";; });
     svg.append("text")
        .attr("class","title")
             .attr("x", (width / 2)+50)
             .attr("y", 10)
             .style("opacity",0)
             .transition()
             .duration(200)
             .attr("x", (width / 2)+50)
             .attr("y", 30)
             .style("opacity",1)
             .attr("text-anchor", "middle")
             .style("font-size", "24px")
             .style("stroke","#63666A")
             .text(name);

updateBreadcrumbs(seq_list,'35')

				 // Update the breadcrumb trail to show the current sequence and percentage.



});
}
updateStacked(name)
function type(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i){
		if(filt_list.indexOf(columns[i]) < 0){
		 t += d[columns[i]] = +d[columns[i]];
	 }
 }
  d.total = t;
  return d;

}

}
var initializeStack = function(name){
	filt_list = []
	plot_stacked(name)
}

var toggleFilt= function(name,value,node){
if(filt_list.indexOf(value)<0){
		filt_list.push(value)
	}else{
		filt_list.splice(filt_list.indexOf(value),1)
	}
	plot_stacked(name)
}



var scrnsht = function (exports) {
    function urlsToAbsolute(nodeList) {
        if (!nodeList.length) {
            return [];
        }
        var attrName = 'href';
        if (nodeList[0].__proto__ === HTMLImageElement.prototype
        || nodeList[0].__proto__ === HTMLScriptElement.prototype) {
            attrName = 'src';
        }
        nodeList = [].map.call(nodeList, function (el, i) {
            var attr = el.getAttribute(attrName);
            if (!attr) {
                return;
            }
            var absURL = /^(https?|data):/i.test(attr);
            if (absURL) {
                return el;
            } else {
                return el;
            }
        });
        return nodeList;
    }

    function screenshotPage() {
        urlsToAbsolute(document.images);
        urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
        var screenshot = document.documentElement.cloneNode(true);
        var b = document.createElement('base');
        b.href = document.location.protocol + '//' + location.host;
        var head = screenshot.querySelector('head');
        head.insertBefore(b, head.firstChild);
        screenshot.style.pointerEvents = 'none';
        screenshot.style.overflow = 'hidden';
        screenshot.style.webkitUserSelect = 'none';
        screenshot.style.mozUserSelect = 'none';
        screenshot.style.msUserSelect = 'none';
        screenshot.style.oUserSelect = 'none';
        screenshot.style.userSelect = 'none';
        screenshot.dataset.scrollX = window.scrollX;
        screenshot.dataset.scrollY = window.scrollY;
        var script = document.createElement('script');
        script.textContent = '(' + addOnPageLoad_.toString() + ')();';
        screenshot.querySelector('body').appendChild(script);
        var blob = new Blob([screenshot.outerHTML], {
            type: 'text/html'
        });
        return blob;
    }

    function addOnPageLoad_() {
        window.addEventListener('DOMContentLoaded', function (e) {
            var scrollX = document.documentElement.dataset.scrollX || 0;
            var scrollY = document.documentElement.dataset.scrollY || 0;
            window.scrollTo(scrollX, scrollY);
        });
    }

    function generate() {
        window.URL = window.URL || window.webkitURL;
        window.open(window.URL.createObjectURL(screenshotPage()));
    }
    exports.screenshotPage = screenshotPage;
    exports.generate = generate;
};
