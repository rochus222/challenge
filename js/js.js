ziskaj_popisy_v_jazyku();
if(localStorage.prvy_krat===undefined)
{
  localStorage.pocet_bodov_za_vyhru=3;
  localStorage.pocet_bodov_za_remizu=1;
  localStorage.pocet_bodov_za_prehru=0;

  localStorage.pocet_postupujucich_tymov=2;
  localStorage.hra_sa_na_odvetu=1;
  localStorage.nahodny_vyber_pri_play_off_turnaju=0;
  
  localStorage.prvy_krat=0;
}
//head, obsah stranky
var obsah_stranky=[
  ["", "<div onClick=\"zobraz_podstranku('1');\" class=\"mainpage\"><img width=\"80%\" style=\"margin-top:20%;\" src=\"img/logo.png\"/><div class=\"home-button\">"+lang_vytvor_turnaj+"</div></div>"],
  [""+lang_zvol_timy+"", ""],
  [""+lang_novy_turnaj+"", ""],
  [""+lang_tabulka+"", ""],
  [""+lang_zapasy+"", ""],
  [""+lang_pravidla+"", ""+lang_pravidla_sub+""],
  [""+lang_o_aplikacii+"", ""+lang_o_aplikacii_sub+""],
  [""+lang_vysledok+"", ""],
  [""+lang_nastavenia+"", ""],
  [""+lang_turnaje+"", ""],
  [""+lang_statistiky_timov+"", ""],
  ["", ""],
  ["", ""]
];

if(localStorage.tymyvpamati===undefined)tymy=[];
else tymy=JSON.parse(localStorage.tymyvpamati);
//id,turnaj, kolo, prvy tym, druhy tym, gol prvy tym, gol druhy tym, skupina, zakaz editacie
if(localStorage.zapasyvpamati===undefined)zapasy=[];
else zapasy=JSON.parse(localStorage.zapasyvpamati);

//id, nazov, typ, pocet_skupin, localStorage.pocet_bodov_za_vyhru, localStorage.pocet_bodov_za_remizu localStorage.pocet_bodov_za_prehru
if(localStorage.turnajevpamati===undefined)turnaje=[];
else turnaje=JSON.parse(localStorage.turnajevpamati);

var vytvor_turnaj_nazov="";
var vytvor_turnaj_typ="";
var vytvor_turnaj_pocet_skupin="";

var zacaty_turnaj=0;

var aktualny_turnaj_nazov="";
var aktualny_turnaj_typ="";
var aktualny_turnaj_pocet_skupin="";
var aktualny_turnaj_id="";

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

/*LOADING*/
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

/*nastavenia*/
function zobraz_nastavenia()
{
  var option="";
  var selected;
  for(var i=0;i<21;i++)
  {
    if(localStorage.pocet_bodov_za_vyhru==i)selected="selected";
    else selected="";
    option=option+"<option value=\""+i+"\" "+selected+">"+i+"</option>";
  }
  
  string="<h1>"+lang_nastavenie_bodovania+"</h1>";
  string+="<label><div class=\"zapas-team\">"+lang_body_za_vyhru+"</div><div class=\"zapas-vysledok-select\"><select id=\"body_vyhra\">"+option+"</select></div></label>";
  
  var option="";
  var selected;
  for(var i=0;i<21;i++)
  {
    if(localStorage.pocet_bodov_za_remizu==i)selected="selected";
    else selected="";
    option=option+"<option value=\""+i+"\" "+selected+">"+i+"</option>";
  }
  string+="<label><div class=\"zapas-team\">"+lang_body_za_remizu+"</div><div class=\"zapas-vysledok-select\"><select id=\"body_remiza\">"+option+"</select></div></label>";
  
  var option="";
  var selected;
  for(var i=0;i<21;i++)
  {
    if(localStorage.pocet_bodov_za_prehru==i)selected="selected";
    else selected="";
    option=option+"<option value=\""+i+"\" "+selected+">"+i+"</option>";
  }
  string+="<label><div class=\"zapas-team\">"+lang_body_za_prehru+"</div><div class=\"zapas-vysledok-select\"><select id=\"body_prehra\">"+option+"</select></div></label>";
  
  string+="<br style=\"clear:both;\"/><h1>"+lang_nastavenie_skupin+"</h1>";
  var option="";
  var selected1="";
  var selected2="";
  var selected4="";
  var selected8="";
  if(localStorage.pocet_postupujucich_tymov==1)selected1="selected";
  if(localStorage.pocet_postupujucich_tymov==2)selected2="selected";
  if(localStorage.pocet_postupujucich_tymov==4)selected4="selected";
  if(localStorage.pocet_postupujucich_tymov==8)selected8="selected";
  string+="<label><div class=\"zapas-team\">"+lang_pocet_postupujucich+"</div><div class=\"zapas-vysledok-select\"><select id=\"pocet_postupujucich\"><option value=\"1\" "+selected1+">1</option><option value=\"2\" "+selected2+">2</option><option value=\"4\" "+selected4+">4</option><option value=\"8\" "+selected8+">8</option>"+option+"</select></div></label>";

  var selected1="";
  var selected0="";
  if(localStorage.hra_sa_na_odvetu==1)selected1="selected";
  else if(localStorage.hra_sa_na_odvetu==0)selected0="selected"
  string+="<label><div class=\"zapas-team\">"+lang_hra_sa_na_odvetu+"</div><div class=\"zapas-vysledok-select\"><select id=\"odveta\"><option value=\"1\" "+selected1+">"+lang_ano+"</option><option value=\"0\" "+selected0+">"+lang_nie+"</option></select></div></label>";
  
  selected1="";
  selected0="";
  if(localStorage.nahodny_vyber_pri_play_off_turnaju==1)selected1="selected";
  else if(localStorage.nahodny_vyber_pri_play_off_turnaju==0)selected0="selected"
  string+="<label><div class=\"zapas-team\">"+lang_nahodne_play_off_v_turnaji+"</div><div class=\"zapas-vysledok-select\"><select id=\"nahodny_vyber\"><option value=\"1\" "+selected1+">"+lang_ano+"</option><option value=\"0\" "+selected0+">"+lang_nie+"</option></select></div></label>";
  
  string+="<br style=\"clear:both;\"/><h1>"+lang_nastavenie_aplikacie+"</h1>";
  var selectedsk="";
  var selecteden="";
  if(localStorage.lang=="sk")selectedsk="selected";
  else if(localStorage.lang=="en")selecteden="selected"
  string+="<label><div class=\"zapas-team\">"+lang_jazyk+"</div><div class=\"zapas-vysledok-select\"><select id=\"jazyk\"><option value=\"sk\" "+selectedsk+">Slovenký jazyk</option><option value=\"en\" "+selecteden+">English</option></select></div></label>";
  
  
  string+="<br /><button onClick=\"odstran_vsetky_udaje();\" class=\"back\" style=\"width:100%;\">"+lang_povodne_nastavenia+"</button><br>";
  
  string+="<button onClick=\"uloz_nastavenia();\" style=\"width:100%;\">"+lang_ulozit_nastavenia+"</button>";
  obsah_stranky[8][1]=string;
  zobraz_podstranku('8');
}

function uloz_nastavenia()
{
  localStorage.pocet_bodov_za_vyhru=parseInt($('#body_vyhra').val(), 10);
  localStorage.pocet_bodov_za_remizu=parseInt($('#body_remiza').val(), 10);
  localStorage.pocet_bodov_za_prehru=parseInt($('#body_prehra').val(), 10);
  localStorage.pocet_postupujucich_tymov=parseInt($('#pocet_postupujucich').val(), 10);
  localStorage.hra_sa_na_odvetu=parseInt($('#odveta').val(), 10);
  localStorage.nahodny_vyber_pri_play_off_turnaju=parseInt($('#nahodny_vyber').val(), 10);
  localStorage.lang=$('#jazyk').val();
  zmen_jazyk();
  zobraz_nastavenia();
  alert(""+lang_nastavenia_boli_zmenene+"");
}

