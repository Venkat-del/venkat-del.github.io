var margin = {top: 50, right: 20, bottom: 30, left: 70};
var mobileThreshold = 600;
var that;

var Script = {};
Script.setData = function(item){
	if(item){
		this.item = item;
		this.data = item.data;
	}
	console.log(this.item.data);
}

Script.initializeChart = function(rootElm, sizeObj,slide,item){
	this.item = item;
	this.data = item.data;
	that = this;
	if(!that.svg){
		that.svg =  rootElm.append('svg')
	                       .attr('width',sizeObj.width)
	                       .attr('height',sizeObj.height);
	    that.g = that.svg.append("g")
	}

	//Add a tooltip element
	if(!that.tooltip){
		that.tooltip =  d3.select('body').append('div')
						   .attr('id','tooltip')
		that.tooltipTimer = null;
	}

    //Always remove
	that.g.selectAll(".trendline").remove();
	that.g.selectAll('.bubbles').remove();
	that.g.selectAll('.axisLabel').remove();
	that.g.selectAll(".legend").remove()
	//Only append elements and data.
	//All drawing,scales should be done in resize and it is called after initialize is complete..

	//Simple bar chart
	if(that.item && that.item.type.indexOf('bar:single') > -1){
		that.g.selectAll('.path').transition().style('opacity','0').remove();
	    //Axis for ordinal x and linear y
		d3.select('.xaxis').empty()?(that.g.append("g").attr("class", "axis xaxis")):null;
		d3.select('.yaxis').empty()?(that.g.append("g").attr("class", "axis yaxis")):null;
		that.g.selectAll(".bar").data(that.data).enter().append("rect").attr("class", "bar");

		that.g.selectAll(".bar")
				.style('cursor','pointer')
				.on("mousemove", tooltipTypeAShow)
	            .on("mouseout", tooltipTypeAHide)
	}else{
		that.g.selectAll('.bar').remove();
	}


	//Simple line chart with/withour a trendline, but only one data set..
	if(that.item && that.item.type.indexOf('line:single') > -1){
		d3.select('.xaxis').empty()?(that.g.append("g").attr("class", "axis xaxis")):null;
		d3.select('.yaxis').empty()?(that.g.append("g").attr("class", "axis yaxis")):null;
		d3.select('.line').empty()?(that.g.append("path").attr("class", "path line")):null;

		that.g.selectAll('.bubbles')
			.data(that.data)
			.enter()
			.append('circle')
			.attr('class','bubbles')
			.style('cursor','pointer')
			.on("mousemove", tooltipTypeAShow)
            .on("mouseout", tooltipTypeAHide)

		that.g.select('.line').datum(that.data);
	}else{
		if(that.item && that.item.type.indexOf('line') > -1){
			that.g.selectAll('.line').remove();
		}
	}
	//simple area chart
	if(that.item && that.item.type.indexOf('area:single') > -1){
		d3.select('.xaxis').empty()?(that.g.append("g").attr("class", "axis xaxis")):null;
		d3.select('.yaxis').empty()?(that.g.append("g").attr("class", "axis yaxis")):null;
		d3.select('.area').empty()?(that.g.append("path").attr("class", "path area")):null;

		that.g.selectAll('.bubbles')
			.data(that.data)
			.enter()
			.append('circle')
			.attr('class','bubbles')
			.style('cursor','pointer')
			.on("mousemove", tooltipTypeAShow)
            .on("mouseout", tooltipTypeAHide)

		that.g.select('.area').datum(that.data);
	}else{
		if(that.item && that.item.type.indexOf('area') > -1){
			that.g.selectAll('.area').remove();
		}
	}

	//Dual Y axis chart
	if(that.item && that.item.type.indexOf('line:dualaxis') > -1){
		d3.select('.xaxis').empty()?(that.g.append("g").attr("class", "axis xaxis")):null;
		d3.select('.yaxis').empty()?(that.g.append("g").attr("class", "axis yaxis")):null;
		d3.select('.y2axis').empty()?(that.g.append("g").attr("class", "axis y2axis")):null;
		d3.select('.line').empty()?(that.g.append("path").attr("class", "path line")):null;
		d3.select('.line2').empty()?(that.g.append("path").attr("class", "path line2")):null;
			d3.select('.leg-lab').empty()?(that.g.append("rect").attr("class", "leg-lab")):null;


		that.g.selectAll('.L.bubbles')
			.data(that.data.yl)
			.enter()
			.append('circle')
			.attr('class','bubbles L')

        that.g.selectAll('.R.bubbles')
			.data(that.data.yr)
			.enter()
			.append('circle')
			.attr('class','bubbles R')

		that.g.selectAll('.bubbles')
			.style('cursor','pointer')
			.on("mousemove", tooltipTypeAShow)
            .on("mouseout", tooltipTypeAHide)

        that.g.select('.line').datum(that.data.yl);
        that.g.select('.line2').datum(that.data.yr);
	}else{
		d3.select('.y2axis').remove();
		d3.select('.line2').remove();
	}

	//multi line chart
	if(that.item && that.item.type.indexOf('line:multi') > -1){
		that.g.selectAll('.path').transition().style('opacity','0').remove();
		d3.select('.xaxis').empty()?(that.g.append("g").attr("class", "axis xaxis")):null;
		d3.select('.yaxis').empty()?(that.g.append("g").attr("class", "axis yaxis")):null;
		for(var i = 0; i < that.data.length; i++){
			var sufix = ''+ (i==0?'':(i+1));
			d3.select('.line' + sufix ).empty()?(that.g.append("path").attr("class", "path line"+sufix)):null;

			that.g.selectAll('.bubbles.M'+sufix)
				.data(that.data[i])
				.enter()
				.append('circle')
				.attr('class','bubbles M'+sufix)
				.style('cursor','pointer')
				.on("mousemove", tooltipTypeAShow)
	            .on("mouseout", tooltipTypeAHide)

	        that.g.select('.line' + sufix).datum(that.data[i]);
		}
	}else{
		that.g.selectAll('.path').transition().style('opacity','0').remove();
	}


	//vertical bar chart
	if(that.item && that.item.type.indexOf('verticalbars') > -1){
		that.g.selectAll('*').transition().style('opacity','0').remove();
	}else{
		//Remove vertical bar chart here
		that.g.selectAll('.vertical').remove();
	}

	//Pie type chart: bulk of the work done in resize itself
	if(that.item && that.item.type.indexOf('pie') > -1){
		that.g.selectAll('*').remove();
	}else{
		that.g.selectAll('.pie').style('opacity','0').remove();
	}


	//Call resize to draw using the new scales and elements
	that.resizeChart(sizeObj,slide)
}

