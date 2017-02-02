chart_id = 'I1001'
chart_type= 'bar'
start_year='1993'
trend = 'false'
chrt1='FOUNDATION'
chrt2 = 'FLOW'
st_yrl=1993
st_yrr=1993
function htmlbodyHeightUpdate(){
var height3 = $( window ).height()
var height1 = $('.nav').height()+50
height2 = $('.main').height()
if(height2 > height3){
  $('html').height(Math.max(height1,height3,height2)+10);
  $('body').height(Math.max(height1,height3,height2)+10);
}
else
{
  $('html').height(Math.max(height1,height3,height2));
  $('body').height(Math.max(height1,height3,height2));
}

}
$(document).ready(function () {
htmlbodyHeightUpdate()
$( window ).resize(function() {
  htmlbodyHeightUpdate()
});
$( window ).scroll(function() {
  height2 = $('.main').height()
    htmlbodyHeightUpdate()
});
});
plotchart = function(cat){
  initializehtml()
  data_f=cat;
  width = document.getElementById("App").offsetWidth;
  height = document.getElementsByClassName("chart-area")[0].offsetHeight-30;
  size = {"height":height,"width":width}
  rootElm = d3.select("#App")
  Script.initializeChart(rootElm,size,true,cat)
  d3.select(".notes").html(cat.subtitle)
}

var initializehtml = function(){
  //$(".main").html(foundation)
  d3.select(".chart-menu").style("display","block")
    //  d3.select("#chrt-opt").style("display","block")
  d3.select(".notes").style("display","block")
  d3.select("#App").style("display","block")
  d3.select("#App1").style("display","none")
  //d3.select(".chart-wrapper").style("height","86%")
  d3.select(".stacked-chart-menu").style("display","none")
  d3.select(".chart-area").style("width","")
}
var initializehtml2 = function(){
  //$(".main").html(foundation)
  d3.select(".chart-menu").style("display","block")
  $("#chrt-opt").hide()

  d3.select(".notes").style("display","block")
  d3.select("#App").style("display","block")
  d3.select("#App1").style("display","none")
  //d3.select(".chart-wrapper").style("height","86%")
  d3.select(".stacked-chart-menu").style("display","none")
  d3.select(".chart-area").style("width","")
}
var outliers=function(){

}
plotchart(figure1)

initializeBreadcrumbTrail()
plot_stacked('Shift Index')