function zmen_jazyk()
{
  ziskaj_popisy_v_jazyku();
  update_podstranok();
  vypis_tymy();
  nastav_menu();
}

function update_podstranok()
{
  obsah_stranky=[
  ["", "<div onClick=\"zobraz_podstranku('1');\" class=\"mainpage\"><img width=\"80%\" style=\"margin-top:20%;\" src=\"img/logo.png\"/><div class=\"home-button\">"+lang_vytvor_turnaj+"</div></div>"],
  [""+lang_zvol_timy+"", ""],
  [""+lang_novy_turnaj+"", ""],
  [""+lang_tabulka+"", ""],
  [""+lang_zapasy+"", ""],
  [""+lang_pravidla+"", ""+lang_pravidla_sub+""],
  [""+lang_o_aplikacii+"", ""+lang_o_aplikacii_sub+""],
  [""+lang_vysledok+"", ""],
  [""+lang_nastavenia+"", ""],
  [""+lang_turnaje+"", ""],
  [""+lang_statistiky_timov+"", ""],
  ["", ""]
];
}

function odstran_vsetky_udaje()
{
  if(!confirm(""+lang_povodne_nastavenia_confirm+""))return false;
  localStorage.pocet_bodov_za_vyhru=3;
  localStorage.pocet_bodov_za_remizu=1;
  localStorage.pocet_bodov_za_prehru=0;

  localStorage.pocet_postupujucich_tymov=2;
  localStorage.hra_sa_na_odvetu=1;
  localStorage.nahodny_vyber_pri_play_off_turnaju=0;
  
  tymy=[];
  localStorage.tymyvpamati=JSON.stringify([]);
  zapasy=[];
  localStorage.zapasyvpamati=JSON.stringify([]);
  turnaje=[];
  localStorage.turnajevpamati=JSON.stringify([]);
  
  vypis_tymy();
  zacaty_turnaj=0;
  nastav_menu();
  
  alert(""+lang_povodne_nastavenia_alert+"");
}

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
  $("#menu-open").animate({"left":"-50px"},100, "linear", function(){
    $("#menu-content").animate({"left": "0%"},300);
  });
}

/*funkcia na zatvorenie menu*/
function zatvor_menu()
{
  otvorene_menu=0;
  $("#clona").animate({"opacity":"0"},400);
  $("#menu-content").animate({"left": "-80%"},300,"linear",function(){
    $("#menu-open").animate({"left":"0px"},100,"linear",function(){$("#clona").css({"left":"-100%"});});
  });
}

/*funkcia na vlozenie obsahu na stranku z dat ulozenych v pole*/
function zobraz_podstranku(stranka)
{
  $('#head').html(obsah_stranky[stranka][0]);
  $('#page').html(obsah_stranky[stranka][1]);
  page=stranka;
  zatvor_menu();
}

function vypis_tymy()
{
  var stranka="";
  stranka=stranka+"<div class=\"add-input\"><input type=\"text\" id=\"add_team_text\" placeholder=\""+lang_pridat_team+"\"></input><div id=\"add_team\" class=\"add-submit\" onClick=\"pridaj_team();\"><p>+</p></div></div>";
  stranka+="<button id=\"dalej_udaje_turnaja\" onClick=\"zadanie_udajov_turnaja()\" class=\"next\">&#x25ba;</button>";
  for(var i=0; i<tymy.length;i++)
  {
    if(tymy[i][2]==1)checked='checked';
    else checked="";
    stranka=stranka+"<label><div class=\"team\"><input type=\"checkbox\" class=\"team-check\" id=\""+tymy[i][1]+"\" "+checked+"/>"+tymy[i][0]+"</div></label>";
  }
  obsah_stranky[1][1]=stranka;
}

function pridaj_team()
{
  vloz_tymy_do_aktualneho_turnaju();
  var team=$('#add_team_text').val();
  var team_popis=team.replace(" ","_").toLowerCase();
  if(uz_team_existuje(team_popis))
  {
    alert(lang_tym_uz_existuje);
    return false;
  }
  if(!confirm(lang_pridaj_team_1+""+team+""+lang_pridaj_team_2))return false;
  if(team!="")tymy.push([team,team_popis]);
  
  localStorage.tymyvpamati=JSON.stringify(tymy);
  
  vypis_tymy();
  zobraz_podstranku(1);
}

function uz_team_existuje(team_popis)
{
  var pocitadlo=0;
  for(var i=0; i<tymy.length; i++)
  {
    if(tymy[i][1]==team_popis)pocitadlo++;
  }
  if(pocitadlo>0)return true;
  else return false;
}

function vloz_tymy_do_aktualneho_turnaju()
{
  for(var i=0; i<tymy.length;i++)
  {
    if($('#'+tymy[i][1]).prop('checked'))tymy[i][2]=1;
    else tymy[i][2]=0;
  }
}

function zadanie_udajov_turnaja()
{
  vloz_tymy_do_aktualneho_turnaju();
  vypln_hodnoty_turnaja();
  zobraz_podstranku('2');
  zobraz_pocet_skupin();
}

function vypln_hodnoty_turnaja()
{
  var liga="";
  var play_off="";
  var turnaj="";
  
  var skupiny1="";
  var skupiny2="";
  var skupiny4="";
  var skupiny8="";
  
  if(vytvor_turnaj_typ=="liga")liga="selected";
  if(vytvor_turnaj_typ=="play_off")play_off="selected";
  if(vytvor_turnaj_typ=="turnaj")turnaj="selected";
  
  if(vytvor_turnaj_typ=="turnaj")
  {
    if(vytvor_turnaj_pocet_skupin==1)skupiny1="selected";
    if(vytvor_turnaj_pocet_skupin==2)skupiny2="selected";
    if(vytvor_turnaj_pocet_skupin==4)skupiny4="selected";
    if(vytvor_turnaj_pocet_skupin==8)skupiny8="selected";
  }
  
  obsah_stranky[2][1]="<input type=\"text\" maxlength=\"50\" name=\"nazov_turnaja\" id=\"nazov_turnaja\" placeholder=\""+lang_nazov_turnaja+"\" value=\""+vytvor_turnaj_nazov+"\"/><select onChange=\"zobraz_pocet_skupin()\" name=\"typ_turnaju\" id=\"typ_turnaju\"><option value=\"liga\" "+liga+">"+lang_liga+"</option><option value=\"play_off\" "+play_off+">"+lang_play_off+"</option><option value=\"turnaj\" "+turnaj+">"+lang_turnaj+"</option></select><select id=\"pocet_skupin\" class=\"pocet_skupin\" name=\"pocet_skupin\"><option value=\"1\" "+skupiny1+">1</option><option value=\"2\" "+skupiny2+">2</option><option value=\"4\" "+skupiny4+">4</option><option value=\"8\" "+skupiny8+">8</option></select><button id=\"spat_vyber_teamov\" style=\"width\"20%\" class=\"back\" onclick=\"spat_na_vyber_tymov();\">"+lang_spat+"</button><button id=\"spat_vyber_teamov\" style=\"width:75%;\" onClick=\"generovat_turnaj();\">"+lang_generovat_turnaj+"</button>";
  

}

function zobraz_pocet_skupin()
{
  if($('#typ_turnaju').val()=="turnaj")$('#pocet_skupin').css({"display":"block"});
  else $('#pocet_skupin').css({"display":"none"});
}

function spat_na_vyber_tymov()
{
  uloz_udaje_turnaja();
  vypis_tymy();
  zobraz_podstranku(1);
}