Script.resizeChart = function(sizeObj,animate){
	var DUR = 250;
	that = this;
	if(!this.svg) return;
	//Graphic is present, proceed to resize...

	//Remove always
	that.g.selectAll('.CALLOUT').remove();
	//Set margins
	if(sizeObj.width <= mobileThreshold){
		margin.left = 50;
		margin.right = 20;
	}else{
		margin.left = 55;
		margin.right = 20;
	}
	if(that.item.config.yr){
		margin.right = 15;
	}
	if(that.item.config.yLabel){
		margin.left = margin.left + 15;
	}
	if(that.item.config.yrLabel){
		margin.right = margin.right + 15;
	}
	//Axis labels, added here as they are not really dependent on which type of chart
	that.g.selectAll('.axisLabel').remove();
    if(that.item.config.yLabel){
	    // now add titles to the axes
        that.g.append("text")
        	.attr('class','axisLabel')
            .attr("text-anchor", "start")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ ((margin.left - 14) *(-1)) +","+(sizeObj.height/2)+")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
            .text(that.item.config.yLabel);
    }
    if(that.item.config.yrLabel){
	    // now add titles to the axes
        that.g.append("text")
        	.attr('class','axisLabel')
            .attr("text-anchor", "end")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ ((sizeObj.width - margin.left - 24)) +","+(sizeObj.height/2)+")rotate(90)")   // text is drawn off the screen top left, move down and out and rotate
            .text(that.item.config.yrLabel);
    }


	//Adjust main image size
	that.svg.attr('width',sizeObj.width)
            .attr('height',sizeObj.height)

    //New Drawable size of chart
    that.width = sizeObj.width - margin.left - margin.right;
    that.height = sizeObj.height - margin.top - margin.bottom;
    that.g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if(that.item && that.item.type.indexOf('bar:single') > -1){
	    //Adjust scales and axis
	    var x = d3.scaleBand().rangeRound([0, that.width]).padding(0.2);
	    var y = (that.item.config.yLog?(d3.scaleLog()):(d3.scaleLinear())).rangeRound([that.height, 0]);
		x.domain(that.data.map(function(d) { return d[that.item.config.x]; }));
		if(that.item.config.yRange){
	    	y.domain(that.item.config.yRange)
	    }else{
			y.domain([that.item.config.yLog?(d3.min(that.data, function(d) { return d[that.item.config.y]})):0, d3.max(that.data, function(d) { return d[that.item.config.y]; })]);
	    }

		that.g.select(".xaxis")
			  .attr("transform", "translate(0," + (y(that.item.config.xRaise)+ 0) + ")")
			  .transition().duration(animate?DUR:0)
			  .call(
			  	d3.axisBottom(x)
			  	  .tickSizeOuter(0)
			  	  .tickFormat(tickXformater)
						)
				.selectAll("text")
				.style("text-anchor", "start")
				.attr("x",that.height-y(0)+5 )
				.attr("y",-5)
				.attr("transform", "rotate(90)" );
		that.g.select(".yaxis")
			  .transition().duration(animate?DUR:0)
			  .call(
			  	d3.axisLeft(y)
			  	  .tickSizeOuter(0)
			  	  .ticks(10)
				  .tickValues(that.item.config.yExplicitlabels)
			  	  .tickFormat(tickYformater))


	    //Adjust bars
	    that.g.selectAll(".bar")
		  .attr("x", function(d) { return mGZ(x(d[that.item.config.x])); })
		  .attr("y", function(d) { return mGZ(that.height); })
		  .attr("height", function(d) { return 0; })
		  .attr("width", x.bandwidth())
		  .attr("fill",'#fff')
		  .transition().duration(animate?DUR:0)
		  .attr("y", function(d) { return mGZ(Math.min(y(0),y(d[that.item.config.y]))); })
		  .attr("height", function(d) { return Math.abs(y(0) - y(d[that.item.config.y])); })
		  .attr("fill",function(d){return that.item.config.legend[that.item.config.y]})



			if(typeof that.item.config.xRaise !== 'undefined'){
				that.g.select(".xaxis").attr("transform", "translate(0," + y(that.item.config.xRaise) + ")")
			}
    }


    if(that.item && that.item.type.indexOf('line:single') > -1){
    	var x = d3.scaleBand().rangeRound([0, that.width]).padding(0.2);
	    var y = (that.item.config.yLog?(d3.scaleLog()):(d3.scaleLinear())).rangeRound([that.height, 0]);
	    x.domain(that.data.map(function(d) { return d[that.item.config.x]; }));
	    if(that.item.config.yRange){
	    	y.domain(that.item.config.yRange)
	    }else{
			y.domain(
				[
					that.item.config.yLog||that.item.config.yLimit?(d3.min(that.data, function(d) { return d[that.item.config.y]})):0
				,
					d3.max(that.data, function(d) { return d[that.item.config.y]; })
				]);

	    }

		//Axis
		that.g.select(".xaxis")
			  .attr("transform", "translate(0," + (that.height + 0) + ")")
			  .transition().duration(animate?DUR:0)
			  .call(
			  	d3.axisBottom(x)
			  	  .tickSizeOuter(0)
			  	  .tickPadding(6)
			  	  .tickFormat(tickXformater))
						.selectAll("text")
						.style("text-anchor", "start")
						.attr("x", 1)
						.attr("y",(start_year-2015)/7)
						.attr("transform", "rotate(90)" );
		that.g.select(".yaxis")
			  .transition().duration(animate?DUR:0)
			  .call(
			  	d3.axisLeft(y)
			  	  .tickSizeOuter(0)
			  	  .ticks(10)
				  .tickValues(that.item.config.yExplicitlabels)
			  	  .tickFormat(tickYformater))

		//xRaise for special charts
		if(typeof that.item.config.xRaise !== 'undefined'){
			that.g.select(".xaxis").attr("transform", "translate(0," + y(that.item.config.xRaise) + ")")
		}
	    //Main line
		var line = d3.line()
				     .x(function(d) { return mGZ(x(d[that.item.config.x])); })
				     .y(function(d) { return mGZ(y(d[that.item.config.y])); })
				     //.curve(d3.curveMonotoneX);
		that.g.select('.line')
			  .transition().duration(animate?DUR:0)
		      .attr("stroke",function(d){return that.item.config.legend[that.item.config.y]})
		      .attr("d", line)

		//Bubbles
		that.g.selectAll('.bubbles')
			.attr('r','0')
			.attr('fill',function(d){return that.item.config.legend[that.item.config.y]})
			.attr('stroke',function(d){return that.item.config.legend[that.item.config.y]})
			.attr('stroke-width','16px')
			.attr('stroke-opacity',function(d){ if(d.marker){return 0.3;}else{return 0;}})
			.attr('cx',function(d) { return mGZ(x(d[that.item.config.x])); })
	        .attr('cy',function(d) { return mGZ(y(d[that.item.config.y])); })
	        .transition().duration(animate?DUR:0)
			.attr('r',(sizeObj.width <= mobileThreshold)?2.1:3.2)




		//Trendline
		if(that.item.config.showTrendline){
			that.g.selectAll(".trendline").remove();
			var xLabels = that.data.map(function (d) { return d[that.item.config.x]; })
			// get the x and y values for least squares
			var xSeries = d3.range(1, xLabels.length + 1);
			var ySeries = that.data.map(function(d) { return parseFloat(d[that.item.config.y]); });

			var leastSquaresCoeff = leastSquares(xSeries, ySeries);

			// apply the reults of the least squares regression
			var x1 = xLabels[0];
			var y1 = leastSquaresCoeff[0] + leastSquaresCoeff[1];
			var x2 = xLabels[xLabels.length - 1];
			var y2 = leastSquaresCoeff[0] * xSeries.length + leastSquaresCoeff[1];
			var trendData = [[x1,y1,x2,y2]];

			that.g.selectAll(".trendline")
				.data(trendData)
				.enter()
				.append("line")
				.attr("class", "trendline")
				.attr("x1", function(d) { return x(d[0]); })
				.attr("y1", function(d) { return y(d[1]); })
				.attr("x2", function(d) { return x(d[2]); })
				.attr("y2", function(d) { return y(d[3]); })
				.attr("stroke",'#878A8F')
				.attr("stroke-dasharray", "5, 3")
				.attr("stroke-width", 3)
				.attr("stroke-opacity", 0)
				.transition().duration(animate?DUR*3:0)
				.attr("stroke-opacity", 0.9);
		}
	}


	//Dual Y axis chart
	if(that.item && that.item.type.indexOf('line:dualaxis') > -1){
		//Special width for this chart ...
		that.width = sizeObj.width - margin.left*2.3 ;

		var x = d3.scaleBand().rangeRound([0, that.width]).padding(0.2);
	     var y = d3.scaleLinear().rangeRound([that.height*0.9, 0-that.height*0.1])
	    var y2 = d3.scaleLinear().rangeRound([that.height*0.9, 0-that.height*0.1])

	    x.domain(that.data.yl.map(function(d) { return d[that.item.config.x]; }));

	    if(that.item.config.yRange){
	    	y.domain(that.item.config.yRange)
	    }else{
			y.domain([0,d3.max(that.data.yl, function(d) { return d[that.item.config.yl]; })]);
	    }

	    if(that.item.config.y2Range){
	    	y2.domain(that.item.config.y2Range)
	    }else{
			y2.domain([0,d3.max(that.data.yr, function(d) { ;return d[that.item.config.yr]; })]);
	    }

		//Axis
		that.g.select(".xaxis")
			  .attr("transform", "translate(0," + (that.height*0.9) + ")")
			  .transition().duration(animate?DUR:0)
			  .call(
			  	d3.axisBottom(x)
			  	  .tickSizeOuter(0)
			  	  .tickPadding(6)
			  	  .tickFormat(tickXformater))
						.selectAll("text")
						.style("text-anchor", "start")
						.attr("x", 1)
						.attr("y",-5)
						.attr("transform", "rotate(90)" );
		that.g.select(".yaxis")
			  .transition().duration(animate?DUR:0)
			  .call(
			  	d3.axisLeft(y)
			  	  .tickSizeOuter(0)
			  	  .ticks(10)
				  .tickValues(that.item.config.yExplicitlabels)
			  	  .tickFormat(tickYformater));
		that.g.select(".y2axis")
			  .attr("transform", "translate(" + (that.width ) + ",0)")
			  .transition().duration(animate?DUR:0)
			  .call(
			  	d3.axisRight(y2)
			  	  .tickSizeOuter(0)
			  	  .ticks(10)
				  .tickValues(that.item.config.y2Explicitlabels)
			  	  .tickFormat(tickYformater));

		//Main line
		var line = d3.line()
				     .x(function(d) { return mGZ(x(d[that.item.config.x])); })
				     .y(function(d) { return mGZ(y(d[that.item.config.yl])); })
		var line2 = d3.line()
				     .x(function(d) { return mGZ(x(d[that.item.config.x])); })
				     .y(function(d) { return mGZ(y2(d[that.item.config.yr])); })

		that.g.select('.line')
			  .transition().duration(animate?DUR:0)
		      .attr("stroke",function(d){return that.item.config.legend[that.item.config.yl]})
		      .attr("d", line)
		that.g.select('.line2')
			  .transition().duration(animate?DUR:0)
		      .attr("stroke",function(d){return that.item.config.legend[that.item.config.yr]})
		      .attr("d", line2)

		//Bubbles
		that.g.selectAll('.L.bubbles')
			.attr('r','0')
			.attr('fill',function(d){return that.item.config.legend[that.item.config.yl]})
			.attr('stroke',function(d){return that.item.config.legend[that.item.config.yl]})
			.attr('stroke-width','16px')
			.attr('stroke-opacity',function(d){ if(d.marker){return 0.3;}else{return 0;}})
			.attr('cx',function(d) { return mGZ(x(d[that.item.config.x])); })
	        .attr('cy',function(d) { return mGZ(y(d[that.item.config.yl])); })
	        .transition().duration(animate?DUR:0)
			.attr('r',(sizeObj.width <= mobileThreshold)?2.1:3.2)
		that.g.selectAll('.R.bubbles')
			.attr('r','0')
			.attr('fill',function(d){return that.item.config.legend[that.item.config.yr]})
			.attr('stroke',function(d){return that.item.config.legend[that.item.config.yr]})
			.attr('stroke-width','16px')
			.attr('stroke-opacity',function(d){ if(d.marker){return 0.3;}else{return 0;}})
			.attr('cx',function(d) { return mGZ(x(d[that.item.config.x])); })
	        .attr('cy',function(d) { return mGZ(y2(d[that.item.config.yr])); })
	        .transition().duration(animate?DUR:0)
			.attr('r',(sizeObj.width <= mobileThreshold)?2.1:3.2)
		var legend =that.g.selectAll(".legend")
	     .data(that.item.config.legendComponent)
	     .enter().append("g")
	       .attr("class", "legend")
		 		.attr("transform",function(d,i){return "translate("+(i*that.width/2+75)+","+(that.height*1.07	)+")"})
		//		legend.selectAll("*").remove()
		legend.append("rect")
	     .data(that.item.config.legendComponent)
		 				.attr("width", that.width/50)
		 				.attr("height", that.width/50)
		 				.attr("fill", function(d) {return d.color })
		legend.append("text")
			.attr("class","leg-lab")
			.style("font-size","12px")
			.attr("y",that.width/100)
			.attr("x",that.width/50+10)
			.attr("dy", ".35em")
			.attr("text-anchor", "start")
			.transition()
			.style("fill",function(d) {return d.color })
			.text(function(d) {return d.name });
	}


	if(that.item && that.item.type.indexOf('line:multi') > -1){
		var consolidatedData = [];
		for(var i = 0; i < that.data.length; i++){
			that.data[i].map(function(d) {
				consolidatedData.push(d);
			})
		}

    	var x = d3.scaleBand().rangeRound([0, that.width]).padding(0.2);
	    var y = (that.item.config.yLog?(d3.scaleLog()):(d3.scaleLinear())).rangeRound([that.height, 0]);
	    x.domain(consolidatedData.map(function(d) { return d[that.item.config.x]*1; }));
	    if(that.item.config.yRange){
	    	y.domain(that.item.config.yRange)
	    }else{
			y.domain(
				[
					that.item.config.yLog||that.item.config.yLimit?(d3.min(consolidatedData, function(d) { return d[that.item.config.y]*1})):0
				,
					d3.max(consolidatedData, function(d) { return d[that.item.config.y]*1; })
				]);
	    }

		//Axis
		that.g.select(".xaxis")
			  .attr("transform", "translate(0," + (that.height + 0) + ")")
			  .transition().duration(animate?DUR:0)
			  .call(
			  	d3.axisBottom(x)
			  	  .tickSizeOuter(0)
			  	  .tickPadding(6)
			  	  .tickFormat(tickXformater))
						.selectAll("text")
						.style("text-anchor", "start")
						.attr("x", 1)
						.attr("y",-5)
						.attr("transform", "rotate(90)" );
		that.g.select(".yaxis")
			  .transition().duration(animate?DUR:0)
			  .call(
			  	d3.axisLeft(y)
			  	  .tickSizeOuter(0)
			  	  .ticks(10)
				  .tickValues(that.item.config.yExplicitlabels)
			  	  .tickFormat(tickYformater))

	    //Main line
		var line = d3.line()
				     .x(function(d) { return mGZ(x(d[that.item.config.x])); })
				     .y(function(d) { return mGZ(y(d[that.item.config.y])); })
				     //.curve(d3.curveCatmullRom)


	    if(that.item.config.specialCallout){
	    	var callout = that.item.config.specialCallout;
	    	console.log()
	    	that.g.append('circle')
	    		.attr('class','bubbles CALLOUT')
				.attr('r','0')
				.attr('fill','rgba(0,0,0,0.1)')
				.attr('stroke','#53565A')
				.attr('stroke-width','2px')
				.style('cursor','pointer')
				.attr('cx',function(d) { return mGZ(x(callout.x)); })
		        .attr('cy',function(d) { return mGZ(y(callout.y)); })
				.datum(callout)
			    .on("mousemove", tooltipTypeAShow)
			    .on("mouseout", tooltipTypeAHide)
		        .transition().duration(animate?DUR:0)
				.attr('r',12)
	    }

		//Draw each line in loop, but remove all trendlines before..
		that.g.selectAll(".trendline").remove();
		for(var i = 0; i < that.data.length; i++){
			var sufix = ''+ (i==0?'':(i+1));

			that.g.select('.line'+sufix)
				  .transition().duration(animate?DUR:0)
			      .attr("stroke",function(d){return that.item.config.legend[d[0].key]})
			      .attr("d", line)

			//Bubbles
			that.g.selectAll('.bubbles.M'+sufix)
				.attr('r','0')
				.attr('fill',function(d){return that.item.config.legend[d.key]})
				.attr('stroke',function(d){return that.item.config.legend[d.key]})
				.attr('stroke-width','16px')
				.attr('stroke-opacity',function(d){ if(d.marker){return 0.3;}else{return 0;}})
				.attr('cx',function(d) { return mGZ(x(d[that.item.config.x])); })
		        .attr('cy',function(d) { return mGZ(y(d[that.item.config.y])); })
		        .transition().duration(animate?DUR:0)
				.attr('r',(sizeObj.width <= mobileThreshold)?2.1:3.2)


			//Trendline
			if(that.item.config.showTrendline){
				var xLabels = that.data[i].map(function (d) { return d[that.item.config.x]; })
				// get the x and y values for least squares
				var xSeries = d3.range(1, xLabels.length + 1);
				var ySeries = that.data[i].map(function(d) { return parseFloat(d[that.item.config.y]); });

				var leastSquaresCoeff = leastSquares(xSeries, ySeries);

				// apply the reults of the least squares regression
				var x1 = xLabels[0];
				var y1 = leastSquaresCoeff[0] + leastSquaresCoeff[1];
				var x2 = xLabels[xLabels.length - 1];
				var y2 = leastSquaresCoeff[0] * xSeries.length + leastSquaresCoeff[1];
				var trendData = [[x1,y1,x2,y2]];

				that.g.selectAll(".trendline.M"+sufix)
					.data(trendData)
					.enter()
					.append("line")
					.attr("class", "trendline M"+sufix)
					.attr("x1", function(d) { return x(d[0]); })
					.attr("y1", function(d) { return y(d[1]); })
					.attr("x2", function(d) { return x(d[2]); })
					.attr("y2", function(d) { return y(d[3]); })
					.attr("stroke",that.item.config.legend[that.data[i][0].key])
					.attr("stroke-dasharray", "6, 8")
					.attr("stroke-width", 1)
					.attr("stroke-opacity", 0)
					.transition().duration(animate?DUR*3:0)
					.attr("stroke-opacity", 0.9);
			}

		}

	}





	//VERTICAL BAR CHART
	if(that.item && that.item.type.indexOf('verticalbars') > -1){
		//Clear existing stuff
		that.g.selectAll('.vertical').remove();
		var vert = that.g.append('g').attr('class','vertical');

		//New Drawable size of chart
	    that.width = sizeObj.width - 40;

		//consildate data for figuring out the total range for scale...
		var consolidatedData = [];
		for(var i = 0; i < that.data.length; i++){
			that.data[i].map(function(d) {
				d.value = d.value*1;
				consolidatedData.push(d);
			})
		}
	    var x = (that.item.config.yLog?(d3.scaleLog()):(d3.scaleLinear())).rangeRound([0, that.width]);
		x.domain(
			[
				that.item.config.yLog||that.item.config.yLimit?(d3.min(consolidatedData, function(d) { return d.value})):0
			,
				d3.max(consolidatedData, function(d) { return d.value; })
			]);


		//sort based on group total values to show groups...
		var sortedData = that.data;
		if(!that.item.config.unsorted){
			sortedData = sortedData.sort(function(a,b){
				var aTot = 0;
				var bTot = 0;
				a.filter(function(d){aTot = aTot +  d.value*1;})
				b.filter(function(d){bTot = bTot + d.value*1;})
				return (bTot - aTot)
			});
		}

		var runningHeightCounter = 20; //top margin
		//DRAW THE CHART HERE
		for(var i = 0; i < sortedData.length; i++){
			var keyTitle = sortedData[i][0].key;
			runningHeightCounter += vert.append('g')
										  .attr('class','vTitle')
										  .attr('transform',`translate(10,${runningHeightCounter})`)
										  .node()
										  .appendChild(createSVGtext(keyTitle, 0, 0, Math.round(that.width/10.5),20))
										  .getBBox().height;

			runningHeightCounter -= 15;
			for(var j = 0; j < sortedData[i].length; j++){
				var currentElemRunHeight = runningHeightCounter;
				var indBarHeight = 13.5;
				var barTobarGap = 0;
				if(j == 0){
					var avrgValue = 0;
					sortedData[i].forEach(function(m){
						avrgValue += m.value;
					})
					avrgValue = avrgValue/(sortedData[i].length||1);

					vert.append('rect')
					  .attr('class','vMBar')
					  .attr("x", mGZ(x(avrgValue)))
					  .attr("y", currentElemRunHeight - 3)
					  .attr("height", (indBarHeight * sortedData[i].length) + (barTobarGap * sortedData[i].length) + 6)
					  .attr("width", 2)
					  .attr("fill", '#bbbcbc')
					  .style('opacity',0)
					  .transition().delay(animate?DUR*3:0)
					  .style('opacity',1)
				}

				vert.append('rect')
					  .attr('class','vBar')
					  .attr("x",10)
					  .attr("y", currentElemRunHeight)
					  .attr("height", indBarHeight)
					  .attr("fill", that.item.config.legend[sortedData[i][j].subkey])
					  .style('cursor','pointer')
					  .datum(`${sortedData[i][j].key} <b>${sortedData[i][j].subkey}</b> - <b>${formatLabel(sortedData[i][j].value , that.item.config)}</b>`)
					  .on("mousemove", tooltipTypeAShow)
					  .on("mouseout", tooltipTypeAHide)
					  .attr('width',0)
					  .transition().duration(animate?DUR*2:0).delay((i*j*5))
					  .attr("width", mGZ(x(sortedData[i][j].value)))

				//Show percentage label inside the bar only if the bar is long enough to fit text
				if(x(sortedData[i][j].value) > 60){
					vert.append('text')
						  .attr('class','vLabel')
						  .attr("transform",  "translate(" + (mGZ(x(sortedData[i][j].value))+5) +','+ (currentElemRunHeight + indBarHeight/2) + ")")
						  .attr("dy", ".38em")
						  .style('font-weight','600')
						  .style('font-size','11')
						  .style('text-anchor','end')
						  .style('fill','#FFF')
						  .style('pointer-events','none')
						  .text(formatLabel(sortedData[i][j].value , that.item.config))

				}

				runningHeightCounter += indBarHeight + barTobarGap;
			}
			runningHeightCounter += 26;


		}
		//END THE DRAW CHART HERE
		runningHeightCounter += 10; //bottom margin

		//Adjust main image size
		that.svg.attr('height',runningHeightCounter)
	    that.g.attr("transform", "translate(" + 0 + "," + 0 + ")");
	}





	//PIE CHART
	if(that.item && that.item.type.indexOf('pie') > -1){
		var radius = Math.min(that.width, that.height) / 2;
		var arc = d3.arc().outerRadius(radius - 10).innerRadius(0);
		var labelArc = d3.arc().outerRadius(radius/2).innerRadius(radius/2);
		var pie = d3.pie().sort(null).value(function(d) {return d.value; });

		that.g.selectAll('.pie').remove();

		var g = that.g.append("g")
		    .attr('class','pie')
		    .attr("transform", "translate(" + that.width / 2 + "," + that.height / 2 + ")")
		    .selectAll(".arc")
		      .data(pie(that.data))
		    .enter().append("g")
		      .attr("class", "arc");

		g.append("path")
			.attr("d", arc)
			.style("fill", function(d) {return that.item.config.legend[d.data.key]; })
			.style('cursor','pointer')
			.on("mousemove", tooltipTypeAShow)
			.on("mouseout", tooltipTypeAHide)


		g.append("text")
			.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.style('font-weight','600')
			.style('font-size','22px')
			.style('text-anchor','middle')
			.style('fill','#FFF')
			.style('pointer-events','none')
			.text(function(d) { return d.data.value + '%'; });

		if(animate){
			d3.select('.pie').transition().duration(DUR * 2.5).attrTween("transform", function(d,i,a){
					return function(t){
						return  "translate(" + that.width / 2 + "," + that.height / 2 + ")" +' scale('+ t + ')';
					}
				}
			);
		}
	}


	//arear chart
	if(that.item && that.item.type.indexOf('area:single') > -1){
		var x = d3.scaleBand().rangeRound([0, that.width]).padding(0.2);
		var y = (that.item.config.yLog?(d3.scaleLog()):(d3.scaleLinear())).rangeRound([that.height, 0]);
		x.domain(that.data.map(function(d) { return d[that.item.config.x]; }));
		if(that.item.config.yRange){
			y.domain(that.item.config.yRange)
		}else{
		y.domain(
			[
				that.item.config.yLog||that.item.config.yLimit?(d3.min(that.data, function(d) { return d[that.item.config.y]})):0
			,
				d3.max(that.data, function(d) { return d[that.item.config.y]; })
			]);

		}

	//Axis
	that.g.select(".xaxis")
			.attr("transform", "translate(0," + (that.height + 0) + ")")
			.transition().duration(animate?DUR:0)
			.call(
				d3.axisBottom(x)
					.tickSizeOuter(0)
					.tickPadding(6)
					.tickFormat(tickXformater))
					.selectAll("text")
					.style("text-anchor", "start")
					.attr("x",that.height-y(0)+5 )
					.attr("y",start_year>1995?0:-5)
					.attr("transform", "rotate(90)" );
	that.g.select(".yaxis")
			.transition().duration(animate?DUR:0)
			.call(
				d3.axisLeft(y)
					.tickSizeOuter(0)
					.ticks(10)
				.tickValues(that.item.config.yExplicitlabels)
					.tickFormat(tickYformater))

	//xRaise for special charts
	if(typeof that.item.config.xRaise !== 'undefined'){
		that.g.select(".xaxis").attr("transform", "translate(0," + y(that.item.config.xRaise) + ")")
	}
		//Main line
	var line = d3.line()
					 .x(function(d) { return mGZ(x(d[that.item.config.x])); })
					 .y(function(d) { return mGZ(y(d[that.item.config.y])); })
					 //.curve(d3.curveMonotoneX);

	 var area = d3.area()
     .x(function(d) { return mGZ(x(d[that.item.config.x])); })
     .y0(y(that.item.config.xRaise))
     .y1(function(d) { return mGZ(y(d[that.item.config.y]));});
	that.g.select('.area')
			.transition().duration(animate?DUR:0)
			.style('fill',function(d){return that.item.config.legend[that.item.config.y]})
				.attr("stroke",function(d){return that.item.config.legend[that.item.config.y]})
				.attr("d", area)

	//Bubbles
	that.g.selectAll('.bubbles')
		.attr('r','0')
		.attr('fill',function(d){return that.item.config.legend[that.item.config.y]})
		.attr('stroke',function(d){return that.item.config.legend[that.item.config.y]})
		.attr('stroke-width','16px')
		.attr('stroke-opacity',function(d){ if(d.marker){return 0.3;}else{return 0;}})
		.attr('cx',function(d) { return mGZ(x(d[that.item.config.x])); })
				.attr('cy',function(d) { return mGZ(y(d[that.item.config.y])); })
				.transition().duration(animate?DUR:0)
		.attr('r',(sizeObj.width <= mobileThreshold)?2.1:3.2)




	//Trendline
	if(that.item.config.showTrendline){
		that.g.selectAll(".trendline").remove();
		var xLabels = that.data.map(function (d) { return d[that.item.config.x]; })
		// get the x and y values for least squares
		var xSeries = d3.range(1, xLabels.length + 1);
		var ySeries = that.data.map(function(d) { return parseFloat(d[that.item.config.y]); });

		var leastSquaresCoeff = leastSquares(xSeries, ySeries);

		// apply the reults of the least squares regression
		var x1 = xLabels[0];
		var y1 = leastSquaresCoeff[0] + leastSquaresCoeff[1];
		var x2 = xLabels[xLabels.length - 1];
		var y2 = leastSquaresCoeff[0] * xSeries.length + leastSquaresCoeff[1];
		var trendData = [[x1,y1,x2,y2]];

		that.g.selectAll(".trendline")
			.data(trendData)
			.enter()
			.append("line")
			.attr("class", "trendline")
			.attr("x1", function(d) { return x(d[0]); })
			.attr("y1", function(d) { return y(d[1]); })
			.attr("x2", function(d) { return x(d[2]); })
			.attr("y2", function(d) { return y(d[3]); })
			.attr("stroke",'#878A8F')
			.attr("stroke-dasharray", "5, 3")
			.attr("stroke-width", 3)
			.attr("stroke-opacity", 0)
			.transition().duration(animate?DUR*3:0)
			.attr("stroke-opacity", 0.9);
	}
}



}

