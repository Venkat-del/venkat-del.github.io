current_data = []
var read_data = function(name,chart_type,st_yr,trnd){
  curr="single"
  $("#chrt-opt").show()
    $("#chrt-opt1").html("")
    //$(".main").html(foundation)
  chart_id = name
  figure = []
  figure.subtitle = `The Foundation Index measures changes that are fundamental to the business landscape, including advances in technology performance, rates of infrastructure penetration, and trends toward liberalization in public policies.

The cost/performance of the core digital technology building blocks has been improving exponentially for decades and at a faster rate than that of previous technologies. As a result, increasingly powerful and affordable mobile devices, combined with robust connectivity, enable individuals and institutions to more easily connect and communicate. At the same time, these core digital components combine in innovative ways to create new tools, including powerful cloud capabilities, that enable new business models and ways of working. Public policies that reduce barriers to the movement of people, resources, and capital tend to reinforce the changes catalyzed by the digital infrastructure.

The metrics in the Foundation Index provide leading indicators for potential change in other areas.`
  figure['data'] = []
  figure.title = ""
  figure.type=chart_type+':single',
	figure.source='Deloitte analysis.'
  min=0
  max=0
  d3.csv("full_data.csv", function(error, data) {
    if (error) throw error;
    data_sub = data.filter(function(d) {return d["ID Code"]==name;})
    current_data = data_sub;
    year_data = $.each(data_sub,function(key,value){
      $.each(value,function(key1,value1){
        if(Number(key1) >= st_yr & Number(key1) <= 2015){
      if(+value1 < min) {min=+value1};
      if(+value1 > max){ max = +value1};
      d={}
      leg = {}
      leg[value.Label] = '#00B5AF'
      d['Year'] = +key1
      d[value.Label] = +value1
      figure['data'].push(d)
      figure.config = {
    		x:'Year',
    		y:value.Label,
    		legend:leg,
        showTrendline:trnd=='true'?true:false,
    		yLabel:value.Label,
        xLabel:'Year',
    		yLog:false,
    		yLimit:false,
    		yFormat:'',
        xRaise:0,
        yRange:[-10,10]
    	}

    }
  }
)});
figure.config.yRange = [min,max];
figure.config.legendComponent=[]
figure.config.legendComponent.push({color:"#00B5AF"})
plotchart(figure)
}
)

}


var read_data_comp = function(name1,name2,chart_type,st_yrl,st_yrr,trnd){
  curr = "comparison"
    //$(".main").html(foundation)
  chart_id = name
  figure = []
  figure.subtitle = `Select the charts from above options to compare.\n
  Dynamic Generated text can be added here!!
  `
  figure['data'] = {}
  figure['data']['yl'] = []
  figure['data']['yr'] = []
  figure.title = ""
  figure.type=chart_type+':dualaxis',
	figure.source='Deloitte analysis.',
  figure.config = {
    x:'Year',
    showTrendline:trnd=='true'?true:false,
    yLog:false,
    yLimit:false,
    yFormat:'',
  }

  figure['config']['legendComponent'] = []
  d3.csv("full_data.csv", function(error, data) {
    if (error) throw error;
    data_sub = data.filter(function(d) {return d["ID Code"]==name1;})
    data_sub1 = data.filter(function(d) {return d["ID Code"]==name2;})
    year_data = $.each(data_sub,function(key,value){
      $.each(value,function(key1,value1){
        if(Number(key1) >= st_yrl & Number(key1) <= 2015){
      d={}
      leg = {}
      leg_comp = {}
      leg[value.Label] = '#00B5AF'
      leg_comp['color'] = '#00B5AF'
      leg_comp['name'] = value.Label
      leg_comp['shape'] = 'block'
      d['Year'] = +key1
      d[value.Label] = +value1
      figure['data']['yl'].push(d)


    }
  })

figure.config['legendComponent'].push(leg_comp)
figure.config.yl = value.Label
figure.config.yLabel =  value.Label
figure.config['showLegendAboveChart'] = true
})
year_data = $.each(data_sub1,function(key,value){
  $.each(value,function(key1,value1){
    if(Number(key1) >= st_yrr & Number(key1) <= 2015){
  d={}

  leg_comp = {}
  leg[value.Label] = '#00AAE7'
  leg_comp['color'] = '#00AAE7'
  leg_comp['name'] = value.Label

  leg_comp['shape'] = 'block'
  d['Year'] = +key1
  d[value.Label] = +value1
  figure['data']['yr'].push(d)


}
})
figure.config.yr = value.Label
figure.config.legend = leg
figure.config.yrLabel =  value.Label

  figure['config']['legendComponent'].push(leg_comp)

})

plotchart(figure);
}
)

}


update_ct = function(value){
  chart_type = value
  if(value=='bar'){
    $("option[value='true']")
      .attr("disabled", true)
  }else if(value=='line'){
    $("option[value='true']")
      .attr("disabled", false)
  }
  read_data(chart_id,chart_type,start_year,trend)
}
update_yr = function(value){
  start_year = value
  read_data(chart_id,chart_type,start_year,trend)
}
update_trnd = function(value){
  trend = value
  console.log(trend);
  read_data(chart_id,chart_type,start_year,trend)
}
update_ctl = function(value){
  //chart_type = value

  //read_data(chart_id,chart_type,start_year,trend)
}
update_yrl = function(value){
  st_yrl = value

  read_data_comp(chrt1,chrt2,"line",st_yrl,st_yrr,'true')
}
update_ctr = function(value){

  //read_data(chart_id,chart_type,start_year,trend)
}
update_yrr = function(value){
  st_yrr = value

  read_data_comp(chrt1,chrt2,"line",st_yrl,st_yrr,'true')
}



load_page= function(value){
  if (value == 'FOUNDATION'){
    val = FOUNDATION
  }else if (value == 'FLOW'){
    val = FLOW
  }else if (value == 'IMPACT'){
    val = IMPACT
  }

  d3.select(".chart-wrapper").style("height","86%")
  $("#chrt-flt").html(val)
  read_data(value,chart_type,start_year,trend)
  $("#sngl-chrt").addClass("open")
}

load_comp= function(){

  $("#chrt-opt1").html(comparison2+$("#fltopl").html())
  $("#chrt-flt").html(comparison1+$("#fltopr").html())

  d3.select(".chart-wrapper").style("height","82%")
  initializehtml2()
  read_data_comp(chrt1,chrt2,"line",st_yrl,st_yrr,'true')
}

load_compl_chart = function(v1,v2){
  l_c = v1;
  r_c = v2;
  chrt1= list_charts[v1]
  $("#chl-lab").html(v1)

  read_data_comp(chrt1,chrt2,"line",st_yrl,st_yrr,'true')
}

load_compr_chart = function(v1,v2){
  l_c = v1;
  r_c = v2;
  $("#chr-lab").html(v1)

  chrt2= list_charts[v1]
  read_data_comp(chrt1,chrt2,"line",st_yrl,st_yrr,'true')
}
$('.dropdown-toggle').on('click', function (event) {
    $(this).parent().toggleClass('open');
});