function uloz_udaje_turnaja()
{
  vytvor_turnaj_nazov=$('#nazov_turnaja').val();
  vytvor_turnaj_typ=$('#typ_turnaju').val();
  vytvor_turnaj_pocet_skupin=$('#pocet_skupin').val();
}

//generovanie turnaja zo zadanych udajov
function generovat_turnaj()
{
  if($('#nazov_turnaja').val()=="")
  {
    alert(neni_zadany_nazov_turnaja);
    return false;
  }
  start_loading();
  uloz_udaje_turnaja();
  zacaty_turnaj=1;
  nastav_menu(); 
  
  funkcie_pri_generovani()
  
  zobraz_podstranku(4);
  stop_loading();
}

function funkcie_pri_generovani()
{
  presun_z_vytvor_do_aktual();
  ulozit_tymy_aktualneho_turnaju();
  
  turnaje.push([(turnaje.length),aktualny_turnaj_nazov,aktualny_turnaj_typ,aktualny_turnaj_pocet_skupin,localStorage.pocet_bodov_za_vyhru,localStorage.pocet_bodov_za_remizu,localStorage.pocet_bodov_za_prehru]);
  aktualny_turnaj_id=turnaje.length-1;
  
  if(aktualny_turnaj_typ=="liga")vygeneruj_turnaj_liga();
  if(aktualny_turnaj_typ=="play_off")vygeneruj_turnaj_play_off();
  if(aktualny_turnaj_typ=="turnaj")vygeneruj_turnaj_turnaj();
  
  localStorage.turnajevpamati=JSON.stringify(turnaje);
  localStorage.zapasyvpamati=JSON.stringify(zapasy);
  
  var tabulka=ziskaj_tabulku_podla_zapasov();
  vykresli_tabulku(zorad_tabulku_podla_bodov(tabulka));
}

function presun_z_vytvor_do_aktual()
{
  aktualny_turnaj_nazov=vytvor_turnaj_nazov;
  aktualny_turnaj_typ=vytvor_turnaj_typ;
  aktualny_turnaj_pocet_skupin=vytvor_turnaj_pocet_skupin;
  
  vytvor_turnaj_nazov="";
  vytvor_turnaj_typ="";
  vytvor_turnaj_pocet_skupin="";
}

function ulozit_tymy_aktualneho_turnaju()
{
  for(var i=0; i<tymy.length;i++)
  {
    if(tymy[i][2]==1)tymy[i][3]=1;
    else tymy[i][3]=0;
    tymy[i][2]=0;
  }
}

function vygeneruj_turnaj_liga()
{
  var tym1;
  var tym2;
  var watchdog=0;
  var chod_od_znova=0;
  var pocet_tymov=ziskaj_pocet_tymov_aktualneho_turnaju();
  var pocet_watchdog=1000;
  var watchdog_over=0;
  var pocet_watchdog_over=50;
  if(pocet_tymov%2==0)pocet_kol=pocet_tymov*2-2;
  else pocet_kol=pocet_tymov*2;
  if(localStorage.hra_sa_na_odvetu==0)pocet_kol=pocet_kol/2;
  for(var i=0; i<pocet_kol; i++)
  {
    //alert(watchdog+" "+zapasy);
    chod_od_znova=0;
    //alert(i+" "+pocet_kol);
    for(var j=0; j<Math.floor(pocet_tymov/2); j++)
    {
      watchdog=0;
      tym1=Math.floor((Math.random() * pocet_tymov));
      tym2=Math.floor((Math.random() * pocet_tymov));
      while(tym1==tym2||tym_uz_v_kole_hral(tym1,tym2,i+1)||zapas_uz_existuje(tym1,tym2,pocet_tymov))
      {
        tym1=Math.floor((Math.random() * pocet_tymov));
        tym2=Math.floor((Math.random() * pocet_tymov));
        watchdog++;
        if(watchdog>pocet_watchdog)
        {
          watchdog_over++;
          if(watchdog_over>pocet_watchdog_over)
          {
            odstran_zapasy_turnaja(aktualny_turnaj_id);
            vygeneruj_turnaj_liga();
            return 0;
          }
          //alert("ok");
          odstran_zapasy_turnaja_a_kola(aktualny_turnaj_id,i+1);
          chod_od_znova=1;
          break;
        }
      }
      if(chod_od_znova==1)break;
      zapasy.push([zapasy.length, aktualny_turnaj_id, i+1, ziskaj_id_tymu(tym1), ziskaj_id_tymu(tym2),"-","-"]);
      //alert(ziskaj_id_tymu(tym1)+" "+ziskaj_id_tymu(tym2));
    }
    if(chod_od_znova==1)
    {
      i--;
      continue;
    }
  }
  vypis_zapasy_aktualny_turnaj();
}

function odstran_zapasy_turnaja(turnaj)
{
  var zapasy_old=[];
  var poc=0;
  for(var i=0; i<zapasy.length; i++)
  {
    if(!(zapasy[i][1]==turnaj))
    {
      zapasy_old[poc]=zapasy[i];
      poc++;
    }
  }
  zapasy=[];
  zapasy=zapasy_old;
}

function odstran_zapasy_turnaja_a_kola(turnaj,kolo,tabulka)
{
  var zapasy_old=[];
  var poc=0;
  for(var i=0; i<zapasy.length; i++)
  {
    if(!(zapasy[i][1]==turnaj&&zapasy[i][2]==kolo&&(tabulka==zapasy[i][7])))
    {
      zapasy_old[poc]=zapasy[i];
      poc++;
    }
  }
  zapasy=[];
  zapasy=zapasy_old;
}

function vygeneruj_turnaj_play_off()
{
  var tym1;
  var tym2;
  var pocet_tymov=ziskaj_pocet_tymov_aktualneho_turnaju();

  var pom=2;
  while(pom<=pocet_tymov)
  {
    pom=pom*2;
  }
  pom=pom/2;
  var pocet_v_predkole=pocet_tymov-pom;
  for(var j=0; j<pocet_v_predkole; j++)
  {
    tym1=Math.floor((Math.random() * pocet_tymov));
    tym2=Math.floor((Math.random() * pocet_tymov));
    while(tym1==tym2||tym_uz_v_kole_hral(tym1,tym2,0))
    {
      tym1=Math.floor((Math.random() * pocet_tymov));
      tym2=Math.floor((Math.random() * pocet_tymov));
    }
    zapasy.push([zapasy.length, aktualny_turnaj_id, 0, ziskaj_id_tymu(tym1), ziskaj_id_tymu(tym2),"-","-"]);
    //alert(ziskaj_id_tymu(tym1)+" "+ziskaj_id_tymu(tym2));
  }
  var tymy_po_predkole=[];
  var je_v_predkole=0;
  for(var i=0; i<tymy.length; i++)
  {
    if(tymy[i][3]==1)
    {
      je_v_predkole=0;
      for(var j=0;j<zapasy.length;j++)
      {
        if(tymy[i][3]==1&&zapasy[j][2]==0&&zapasy[j][1]==aktualny_turnaj_id)
        {
          if(zapasy[j][3]==tymy[i][1])je_v_predkole=1;
          if(zapasy[j][4]==tymy[i][1])je_v_predkole=1;
        }
      }
      if(!je_v_predkole)tymy_po_predkole.push(tymy[i][1]);
    }
  }
  for(var j=0; j<zapasy.length; j++)
  {
    if(zapasy[j][2]==0&&zapasy[j][1]==aktualny_turnaj_id)
    {
      zapas_z_predkola="#tymid_"+zapasy[j][0];
      tymy_po_predkole.push(zapas_z_predkola); 
    }
  }
  pocet_tymov=pom;
  var tymy_po_kole=tymy_po_predkole;
  var tymy_vitazi=[];
  
  i=1;
  while(1)
  {
    pocet_tymov=tymy_po_kole.length;
    for(j=0;j<pocet_tymov/2;j++)
    {
      tym1=Math.floor((Math.random() * pocet_tymov));
      tym2=Math.floor((Math.random() * pocet_tymov));
      while(tym1==tym2||zapas_uz_existuje(tymy_po_kole[tym1],tymy_po_kole[tym2])||tym_uz_v_kole_hral(tymy_po_kole[tym1],tymy_po_kole[tym2],i))
      {
        tym1=Math.floor((Math.random() * pocet_tymov));
        tym2=Math.floor((Math.random() * pocet_tymov));
      }
      zapasy.push([zapasy.length, aktualny_turnaj_id, i, tymy_po_kole[tym1], tymy_po_kole[tym2],"-","-"]);
      tymy_vitazi.push("#tymid_"+(zapasy.length-1));
    }
    tymy_po_kole=[];
    tymy_po_kole=tymy_vitazi;
    tymy_vitazi=[];
    if(pocet_tymov==2)break;
    i++;
  }
  vypis_zapasy_aktualny_turnaj();
  
}