//For proper formating of the text
function formatLabel(val,config){
	var label = val;
	var pre = config.yFormat;

	if(that.item && that.item.config && that.item.config.yRoundDecimal){
		label = Math.round(label)
	}
	if(that.item && that.item.config && that.item.config.yRoundDecimalOneplace){
		label = d3.format("." + 1 + "f")(label)
	}
	if(that.item && that.item.config && that.item.config.yRoundDecimalTwoplaces){
		label = d3.format("." + 2 + "f")(label)
	}
	if(that.item && that.item.config && that.item.config.yRoundDecimalThreeplaces){
		label = d3.format("." + 3 + "f")(label)
	}
	if(that.item && that.item.config && that.item.config.yComma){
		label = d3.format("." + 2 + "r")(label)
		label = d3.format(',')(label)
	}

	//value and pre/su-fix
	if(pre === '$'){
		return pre + label;
	}else{
		return label + (pre||'')
	}
}

// return 0 if less than 0 or non num, to makeGreaterthanZero
function mGZ(d){
	if(d < 0 || isNaN(d)){
		return 0;
	}
	return d;
}

// returns slope, intercept and r-square of the line
function leastSquares(xSeries, ySeries) {
	var reduceSumFunc = function(prev, cur) { return prev + cur; };

	var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
	var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

	var ssXX = xSeries.map(function(d) { return Math.pow(d - xBar, 2); })
		.reduce(reduceSumFunc);

	var ssYY = ySeries.map(function(d) { return Math.pow(d - yBar, 2); })
		.reduce(reduceSumFunc);

	var ssXY = xSeries.map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
		.reduce(reduceSumFunc);

	var slope = ssXY / ssXX;
	var intercept = yBar - (xBar * slope);
	var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);

	return [slope, intercept, rSquare];
}

