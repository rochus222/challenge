$(document).ready(function(){
  
  //Inicializacia
  //zobrazim titulnu stranku
  zobraz_podstranku(0);
  //vypisem tymy z pola tymy
  vypis_tymy();
  // nastavim menu 
  nastav_menu();
  // spustim fungovanie backbuttonu vo funkcii onLoad
  onLoad();
  
  //MENU 
  
  // otvaranie a zatvaranie
  $("#menu-open").click(function(){
    otvor_menu();
  });
  
  $("#clona").click(function(){
    zatvor_menu();
  });
  
  //MENU podstranky - co sa ma vykonat po kliknuti na policko v menu
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

//onLoad s onDeviceReady nastavy eventlistener na stlacenie backbuttonu
function onLoad()
{
  document.addEventListener("deviceready", onDeviceReady, true);
}
  
function onDeviceReady() 
{
  document.addEventListener("backbutton", onBackKeyDown, false);
}
  
//vypnutie aplikacie
function exitFromApp()
{
  navigator.app.exitApp();
}

//v page je ulozena aktualne zobrazena podstranka
var page=0;
//kam sa ma ist po stlaceni backbuttonu podla toho, na ktorej podstranke sa nachadzame
function onBackKeyDown()
{
  //ak je otvorene menu tak sa zavre
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
    //ak su otvorene velke vysledky tak sa zavru
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

//vypnutie appky az po potvrdeni confirmu
function ukonciappku()
{
  var answer = confirm(""+lang_close_app+"")
  if (answer)
  {
    navigator.app.exitApp();
  }
}