function vygeneruj_turnaj_turnaj()
{
  var tym1;
  var tym2;
  var pocet_tymov=ziskaj_pocet_tymov_aktualneho_turnaju();
  var pocet_nezaradenych_tymov=pocet_tymov;
  
  if(localStorage.pocet_postupujucich_tymov*aktualny_turnaj_pocet_skupin>pocet_tymov)
  {
    alert(""+lang_malo_timov+"");
    return false;
  }
  
  /*rozdelenie tymov do tabulky*/
  var pocet_v_skupine=Math.floor(pocet_tymov/aktualny_turnaj_pocet_skupin);
  for(var i=0; i<aktualny_turnaj_pocet_skupin;i++)
  {
    var aktualna_tabulka=String.fromCharCode(i+65);
    for(var j=0; j<Math.floor(pocet_tymov/aktualny_turnaj_pocet_skupin);j++)
    {
      tym1=Math.floor((Math.random() * pocet_tymov));
      id=ziskaj_id_tymu(tym1);
      var poradie=poradie_tymu(id);
      while(tym_uz_je_v_skupine(tym1,aktualna_tabulka)||tymy[poradie][3]!=1)
      {
        tym1=Math.floor((Math.random() * pocet_tymov));
        id=ziskaj_id_tymu(tym1);
        poradie=poradie_tymu(id);
      }
      tymy[poradie][3]=aktualna_tabulka;
    }
    pocet_nezaradenych_tymov=pocet_nezaradenych_tymov-j;
    if(i==(aktualny_turnaj_pocet_skupin-1))
    {
      for(var k=0;k<pocet_nezaradenych_tymov;k++)
      {
        tym1=Math.floor((Math.random() * pocet_tymov));
        id=ziskaj_id_tymu(tym1);
        var poradie=poradie_tymu(id);
        while(tym_uz_je_v_skupine(tym1,aktualna_tabulka)||tymy[poradie][3]!=1)
        {
          tym1=Math.floor((Math.random() * pocet_tymov));
          id=ziskaj_id_tymu(tym1);
          poradie=poradie_tymu(id);
        }
        tymy[poradie][3]=aktualna_tabulka;
      }
    }
  }
  //alert(tymy);
  
  /*zapasy v tabulke*/
  var watchdog=0;
  var chod_od_znova=0;
  var pocet_watchdog=1000;
  var watchdog_over=0;
  var pocet_watchdog_over=50;
  
  for(var i=0; i<aktualny_turnaj_pocet_skupin;i++)
  {
    var aktualna_tabulka=String.fromCharCode(65 + i);
    pocet_tymov_v_skupine_real=zisti_pocet_timov_v_skupine(aktualna_tabulka);
    if(pocet_tymov_v_skupine_real%2==0)pocet_kol=pocet_tymov_v_skupine_real*2-2;
    else pocet_kol=pocet_tymov_v_skupine_real*2;
    if(localStorage.hra_sa_na_odvetu==0)pocet_kol=pocet_kol/2;
    for(var j=0; j<pocet_kol; j++)
    {
      chod_od_znova=0;
      for(var k=0; k<Math.floor(pocet_tymov_v_skupine_real/2); k++)
      {
        watchdog=0;
        tym1=Math.floor((Math.random() * pocet_tymov));
        tym2=Math.floor((Math.random() * pocet_tymov));
        poradie1=poradie_tymu(ziskaj_id_tymu(tym1));
        poradie2=poradie_tymu(ziskaj_id_tymu(tym2));
        while(tym1==tym2||tymy[poradie1][3]!=aktualna_tabulka||tymy[poradie2][3]!=aktualna_tabulka||zapas_uz_existuje(tym1,tym2)||tym_uz_v_kole_hral(tym1,tym2,j+1))
        {
          tym1=Math.floor((Math.random() * pocet_tymov));
          tym2=Math.floor((Math.random() * pocet_tymov));
          poradie1=poradie_tymu(ziskaj_id_tymu(tym1));
          poradie2=poradie_tymu(ziskaj_id_tymu(tym2));
          watchdog++;
          if(watchdog>pocet_watchdog)
          {
            watchdog_over++;
            if(watchdog_over>pocet_watchdog_over)
            {
              odstran_zapasy_turnaja(aktualny_turnaj_id);
              vygeneruj_turnaj_turnaj();
              return 0;
            }      
            odstran_zapasy_turnaja_a_kola(aktualny_turnaj_id,j+1,aktualna_tabulka);
            chod_od_znova=1;
            break;
          }
        }
        if(chod_od_znova==1)
        {
          
          break;
        }
        zapasy.push([zapasy.length, aktualny_turnaj_id, j+1, ziskaj_id_tymu(tym1), ziskaj_id_tymu(tym2),"-","-",aktualna_tabulka]);
      }
      if(chod_od_znova==1)
      {
        j--;
        continue;
      }
    }
  }
  var pocet_zapasov_v_skupine=j+1;
  pocet_tymov=pocet_v_skupine*localStorage.pocet_postupujucich_tymov;
  pom=pocet_tymov;
  tymy_po_kole=[];
  for(var i=0; i<aktualny_turnaj_pocet_skupin;i++)
  {
    for(var j=0; j<localStorage.pocet_postupujucich_tymov;j++)
    {
      skupina=String.fromCharCode(65 + i);
      tymy_po_kole.push("#tymid_"+skupina+""+j);
    }
  }
  
  var tymy_vitazi=[];
  i=pocet_zapasov_v_skupine;
  
  if(localStorage.nahodny_vyber_pri_play_off_turnaju==0 || aktualny_turnaj_pocet_skupin>1)
  {
    for(var j=0; j<tymy_po_kole.length/2;j++)
    {
      zapasy.push([zapasy.length, aktualny_turnaj_id, i, tymy_po_kole[j], tymy_po_kole[(tymy_po_kole.length-1-j)],"-","-"]);
      tymy_vitazi.push("#tymid_"+(zapasy.length-1));
    } 
    tymy_po_kole=[];
    tymy_po_kole=tymy_vitazi;
    tymy_vitazi=[];
    i++;
  }
  while(1)
  {
    pocet_tymov=tymy_po_kole.length;
    if(pocet_tymov<2)break;   
    for(j=0;j<pocet_tymov/2;j++)
    {
      tym1=Math.floor((Math.random() * pocet_tymov));
      tym2=Math.floor((Math.random() * pocet_tymov));
      while(tym1==tym2||zapas_uz_existuje(tymy_po_kole[tym1],tymy_po_kole[tym2])||tym_uz_v_kole_hral(tymy_po_kole[tym1],tymy_po_kole[tym2],i)||tymy_su_v_tej_istej_skupine(tymy_po_kole[tym1], tymy_po_kole[tym2]))
      {
        tym1=Math.floor((Math.random() * pocet_tymov));
        tym2=Math.floor((Math.random() * pocet_tymov));
      }
      zapasy.push([zapasy.length, aktualny_turnaj_id, i, tymy_po_kole[tym1], tymy_po_kole[tym2],"-","-"]);
      tymy_vitazi.push("#tymid_"+(zapasy.length-1));
    }
    tymy_po_kole=[];
    tymy_po_kole=tymy_vitazi;
    tymy_vitazi=[];
    i++;
    if(pocet_tymov=2)break;   
  }
  vypis_zapasy_aktualny_turnaj();
}

