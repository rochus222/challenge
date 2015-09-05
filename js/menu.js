/*nastavenie menu ci je rozohraty turnaj a ma zobrazovat tabulku a zapasy alebo nie*/
function nastav_menu()
{
  nastav_popisy_v_menu();
  if(zacaty_turnaj==0)
  {
    $("#menu-2").css({"display":"none"});
    $("#menu-3").css({"display":"none"});
  }
  else
  {
    $("#menu-2").css({"display":"block"});
    $("#menu-3").css({"display":"block"});
  }
}

function nastav_popisy_v_menu()
{
  $("#menu-nazov").html(lang_stolny_futbal);
  $("#menu-1").html(lang_novy_turnaj);
  $("#menu-2").html(lang_aktulana_tabulka);
  $("#menu-3").html(lang_aktualne_zapasy);
  $("#menu-4").html(lang_turnaje);
  $("#menu-5").html(lang_statistiky_timov);
  $("#menu-6").html(lang_pravidla);
  $("#menu-7").html(lang_nastavenia);
  $("#menu-8").html(lang_o_aplikacii);
}

/*funkcia na otvorenie menu*/
var otvorene_menu=0;
function otvor_menu()
{
  otvorene_menu=1;
  $("#clona").css({"left":"0"});
  $("#clona").animate({"opacity":"1"},400);
  $("#menu-open").css({"-webkit-transform": "translate(-50px,0px)","transform": "translate(-50px,0px)"});
  setTimeout(function () {$("#menu-content").css({"-webkit-transform": "translate(100%,0px)","transform": "translate(100%,0px)"});},100);
  /*$("#menu-open").animate({"left":"-50px"},100, "linear", function(){
    $("#menu-content").animate({"left": "0%"},300);
  });*/
}

/*funkcia na zatvorenie menu*/
function zatvor_menu()
{
  otvorene_menu=0;
  $("#clona").animate({"opacity":"0"},400);
  $("#menu-content").css({"-webkit-transform": "translate(-100%,0px)","transform": "translate(-100%,0px)"});
  setTimeout(function () {
    $("#menu-open").css({"-webkit-transform": "translate(0px,0px)","transform": "translate(0px,0px)"});
    $("#clona").css({"left":"-100%"});
  },300);
  /*$("#menu-content").animate({"left": "-80%"},300,"linear",function(){
    $("#menu-open").animate({"left":"0px"},100,"linear",function(){$("#clona").css({"left":"-100%"});});
  });*/
}

/*funkcia na vlozenie obsahu na stranku z dat ulozenych v pole*/
function zobraz_podstranku(stranka)
{
  $('#head').html(obsah_stranky[stranka][0]);
  $('#page').html(obsah_stranky[stranka][1]);
  page=stranka;
  zatvor_menu();
}
