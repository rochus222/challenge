/*LOADING*/
//riesenie otvorenia a zatvorenia loadingu z ggrafickeho hladiska
var loading_rotate;
var loading_uhol=0;
function start_loading()
{
  var top=($('body').height())/2-50;
  $("#clona").css({"left":"0"});
  $("#clona").css({"opacity":"1"});
  $('#loading').css({"top":top+"px"});
  $('#loading').css({"opacity":"1"});
  loading_rotate=setTimeout(otoc_loading,50);
}

function otoc_loading()
{
  loading_uhol+=5;
  $('#loading').css({"transform":"rotate("+loading_uhol+"deg)"});
  loading_rotate=setTimeout(otoc_loading,50);
}

function stop_loading()
{
  clearTimeout(loading_rotate);
  $("#clona").css({"opacity":"0"});
  $('#loading').css({"opacity":"0"});
  $("#clona").css({"left":"-100%"});
  $('#loading').css({"top":"-1%00px"});
}
/********/