function tymy_su_v_tej_istej_skupine(tym1, tym2)
{
  if(aktualny_turnaj_pocet_skupin==1)return false;
  string=tym1.split("#tymid_")[1];
  string=string.split("");
  var skupina1=string[0];
  
  string=tym2.split("#tymid_")[1];
  string=string.split("");
  var skupina2=string[0];
  
  if(skupina1==skupina2 && !$.isNumeric(skupina1) && !$.isNumeric(skupina2))return true;
  else return false;
}

function poradie_tymu(pom)
{
  for(var i=0; i<tymy.length; i++)
  {
    if(tymy[i][1]==pom)return i;
  }
}

function zisti_pocet_timov_v_skupine(tabulka)
{
  var pocitadlo=0;
  for(var i=0; i<tymy.length; i++)
  {
    if(tymy[i][3]==tabulka)pocitadlo++;
  }
  return pocitadlo;
}

function tym_uz_je_v_skupine(tym1,aktualna_tabulka)
{
  for(var i=0; i<tymy.length; i++)
  {
    if(tymy[i][3]!=""&&tymy[i][3]==aktualna_tabulka&&tymy[i][1]==tymy[tym1][1])return true;
  }
  return false;
}

function vypis_zapasy_aktualny_turnaj()
{
  var kolo=-1;
  var predchadzajuce_kolo=-1;
  var string="";
  //var string+="<button id=\"spat_v_turnaji\" class=\"back2\">&#x25c4;</button><button id=\"dalej_v_turnaji\" class=\"next\">&#x25ba;</button>";
  var pocitadlo=0;
  var kolo=0;
  var skupina="";
  while(1)
  {
    pocitadlo=0;
    
    for(var i=0; i<zapasy.length; i++)
    {
      skupina="";
      if(zapasy[i][1]==aktualny_turnaj_id&&zapasy[i][2]==kolo)
      {
        skupina=zapasy[i][7];
        if(skupina===undefined)skupina="";
        if(skupina!="")skupina_write=" | "+lang_skupina+" "+skupina;
        else skupina_write="";
        
        var onclick="zadaj_vysledok_zapasu("+zapasy[i][0]+")";
        if(pocitadlo==0)
        { 
          kolo_nazov=zapasy[i][2];
          if(kolo_nazov==0)kolo_nazov=""+lang_predkolo+"";
          else kolo_nazov=kolo_nazov+". "+lang_kolo+"";
          string=string+"<h1>"+kolo_nazov+"</h1>";
        }
        if((zapasy[i][3].split("#tymid_")).length==2)
        {
          if($.isNumeric((zapasy[i][3].split("#tymid_"))[1]))
          {
            
            nazov_tym1=""+lang_vitaz_zapasu+" "+(parseInt((zapasy[i][3].split("#tymid_"))[1], 10)+1);
            onclick="";
          }
          else
          {
            nazov_tym1=ziskaj_popis_tabulka_miesto(zapasy[i][3]);
            onclick="";
          }
        }
        else
        {
          nazov_tym1=ziskaj_nazov_tymu_z_id(zapasy[i][3]);
        }
        
        if((zapasy[i][4].split("#tymid_")).length==2)
        {
          if($.isNumeric((zapasy[i][4].split("#tymid_"))[1]))
          {
            
            nazov_tym2=""+lang_vitaz_zapasu+" "+(parseInt((zapasy[i][4].split("#tymid_"))[1], 10)+1);
            onclick="";
          }
          else
          {
            nazov_tym2=ziskaj_popis_tabulka_miesto(zapasy[i][4]);
            onclick="";
          }
        }
        else
        {
          nazov_tym2=ziskaj_nazov_tymu_z_id(zapasy[i][4]);
        }
        if(zapasy[i][8]==1)onclick="";
        string=string+"<div class=\"zapas\" onClick=\""+onclick+"\"><h3>"+lang_zapas_c+" "+(zapasy[i][0]+1)+""+skupina_write+"</h3><div class=\"zapas-team redteam\">"+nazov_tym1+"</div><div class=\"zapas-vysledok\">"+zapasy[i][5]+"</div><div class=\"zapas-team blueteam\">"+nazov_tym2+"</div><div class=\"zapas-vysledok\">"+zapasy[i][6]+"</div><br style=\"clear:both;\"/></div>";
        pocitadlo++;
      }
    }
    if(pocitadlo==0&&kolo>0)break;
    kolo++;
  }
  
  /*for(var i=0; i<zapasy.length; i++)
  {
    if(zapasy[i][1]==aktualny_turnaj_id)
    {
      var onclick="zadaj_vysledok_zapasu("+zapasy[i][0]+")";
      if(zapasy[i][2]!=kolo)
      {
        kolo=zapasy[i][2];
        if(kolo==0)kolo="PREDKOLO";
        else kolo=kolo+". KOLO";
        if(kolo!=predchadzajuce_kolo)string=string+"<h1>"+kolo+"</h1>";
        predchadzajuce_kolo=kolo;
      }
      if((zapasy[i][3].split("#tymid_")).length==2)
      {
        nazov_tym1="Víťaz zápasu "+(parseInt((zapasy[i][3].split("#tymid_"))[1], 10)+1);
        onclick="";
      }
      else
      {
        nazov_tym1=ziskaj_nazov_tymu_z_id(zapasy[i][3]);
      }
      
      if((zapasy[i][4].split("#tymid_")).length==2)
      {
        nazov_tym2="Víťaz zápasu "+(parseInt((zapasy[i][4].split("#tymid_"))[1], 10)+1);
        onclick="";
      }
      else
      {
        nazov_tym2=ziskaj_nazov_tymu_z_id(zapasy[i][4]);
      }
      string=string+"<div class=\"zapas\" onClick=\""+onclick+"\"><h3>"+lang_zapas_c+" "+(zapasy[i][0]+1)+"</h3><div class=\"zapas-team\">"+nazov_tym1+"</div><div class=\"zapas-vysledok\">"+zapasy[i][5]+"</div><div class=\"zapas-team\">"+nazov_tym2+"</div><div class=\"zapas-vysledok\">"+zapasy[i][6]+"</div><br style=\"clear:both;\"/></div>";
    }
  }*/
  obsah_stranky[4][0]=aktualny_turnaj_nazov;
  obsah_stranky[4][1]=string;
}

function ziskaj_popis_tabulka_miesto(string)
{
  string=string.split("#tymid_")[1];
  string=string.split("");
  var skupina=string[0];
  var poradie=[];
  for(var i=0; i<string.length; i++)
  {
    if(i!=0)poradie.push(parseInt(string[i], 10)+1);
  }
  poradie=poradie.join("");
  return poradie+". "+lang_tim_skupiny+" "+skupina;
}

function ziskaj_id_tymu(tym)
{
  var pocitadlo=0;
  for(var i=0; i<tymy.length;i++)
  {
    if(tymy[i][3])
    {
      pocitadlo++;
      if((pocitadlo-1)==tym)return tymy[i][1];
    }
  }
  return tym;
}