// Tooltip for bar and line chart
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

	if(d.callout){
		that.tooltip.html(d.text)
	}else{
	    if(that.item && that.item.type.indexOf('pie') > -1){
		    that.tooltip.html(d.data.key + ", <b>"  + d.data.value+ "% </b>" );
	    }else if(that.item && that.item.type.indexOf('verticalbars') > -1){
	    	that.tooltip.html(d)

	    }else if(that.item && that.item.type.indexOf('line:dualaxis') > -1){
	    	if(typeof d[that.item.config.yl] !== 'undefined'){
			    that.tooltip.html("<b>"  + Math.round(d[that.item.config.yl]) + "</b> " +that.item.config.yl +' in ' + that.item.config.x + " <b>"  + d[that.item.config.x] + "</b>" );
	    	}else{
			    that.tooltip.html("<b>"  + Math.round(d[that.item.config.yr]) + "</b> " +that.item.config.yr +' in ' + that.item.config.x + " <b>"  + d[that.item.config.x] + "</b>" );
	    	}
	    }else{
		    that.tooltip.html(that.item.config.y + " is <b>"  + formatLabel(d[that.item.config.y],that.item.config) + "</b> in " +that.item.config.x + " <b>"  + d[that.item.config.x] + "</b>" );
	    }
	}
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

