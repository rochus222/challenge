$(document).ready(function(){
  
  //Inicializacia
  zobraz_podstranku(0);
  vypis_tymy();
  nastav_menu();
  onLoad();
  
  //MENU
  $("#menu-open").click(function(){
    otvor_menu();
  });
  
  $("#clona").click(function(){
    zatvor_menu();
  });
  
  //MENU podstranky
  $("#menu-1").click(function(){
    zobraz_podstranku('1');
  });
    
  $("#menu-2").click(function(){
    zobraz_podstranku('3');
  });
 
  $("#menu-3").click(function(){
    zobraz_podstranku('4');
  });  
    
  $("#menu-4").click(function(){
    vypis_turnaje();
    //zobraz_podstranku('9');
  }); 
  
  $("#menu-5").click(function(){
    vypis_statistiky_timov();
  });
    
  $("#menu-6").click(function(){
    zobraz_podstranku('5');
  });
  
  $("#menu-7").click(function(){
    zobraz_nastavenia();
  });
  
  $("#menu-8").click(function(){
    zobraz_podstranku('6');
  });
});

function onLoad()
{
  document.addEventListener("deviceready", onDeviceReady, true);
}
  
function onDeviceReady() 
{
  document.addEventListener("backbutton", onBackKeyDown, false);
}
  
function exitFromApp()
{
  navigator.app.exitApp();
}

var page=0;
function onBackKeyDown()
{
  if(otvorene_menu==1)
  {
    zatvor_menu();
  }
  else if(page==0)
  {
    ukonciappku();
  }
  else if(page==1)
  {
    zobraz_podstranku('0');
  }
  else if(page==2)
  {
    spat_na_vyber_tymov();
  }
  else if(page==3)
  {
    zobraz_podstranku('0');
  }
  else if(page==4)
  {
    zobraz_podstranku('0');
  }
  else if(page==5)
  {
    zobraz_podstranku('0');
  }
  else if(page==6)
  {
    zobraz_podstranku('0');
  }
  else if(page==7)
  {
    if(je_zobrazena_tabulka_vysledkov_zapasu==1)($("#vysledky").css({"display":"none"}));
    else zobraz_podstranku('4');
  }
  else if(page==8)
  {
    zobraz_podstranku('0');
  }
  else if(page==9)
  {
    zobraz_podstranku('0');
  }
  else if(page==10)
  {
    zobraz_podstranku('0');
  }
  else if(page==11)
  {
    zobraz_podstranku('10');
  } 
  else if(page==12)
  {
    zobraz_podstranku('3');
  } 
}

function ukonciappku()
{
  var answer = confirm(""+lang_close_app+"")
  if (answer)
  {
    navigator.app.exitApp();
  }
}