function ziskaj_nazov_tymu_z_id(id)
{
  for(var i=0; i<tymy.length;i++)
  {
    if(tymy[i][1]==id)
    {
      return tymy[i][0];
    }
  }
  return "";
}

function zapas_uz_existuje(tym1,tym2,pocet_tymov)
{
  tym1=ziskaj_id_tymu(tym1);
  tym2=ziskaj_id_tymu(tym2);
  for(var i=0; i<zapasy.length; i++)
  {
    if(zapasy[i][1]==aktualny_turnaj_id)
    {
      if(zapasy[i][3]==tym1&&zapasy[i][4]==tym2)return 1;
      if(localStorage.hra_sa_na_odvetu==0&&zapasy[i][4]==tym1&&zapasy[i][3]==tym2)return 1;
    }
  }
  return 0
}

function tym_uz_v_kole_hral(tym1,tym2,kolo)
{
  for(var i=0; i<zapasy.length; i++)
  {
    if(zapasy[i][2]==kolo&&zapasy[i][1]==aktualny_turnaj_id)
    {
      if(zapasy[i][3]==ziskaj_id_tymu(tym1))return true;
      if(zapasy[i][4]==ziskaj_id_tymu(tym2))return true;
      if(zapasy[i][4]==ziskaj_id_tymu(tym1))return true;
      if(zapasy[i][3]==ziskaj_id_tymu(tym2))return true;
    }
  }
  return false
}

function ziskaj_pocet_tymov_aktualneho_turnaju()
{
  var pocitadlo=0
  for(var i=0; i<tymy.length;i++)
  {
    if(tymy[i][3]==1)pocitadlo++;
  }
  return pocitadlo;
}

function zorad_tabulku_podla_abecedy()
{
  var pole=[];
  var pole_nazvov=[];
  var pole_pom=[];
  for(var i=0; i<tymy.length;i++)
  {
    if(tymy[i][3]!=0)pole.push(tymy[i]);
  }
    
  for(var i=0; i<pole.length;i++)
  {
    pole_nazvov[i]=(pole[i][1]);
  }
  pole_nazvov.sort();
  for(var i=0; i<pole_nazvov.length;i++)
  {
    for(var j=0; j<pole.length;j++)
    {
      if(pole_nazvov[i]==pole[j][1])pole_pom.push(pole[j]);
    }
  }
  pole=pole_pom;
  return pole;
}

function ziskaj_tabulku_podla_zapasov(all)
{
  var id_tymu;
  var goly_dane=0;
  var goly_dostane=0;
  var body=0;
  var vitazstva=0;
  var prehry=0;
  var remizy=0;
  var skupina=""
  var vysledne_pole=[]
  pole=zorad_tabulku_podla_abecedy();
  for(var i=0; i<pole.length; i++)
  {
    goly_dane=0;
    goly_dostane=0;
    body=0;
    vitazstva=0;
    prehry=0;
    remizy=0;
    odohrane=0;
    skupina=""
    id_tymu=pole[i][1];
    for(var j=0; j<zapasy.length; j++)
    {
      if(zapasy[j][1]==aktualny_turnaj_id || all==1)
      {
        if(zapasy[j][3]==id_tymu)
        {
          if(zapasy[j][7]!=undefined && all!=1)skupina=zapasy[j][7];
          if(skupina!=""&&zapasy[j][7]==undefined && all!=1)continue;
        
          if(zapasy[j][5]!="-"&&zapasy[j][6]!="-")
          {
            zapasy[j][5]=parseInt(zapasy[j][5], 10);
            zapasy[j][6]=parseInt(zapasy[j][6], 10);
            
            odohrane++;
            goly_dane=goly_dane+zapasy[j][5];
            goly_dostane=goly_dostane+zapasy[j][6];
            if(zapasy[j][5]>zapasy[j][6])
            {
              vitazstva++;
              body=body+parseInt(localStorage.pocet_bodov_za_vyhru, 10);
            }
            else if(zapasy[j][5]==zapasy[j][6])
            {
              remizy++;
              body=body+parseInt(localStorage.pocet_bodov_za_remizu, 10);
            }
            else 
            {
              prehry++;
              body=body+parseInt(localStorage.pocet_bodov_za_prehru, 10);
            }
          }
        }
        else if(zapasy[j][4]==id_tymu)
        {
          if(zapasy[j][7]!=undefined)skupina=zapasy[j][7];
          if(skupina!=""&&zapasy[j][7]==undefined)continue;
        
          if(zapasy[j][5]!="-"&&zapasy[j][6]!="-")
          {
            zapasy[j][5]=parseInt(zapasy[j][5], 10);
            zapasy[j][6]=parseInt(zapasy[j][6], 10);
            odohrane++;
            goly_dane=goly_dane+zapasy[j][6];
            goly_dostane=goly_dostane+zapasy[j][5];
            if(zapasy[j][6]>zapasy[j][5])
            {
              vitazstva++;
              body=body+parseInt(localStorage.pocet_bodov_za_vyhru, 10);
            }
            else if(zapasy[j][6]==zapasy[j][5])
            {
              remizy++;
              body=body+parseInt(localStorage.pocet_bodov_za_remizu, 10);
            }
            else 
            {
              prehry++;
              body=body+parseInt(localStorage.pocet_bodov_za_prehru, 10);
            }
          }
        }
      }
    }
    vysledne_pole[i]=[ziskaj_nazov_tymu_z_id(id_tymu), id_tymu, odohrane, goly_dane, goly_dostane, vitazstva, remizy, prehry, body,skupina];
  }
  return vysledne_pole;
}

function zorad_tabulku_podla_bodov(tabulka)
{
  var pole=[];
  vysledne_pole=[];
  tabulka.reverse();
  for(var i=0; i<tabulka.length; i++)
  {
    pole[i]=tabulka[i][8]+"_"+i;
  }
  pole.sort();
  pole.reverse();
  for(var i=0; i<pole.length; i++)
  {
    poradie=pole[i].split("_");
    pom=poradie[1];
    vysledne_pole.push(tabulka[pom]);
  }
  return vysledne_pole;
}

function vykresli_tabulku(pole)
{
  var pocitadlo=0;
  string="";
  string+="<h1>"+turnaje[aktualny_turnaj_id][1]+"</h1>";
  for(var i=0; i<aktualny_turnaj_pocet_skupin; i++)
  {
    if(aktualny_turnaj_pocet_skupin!=0 && aktualny_turnaj_typ=="turnaj")string+="<h2>"+String.fromCharCode(i+65)+" skupina</h2>";
    string+="<table width=\"100%\"><tr><th>Č.</th><th>"+lang_tim+"</th><th>"+lang_zapasov+"</th><th>GF</th><th>GA</th><th>"+lang_body+"</th></tr>";
    for(var j=0; j<pole.length;j++)
    {
      if(aktualny_turnaj_pocet_skupin==1 || pole[j][9]==String.fromCharCode(i+65))
      {
        string=string+"<tr onClick=\"vypis_statistika_team_aktualny_turnaj("+pocitadlo+");\"><td>"+(j+1)+".</td><td>"+pole[j][0]+"</td><td>"+ pole[j][2] +"</td><td>"+ pole[j][3] +"</td><td>"+ pole[j][4] +"</td><td>"+ pole[j][8] +"</td></tr>";
        pocitadlo++;
      }
    }
    string=string+"</table>";
  }
  obsah_stranky[3][1]=string;
}

function vypis_tabulky_turnaj()
{
  for(var i=0; i<aktualny_turnaj_pocet_skupin;i++)
  {
    var tabulka=ziskaj_tabulku_podla_zapasov();
    zorad_tabulku_podla_bodov(tabulka);
  }
}