function tooltipTypeAHide(d) {
    that.tooltip.transition()
        .duration(100)
        .style("opacity", 0);
}

//Y axis formater
function tickXformater(d,i){
	var interval = 5;
	if(that.item.config.xInterval){
		interval = that.item.config.xInterval;
	}
	if(that.width < 500){
		interval = 7;
	}
	var finalI = arguments[2] && arguments[2].length && arguments[2].length -1
	if((i % interval == 0 && finalI - i > (interval-1)) || i ==  finalI){
		var label = d;
		return label;
	}
}
//Y axis formater
function tickYformater(d,i){
	var interval = 1;
	var finalI = arguments[2] && arguments[2].length && arguments[2].length -1;
	if((i % interval == 0 && finalI - i > (interval-1)) || i ==  finalI){
		var label = formatLabel(d , (that.item.config))
		ylab=+label
		if(ylab>-1&ylab<1|(ylab>1 & ylab<2)|ylab>-2&ylab<-1&ylab!=0){
		return (ylab).toFixed(3);
	}
	else if(ylab >= 10000) {
		return ylab > 999 ? (ylab/1000).toFixed(1) + 'k' : ylab
	}
	else{
		return ylab
	}
	}
}

//svg line wrapping
function createSVGtext(caption, x, y, M, L) {
    //  This function attempts to create a new svg "text" element, chopping
    //  it up into "tspan" pieces, if the caption is too long
    //
    var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    svgText.setAttributeNS(null, 'x', x);
    svgText.setAttributeNS(null, 'y', y);

    var MAXIMUM_CHARS_PER_LINE = M;
    var LINE_HEIGHT = L;

    var words = caption.split(" ");
    var line = "";

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        if (testLine.length > MAXIMUM_CHARS_PER_LINE)
        {
            //  Add a new <tspan> element
            var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            svgTSpan.setAttributeNS(null, 'x', x);
            svgTSpan.setAttributeNS(null, 'y', y);

            var tSpanTextNode = document.createTextNode(line);
            svgTSpan.appendChild(tSpanTextNode);
            svgText.appendChild(svgTSpan);

            line = words[n] + " ";
            y += LINE_HEIGHT;
        }
        else {
            line = testLine;
        }
    }

    var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    svgTSpan.setAttributeNS(null, 'x', x);
    svgTSpan.setAttributeNS(null, 'y', y);

    var tSpanTextNode = document.createTextNode(line);
    svgTSpan.appendChild(tSpanTextNode);

    svgText.appendChild(svgTSpan);

    return svgText;
}

//Finally export the script
