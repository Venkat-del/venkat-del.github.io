chart_id = 'I1001'
chart_type= 'bar'
start_year='1993'
trend = 'false'
chrt1='FOUNDATION'
chrt2 = 'FLOW'
st_yrl=1993
st_yrr=1993
curr = ""
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
  height = document.getElementsByClassName("chart-area")[0].offsetHeight-60;
  size = {"height":height,"width":width}
  rootElm = d3.select("#App")
  Script.initializeChart(rootElm,size,true,cat)
  d3.select(".notes").html(cat.subtitle)
}

var initializehtml = function(){
  //$(".main").html(foundation)
  d3.select(".chart-menu").style("display","block")
    //  d3.select("#chrt-opt").style("display","block")

    d3.select(".downico").style("display","block")
    d3.select(".main").style("height","80%")
    d3.select("#home").style("display","none")
  d3.select(".notes").style("display","block")
  d3.select("#App").style("display","block")
  d3.select("#App1").style("display","none")
  d3.select(".chart-wrapper").style("height","86%")
  d3.select(".stacked-chart-menu").style("display","none")
  d3.select(".chart-area").style("width","")
}
var initializehtml2 = function(){
  //$(".main").html(foundation)
  d3.select(".chart-menu").style("display","block")
  $("#chrt-opt").hide()

d3.select(".downico").style("display","block")
  d3.select(".main").style("height","80%")
  d3.select("#home").style("display","none")
  d3.select(".notes").style("display","block")
  d3.select("#App").style("display","block")
  d3.select("#App1").style("display","none")
  //d3.select(".chart-wrapper").style("height","86%")
  d3.select(".stacked-chart-menu").style("display","none")
  d3.select(".chart-area").style("width","")
}
var outliers=function(){

}
var home_page = function(){

    d3.select(".chart-wrapper").style("height","100%")
    d3.select(".chart-menu").style("display","none")
    d3.select(".notes").style("display","none")
    d3.select("#App").style("display","none")
    d3.select("#App1").style("display","none")
    d3.select(".downico").style("display","none")
    d3.select("#home").style("display","block")
    d3.select(".stacked-chart-menu").style("display","none")
    d3.select(".main").style("height","88%")
    d3.select(".chart-area").style("height","100%")

    d3.select(".chart-area").style("width","98%")
    $("#home").html(home)
}
function exportCSV() {
            line=""

            if(typeof(figure.data)!="undefined"){

                    array = current_data
                    if(figure.type.split(":")[1]=="single"){
                      f_name = figure.config.y+".csv"
                      var line = 'Key,Value\r\n';
                    for (var i = 0; i < array.length; i++) {

                        for (var index in array[i]) {

                            line += index+","+array[i][index]+ '\r\n';
                        }


                    }
                  }
                  if( figure.type.split(":")[1]=="dualaxis"){
                    array = figure.data
                    f_name = figure.config.yl+"VS"+figure.config.yr+".csv"
                    var line = 'Year,'+figure.config.yl+","+figure.config.yr+'\r\n';
                  for (var i = 0; i < array["yl"].length; i++) {

                          line += array["yl"][i].Year+","+array["yl"][i][figure.config.yl]+","+array["yr"][i][figure.config.yr]+ '\r\n';



                          }
                  }
                }
        else{
          array = current_data
          keys= Object.keys(current_data[0])
          for (var i = 0; i < array.length; i++) {
                  for(j=0; j< keys.length; j++){
                    line += array[i][keys[j]] + ","

                  }
                  line+="\r\n"

          }
        }
            return line;
        }
function downloadFile(type){
  if (type=="svg"){
    downloadpic()
  }
  else{
    downloadCSV()
  }
}
function downloadpic(){
    if (curr=="overview"){
      saveSvgAsPng(document.getElementById("chrt-ovrvw").getElementsByTagName("g")[0],curr+".png")
    }
    else {
      saveSvgAsPng(document.getElementById("App").getElementsByTagName("svg")[0],curr+".png")
    }
}
function downloadCSV() {
        var data, filename, link;

        var csv = exportCSV()
        var filename = f_name
        if (csv == null) return;

        filename = filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.setAttribute('class', "dl_file");

        document.body.appendChild(link);
        console.log(link);
        link.click();
    }




$(".downico > img").mouseover(function(){
  this.src = this.src.replace(".ico","_green.ico")


}
)
$(".downico > img").mouseout(function(){
  this.src = this.src.replace("_green.ico",".ico")


})
plotchart(dummy)
initializeBreadcrumbTrail()
home_page()