function zadaj_vysledok_zapasu(vysledok)
{
  var option1="<option value=\"-\">-</option>";
  var option2="<option value=\"-\">-</option>";
  var selected;
  for(var i=0;i<21;i++)
  {
    if(zapasy[vysledok][5]==i)selected="selected";
    else selected="";
    option1=option1+"<option value=\""+i+"\" "+selected+">"+i+"</option>";
    if(zapasy[vysledok][6]==i)selected="selected";
    else selected="";
    option2=option2+"<option value=\""+i+"\" "+selected+">"+i+"</option>";
  }
  string="<h3>"+lang_zapas_c+" "+(zapasy[vysledok][0]+1)+"</h3><div class=\"zapas\"><label><div class=\"zapas-team redteam\">"+ziskaj_nazov_tymu_z_id(zapasy[vysledok][3])+"</div><div class=\"zapas-vysledok-select\"><select id=\"tym_1_vysledok\">"+option1+"</select></div></label><label><div class=\"zapas-team blueteam\">"+ziskaj_nazov_tymu_z_id(zapasy[vysledok][4])+"</div><div class=\"zapas-vysledok-select\"><select id=\"tym_2_vysledok\">"+option2+"</select></div></label><br style=\"clear:both;\"/></div>";
  string+="<button style=\"width:100%;\" onClick=\"zobraz_tabulku_vysledkov("+vysledok+");\" class=\"back\">"+lang_zobraz_velke_vysledky+"</button>";
  
  string=string+"<button id=\"spat_zapasy\" style=\"width\"20%\" class=\"back\" onclick=\"zobraz_podstranku(4);\">"+lang_spat+"</button><button onClick=\"uloz_vysledok("+vysledok+")\" style=\"width:75%;\">"+lang_ulozit_vysledok+"</button>";
  obsah_stranky[7][1]=string;
  zobraz_podstranku(7);
}

var je_zobrazena_tabulka_vysledkov_zapasu=0;
function zobraz_tabulku_vysledkov(zapas)
{
  je_zobrazena_tabulka_vysledkov_zapasu=1;
  $("#zavri_vysledok").attr("onClick", "zavri_tabulku_vysledkov("+zapas+")");
  $("#zavri_vysledok").html(""+lang_uloz_aktualny_vysledok+"");
  var sirka_displeja=$(document).width();
  var vyska_displeja=$(document).height();
  var posun=(vyska_displeja-sirka_displeja)/2;
  $("#vysledky").css({"display":"block", "width":vyska_displeja+"px", "height":sirka_displeja+"px","top":posun+"px", "left":"-"+posun+"px", "position":"fixed"});
  $("#vysledok1").html("<p>"+$('#tym_1_vysledok').val()+"</p>");
  $("#vysledok2").html("<p>"+$('#tym_2_vysledok').val()+"</p>");
  var vyskapisma=$("#vysledok1 p").height();
  var vyskazavri=$("#zavri_vysledok").height();
  $("#vysledok1 p").css({"margin-top":((sirka_displeja-vyskapisma-vyskazavri)/2)+"px"});
  $("#vysledok2 p").css({"margin-top":((sirka_displeja-vyskapisma-vyskazavri)/2)+"px"});
  
  $("#vysledok1").attr("onClick", "daj_gol(1,"+zapas+")");
  $("#vysledok2").attr("onClick", "daj_gol(2,"+zapas+")");
}

function zavri_tabulku_vysledkov(zapas)
{
  $("#vysledky").css({"display":"none"});
  uloz_vysledok(zapas);
  je_zobrazena_tabulka_vysledkov_zapasu=0;
}

function daj_gol(tym,zapas)
{
  var golov1=$('#tym_1_vysledok').val();
  var golov2=$('#tym_2_vysledok').val();
  
  if(golov1=="-")golov1=0;
  if(golov2=="-")golov2=0;
  
  golov1=parseInt(golov1, 10);
  golov2=parseInt(golov2, 10);

  if(tym==1)golov1++;
  else if(tym==2)golov2++;
  
  $('#tym_1_vysledok').val(golov1);
  $('#tym_2_vysledok').val(golov2);
  
  $("#vysledok1").html("<p>"+$('#tym_1_vysledok').val()+"</p>");
  $("#vysledok2").html("<p>"+$('#tym_2_vysledok').val()+"</p>");
  
  var sirka_displeja=$(document).width();
  var vyskapisma=$("#vysledok1 p").height();
  var vyskazavri=$("#zavri_vysledok").height();
  $("#vysledok1 p").css({"margin-top":((sirka_displeja-vyskapisma-vyskazavri)/2)+"px"});
  $("#vysledok2 p").css({"margin-top":((sirka_displeja-vyskapisma-vyskazavri)/2)+"px"});
}

function uloz_vysledok(zapas)
{
  if(aktualny_turnaj_typ=="play_off")
  {
    if($('#tym_1_vysledok').val()!="-"&&$('#tym_2_vysledok').val()!="-")
    {
      if(!confirm(""+lang_ulozit_vysledok_confirm+""))return false;
      var vitaz="";
      if($('#tym_1_vysledok').val()>$('#tym_2_vysledok').val())vitaz=zapasy[zapas][3];
      if($('#tym_1_vysledok').val()<$('#tym_2_vysledok').val())vitaz=zapasy[zapas][4];
      if(vitaz=="")
      {
        alert(""+lang_ulozit_vysledok_alert+"");
        return;
      }
      ovplyvni_ostatne_zapasy(zapasy[zapas][0], vitaz);
      zapasy[zapas][8]=1;
    }
  }
  
  zapasy[zapas][5]=$('#tym_1_vysledok').val();
  zapasy[zapas][6]=$('#tym_2_vysledok').val();
  
  if(aktualny_turnaj_typ=="turnaj")
  {  
    if($('#tym_1_vysledok').val()!="-"&&$('#tym_2_vysledok').val()!="-")
    {
      if(zisti_ci_je_kompletna_skupinova_faza())
      {
        if(!confirm(""+lang_ulozit_vysledok_confirm+""))return false;
        zakaz_zmenu_zapasov_v_tabulkach();
        for(var i=0; i<aktualny_turnaj_pocet_skupin;i++)
        {
          for(var j=0; j<localStorage.pocet_postupujucich_tymov;j++)
          {
            ovplyvni_ostatne_zapasy(String.fromCharCode(i+65)+""+j, ziskaj_tym_z_tabulky(String.fromCharCode(i+65),j))
          }
        }
        var vitaz="";
        if($('#tym_1_vysledok').val()>$('#tym_2_vysledok').val())vitaz=zapasy[zapas][3];
        if($('#tym_1_vysledok').val()<$('#tym_2_vysledok').val())vitaz=zapasy[zapas][4];
        if(vitaz=="" && zapasy[zapas][7]==undefined)
        {
          alert(""+lang_ulozit_vysledok_alert+"");
          return;
        }
        ovplyvni_ostatne_zapasy(zapasy[zapas][0], vitaz);
        zapasy[zapas][8]=1;
      }
    }
  }

  vypis_zapasy_aktualny_turnaj();
  var tabulka=ziskaj_tabulku_podla_zapasov();
  vykresli_tabulku(zorad_tabulku_podla_bodov(tabulka));
  
  localStorage.zapasyvpamati=JSON.stringify(zapasy);
  
  zobraz_podstranku(4);
}

function zakaz_zmenu_zapasov_v_tabulkach()
{
  for(var i=0; i<zapasy.length; i++)
  {
    if(zapasy[i][1]==aktualny_turnaj_id && !(zapasy[i][7]===undefined))
    {
      zapasy[i][8]=1;
    }
  }
}

function ziskaj_tym_z_tabulky(skupina, poradie)
{
  var pocitadlo=0;
  var tabulka=ziskaj_tabulku_podla_zapasov();
  tabulka=zorad_tabulku_podla_bodov(tabulka);
  for(var i=0;i<tabulka.length;i++)
  {
    if(tabulka[i][9]==skupina)
    {
      if(pocitadlo==poradie)
      {
        return tabulka[i][1];
      }
      pocitadlo++;
    }
  }
}

function ovplyvni_ostatne_zapasy(zapas, vitaz)
{
  
  if(vitaz!="")
  {
    for(var i=0; i<zapasy.length; i++)
    {
      if(zapasy[i][1]==aktualny_turnaj_id)
      {
        if(zapasy[i][3]=="#tymid_"+zapas)zapasy[i][3]=vitaz;
        if(zapasy[i][4]=="#tymid_"+zapas)zapasy[i][4]=vitaz;
      }
    }
  }
}

function zisti_ci_je_kompletna_skupinova_faza()
{
  var pocitadlo=0;
  for(var i=0; i<zapasy.length; i++)
  {
    if((zapasy[i][1]==aktualny_turnaj_id&&(zapasy[i][7])!=undefined)&&(zapasy[i][5]=="-"||zapasy[i][6]=="-"))
    {
      pocitadlo++;
    }
  }
  if(pocitadlo==0)return true;
  else return false;
}

function vypis_turnaje()
{
  string="";
  string+="<table width=\"100%\"><tr><th>"+lang_cislo+"</th><th>"+lang_nazov+"</th><th>"+lang_typ+"</th><th>"+lang_skupiny+"</th>";
  for(var i=0; i<turnaje.length; i++)
  {
    string+="<tr onClick=\"nacitaj_turnaj("+(turnaje[i][0])+")\"><td>"+(turnaje[i][0]+1)+"</td><td>"+turnaje[i][1]+"</td><td>"+turnaje[i][2]+"</td><td>"+turnaje[i][3]+"</td></tr>";
  }
  if(i==0)string+="<tr><td colspan=\"4\">"+lang_ziadne_turnaje+"</td></tr>"
  string+="</table>";
  obsah_stranky[9][1]=string;
  zobraz_podstranku(9);
}

function nacitaj_turnaj(id)
{
  zacaty_turnaj=1;
  nastav_menu();
  if(aktualny_turnaj_id!=id || aktualny_turnaj_id==0)
  {
    aktualny_turnaj_nazov=turnaje[id][1];
    aktualny_turnaj_typ=turnaje[id][2];
    aktualny_turnaj_pocet_skupin=turnaje[id][3];
    aktualny_turnaj_id=id;
  }
  
  vypis_zapasy_aktualny_turnaj();
  var tabulka=ziskaj_tabulku_podla_zapasov();
  vykresli_tabulku(zorad_tabulku_podla_bodov(tabulka));
  
  zobraz_podstranku(4);
  
}

function vypis_statistiky_timov()
{
  var tabulka=ziskaj_tabulku_podla_zapasov(1);
  obsah_stranky[10][1]=vrat_statistiky_timov(zorad_tabulku_podla_bodov(tabulka));
  zobraz_podstranku(10);
}

function vrat_statistiky_timov(tabulka)
{
  string="";
  string+="<h1>"+lang_statistiky_popis+"</h1>";
  string+="<table width=\"100%\"><tr><th>"+lang_cislo+"</th><th>"+lang_tim+"</th><th>"+lang_zapasov+"</th><th>GF</th><th>GA</th><th>"+lang_body+"</th>";
  for(var i=0; i<tabulka.length; i++)
  {
    string+="<tr onClick=\"vypis_statistika_team("+(i)+")\"><td>"+(i+1)+"</td><td>"+(tabulka[i][0])+"</td><td>"+tabulka[i][2]+"</td><td>"+tabulka[i][3]+"</td><td>"+tabulka[i][4]+"</td><td>"+tabulka[i][8]+"</td></tr>";
  }
  if(i==0)string+="<tr><td colspan=\"6\">"+lang_ziadne_turnaje+"</td></tr>"
  string+="</table>";
  return string;
}

function vypis_statistika_team(id)
{
  var tabulka=ziskaj_tabulku_podla_zapasov(1);
  tabulka=zorad_tabulku_podla_bodov(tabulka);
  obsah_stranky[11][0]=tabulka[id][0];

  string="";
  string+="<table width=\"100%\">";
  string+="<tr><th colspan=\"2\">"+lang_statistiky+"</th>";
  string+="<tr><td>"+lang_nazov+"</td><td>"+tabulka[id][0]+"</td>";
  string+="<tr><td>ID</td><td>"+tabulka[id][1]+"</td>";
  string+="<tr><td>"+lang_pocet_odohranych_zapasov+"</td><td>"+tabulka[id][2]+"</td>";
  string+="<tr><td>"+lang_pocet_danych_golov+"</td><td>"+tabulka[id][3]+"</td>";
  string+="<tr><td>"+lang_pocet_dostanych_golov+"</td><td>"+tabulka[id][4]+"</td>";
  string+="<tr><td>"+lang_bilancia_golov+"</td><td>"+(tabulka[id][3]-tabulka[id][4])+"</td>";
  string+="<tr><td>"+lang_pocet_vitazstiev+"</td><td>"+tabulka[id][5]+"</td>";
  string+="<tr><td>"+lang_pocet_remiz+"</td><td>"+tabulka[id][6]+"</td>";
  string+="<tr><td>"+lang_pocet_prehier+"</td><td>"+tabulka[id][7]+"</td>";
  string+="<tr><td>"+lang_pocet_bodov+"</td><td>"+tabulka[id][8]+"</td>";
  string+="</table>";
  string+="<button onClick=\"zobraz_podstranku(10);\" style=\"width:100%;\">"+lang_spat+"</button>";
  obsah_stranky[11][1]=string;
  zobraz_podstranku(11);
}

function vypis_statistika_team_aktualny_turnaj(id)
{
  var tabulka=ziskaj_tabulku_podla_zapasov();
  tabulka=zorad_tabulku_podla_bodov(tabulka);
  obsah_stranky[12][0]=tabulka[id][0];

  string="";
  string+="<table width=\"100%\">";
  string+="<tr><th colspan=\"2\">"+lang_statistiky+"</th>";
  string+="<tr><td>"+lang_nazov+"</td><td>"+tabulka[id][0]+"</td>";
  string+="<tr><td>"+lang_aktualny_turnaj+"</td><td>"+turnaje[aktualny_turnaj_id][1]+"</td>";
  string+="<tr><td>ID</td><td>"+tabulka[id][1]+"</td>";
  string+="<tr><td>"+lang_pocet_odohranych_zapasov+"</td><td>"+tabulka[id][2]+"</td>";
  string+="<tr><td>"+lang_pocet_danych_golov+"</td><td>"+tabulka[id][3]+"</td>";
  string+="<tr><td>"+lang_pocet_dostanych_golov+"</td><td>"+tabulka[id][4]+"</td>";
  string+="<tr><td>"+lang_bilancia_golov+"</td><td>"+(tabulka[id][3]-tabulka[id][4])+"</td>";
  string+="<tr><td>"+lang_pocet_vitazstiev+"</td><td>"+tabulka[id][5]+"</td>";
  string+="<tr><td>"+lang_pocet_remiz+"</td><td>"+tabulka[id][6]+"</td>";
  string+="<tr><td>"+lang_pocet_prehier+"</td><td>"+tabulka[id][7]+"</td>";
  string+="<tr><td>"+lang_pocet_bodov+"</td><td>"+tabulka[id][8]+"</td>";
  string+="</table>";
  string+="<button onClick=\"zobraz_podstranku(3);\" style=\"width:100%;\">"+lang_spat+"</button>";
  obsah_stranky[12][1]=string;
  zobraz_podstranku(12);
}