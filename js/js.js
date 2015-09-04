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
  ["", "<div onClick=\"zobraz_podstranku('1');\" class=\"mainpage\"><img width=\"80%\" style=\"margin-top:20%;\" src=\"img/logo.png\"/><div class=\"home-button\">Vytvor turnaj</div></div>"],
  ["Zvoľ tímy", ""],
  ["Nový turnaj", ""],
  ["Tabuľka", ""],
  ["1. kolo", "<button id=\"spat_v_turnaji\" class=\"back2\">&#x25c4;</button><button id=\"dalej_v_turnaji\" class=\"next\">&#x25ba;</button><div class=\"zapas\"><div class=\"zapas-team\">Team 1</div><div class=\"zapas-vysledok\">2</div><div class=\"zapas-team\">Team 2</div><div class=\"zapas-vysledok\">1</div><br style=\"clear:both;\"/></div><div class=\"zapas\"><div class=\"zapas-team\">Team 1</div><div class=\"zapas-vysledok\">2</div><div class=\"zapas-team\">Team 2</div><div class=\"zapas-vysledok\">1</div><br style=\"clear:both;\"/></div><div class=\"zapas\"><div class=\"zapas-team\">Team 1</div><div class=\"zapas-vysledok\">2</div><div class=\"zapas-team\">Team 2</div><div class=\"zapas-vysledok\">1</div><br style=\"clear:both;\"/></div><div class=\"zapas\"><div class=\"zapas-team\">Team 1</div><div class=\"zapas-vysledok\">2</div><div class=\"zapas-team\">Team 2</div><div class=\"zapas-vysledok\">1</div><br style=\"clear:both;\"/></div>"],
  ["Pravidlá", "<h1>Zatvorený stôl s vhadzovačom</h1><ul><li>je zakázané : pretáčať hráčov o viac ako 1 otáčku, držať súperové tyče, posúvať stôl ak je lopta v hre, nevhodne znervózňovať súpera</li><li>spoluhráči si môžu vymienať pozície obrana útok po každom góle</li><li>po vhodení nechať prejsť loptu na druhú stranu stola a rozohrať stredovými hráčmi</li><li>strednou tyčou s piatimi hráčmi nestrielať z prvej, len po nahrávke na tyči</li><li>hráč by mal loptu posunúť z tyče - prihrať, alebo strielať do 15 sekúnd</li><li>gól platí aj keď loptička vyletí z brány</li><li>mŕtva lopty - lopta nedosiahnuteľná žiadnym hráčom - keďže sa jedná o uzavretý stôl, je nutné ho podvihnúť. Hráč, ku ktorému sa lopta dostane by mal rozohrať - nahrať si s ďalším hráčom na tyči a až potom pokračovať v hre</li></ul><h1>Otvorený futbalový stôl</h1><ul><li>je zakázané: pretáčať hráčov o viac ako 1 otáčku, držať súperove tyče, posúvať stôl ak je lopta v hre, zasahovať rukou, alebo inými predmetmi do hry, nevhodne znervózňovať súpera</li><li>hráči losujú kto bude rozohrávať, rozohráva sa zo stredu prihrávkou na tyči</li><li>hrá sa do dosiahnutia 10 gólov, alebo podľa dohody</li><li>gól platí aj keď lopta vyletí z brány, nasleduje rozohrávka hráča čo dostal gól</li><li>mŕtva lopta - hráč, ktorý bol naposledy v kontakte s loptou, alebo strielal prichádza o loptu a súper si ju nastaví a rozohráva z obrany prihrávkou.</li><li>hráč by mal loptu posunúť z tyče - prihrať, alebo strielať do 15 sekúnd</li><li>hráč, ktorý sa dopustí faulu (gól po pretáčaní, zdržovanie hry...) prichádza o loptu a súper rozohráva z obrany</li></ul>"],
  ["O aplikácii", "<h1>Popis</h1><p>Aplikácia vznikla ako výsledok riešenia CALCETTO Challengu od spoločnosti ERNI zverejnenom na stránke www.challengest.sk. Aplikácia umožňuje vytváranie rôznych typov turnajov, zaznamenávanie výsledkov a generovanie štatistík podľa odohraných zápasov. Aplikácia je vytvorená pomocou aplikácie Phonegap a napísaná pomocou HTML+CSS+JavaScript.</p><h1>Autor</h1><p style=\"text-align:center;\"><b>Pavol Kögler - PK Designs</b><br />Nová 1076<br />925 22 Veľké Úľany<br /><br /><b>pavolkogler@gmail.com</b></p><br /><h1>© 2015 PK Designs | All rights reserved</h1>"],
  ["Výsledok", ""],
  ["Nastavenia", ""],
  ["Turnaje", ""],
  ["Štatistiky tímov", ""]
];

if(localStorage.tymyvpamati===undefined)tymy=[];
else tymy=JSON.parse(localStorage.tymyvpamati);
//id,turnaj, kolo, prvy tym, druhy tym, gol prvy tym, gol druhy tym
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
  
  string="<h1>Nastavenie bodovania</h1>";
  string+="<label><div class=\"zapas-team\">Body za výhru</div><div class=\"zapas-vysledok-select\"><select id=\"body_vyhra\">"+option+"</select></div></label>";
  
  var option="";
  var selected;
  for(var i=0;i<21;i++)
  {
    if(localStorage.pocet_bodov_za_remizu==i)selected="selected";
    else selected="";
    option=option+"<option value=\""+i+"\" "+selected+">"+i+"</option>";
  }
  string+="<label><div class=\"zapas-team\">Body za remízu</div><div class=\"zapas-vysledok-select\"><select id=\"body_remiza\">"+option+"</select></div></label>";
  
  var option="";
  var selected;
  for(var i=0;i<21;i++)
  {
    if(localStorage.pocet_bodov_za_prehru==i)selected="selected";
    else selected="";
    option=option+"<option value=\""+i+"\" "+selected+">"+i+"</option>";
  }
  string+="<label><div class=\"zapas-team\">Body za prehru</div><div class=\"zapas-vysledok-select\"><select id=\"body_prehra\">"+option+"</select></div></label>";
  
  string+="<h1>Nastavenie skupín</h1>";
  var option="";
  var selected1="";
  var selected2="";
  var selected4="";
  var selected8="";
  if(localStorage.pocet_postupujucich_tymov==1)selected1="selected";
  if(localStorage.pocet_postupujucich_tymov==2)selected2="selected";
  if(localStorage.pocet_postupujucich_tymov==4)selected4="selected";
  if(localStorage.pocet_postupujucich_tymov==8)selected8="selected";
  string+="<label><div class=\"zapas-team\">Počet postupujúcich</div><div class=\"zapas-vysledok-select\"><select id=\"pocet_postupujucich\"><option value=\"1\" "+selected1+">1</option><option value=\"2\" "+selected2+">2</option><option value=\"4\" "+selected4+">4</option><option value=\"8\" "+selected8+">8</option>"+option+"</select></div></label>";

  var selected1="";
  var selected0="";
  if(localStorage.hra_sa_na_odvetu==1)selected1="selected";
  else if(localStorage.hra_sa_na_odvetu==0)selected0="selected"
  string+="<label><div class=\"zapas-team\">Hrá sa na odvetu</div><div class=\"zapas-vysledok-select\"><select id=\"odveta\"><option value=\"1\" "+selected1+">Áno</option><option value=\"0\" "+selected0+">Nie</option></select></div></label>";
  
  selected1="";
  selected0="";
  if(localStorage.nahodny_vyber_pri_play_off_turnaju==1)selected1="selected";
  else if(localStorage.nahodny_vyber_pri_play_off_turnaju==0)selected0="selected"
  string+="<label><div class=\"zapas-team\">Náhodne play-off v turnaji</div><div class=\"zapas-vysledok-select\"><select id=\"nahodny_vyber\"><option value=\"1\" "+selected1+">Áno</option><option value=\"0\" "+selected0+">Nie</option></select></div></label>";
  
  
  string+="<button onClick=\"uloz_nastavenia();\" style=\"width:100%;\">Uložiť nastavenia</button>";
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
  zobraz_nastavenia();
  alert("Nastavenia boli úspešne zmenené.");
}

/*nastavenie menu ci je rozohraty turnaj a ma zobrazovat tabulku a zapasy alebo nie*/
function nastav_menu()
{
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

/*funkcia na otvorenie menu*/
function otvor_menu()
{
  $("#clona").css({"left":"0"});
  $("#clona").animate({"opacity":"1"},400);
  $("#menu-open").animate({"left":"-50px"},100, "linear", function(){
    $("#menu-content").animate({"left": "0%"},300);
  });
}

/*funkcia na zatvorenie menu*/
function zatvor_menu()
{
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
  zatvor_menu();
}

function vypis_tymy()
{
  var stranka="<button id=\"dalej_udaje_turnaja\" onClick=\"zadanie_udajov_turnaja()\" class=\"next\">&#x25ba;</button>";
  for(var i=0; i<tymy.length;i++)
  {
    if(tymy[i][2]==1)checked='checked';
    else checked="";
    stranka=stranka+"<label><div class=\"team\"><input type=\"checkbox\" class=\"team-check\" id=\""+tymy[i][1]+"\" "+checked+"/>"+tymy[i][0]+"</div></label>";
  }
  stranka=stranka+"<div class=\"add-input\"><input type=\"text\" id=\"add_team_text\" placeholder=\"Pridať team\"></input><div id=\"add_team\" class=\"add-submit\" onClick=\"pridaj_team();\"><p>+</p></div></div>";
  obsah_stranky[1][1]=stranka;
}

function pridaj_team()
{
  vloz_tymy_do_aktualneho_turnaju();
  var team=$('#add_team_text').val();
  var team_popis=team.replace(" ","_").toLowerCase();;
  if(team!="")tymy.push([team,team_popis]);
  
  localStorage.tymyvpamati=JSON.stringify(tymy);
  
  vypis_tymy();
  zobraz_podstranku(1);
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
  
  obsah_stranky[2][1]="<input type=\"text\" maxlength=\"50\" name=\"nazov_turnaja\" id=\"nazov_turnaja\" placeholder=\"Názov turnaja\" value=\""+vytvor_turnaj_nazov+"\"/><select onChange=\"zobraz_pocet_skupin()\" name=\"typ_turnaju\" id=\"typ_turnaju\"><option value=\"liga\" "+liga+">Liga</option><option value=\"play_off\" "+play_off+">Play off</option><option value=\"turnaj\" "+turnaj+">Turnaj</option></select><select id=\"pocet_skupin\" class=\"pocet_skupin\" name=\"pocet_skupin\"><option value=\"1\" "+skupiny1+">1</option><option value=\"2\" "+skupiny2+">2</option><option value=\"4\" "+skupiny4+">4</option><option value=\"8\" "+skupiny8+">8</option></select><button id=\"spat_vyber_teamov\" style=\"width\"20%\" class=\"back\" onclick=\"spat_na_vyber_tymov();\">späť</button><button id=\"spat_vyber_teamov\" style=\"width:75%;\" onClick=\"generovat_turnaj();\">Generovať turnaj</button>";
  

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
    alert("Na generovanie turnaja nie je dostatočný počet týmov");
    return;
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
        if(skupina!="")skupina_write=" | Skupina "+skupina;
        else skupina_write="";
        
        var onclick="zadaj_vysledok_zapasu("+zapasy[i][0]+")";
        if(pocitadlo==0)
        { 
          kolo_nazov=zapasy[i][2];
          if(kolo_nazov==0)kolo_nazov="PREDKOLO";
          else kolo_nazov=kolo_nazov+". KOLO";
          string=string+"<h1>"+kolo_nazov+"</h1>";
        }
        if((zapasy[i][3].split("#tymid_")).length==2)
        {
          if($.isNumeric((zapasy[i][3].split("#tymid_"))[1]))
          {
            
            nazov_tym1="Víťaz zápasu "+(parseInt((zapasy[i][3].split("#tymid_"))[1], 10)+1);
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
            
            nazov_tym2="Víťaz zápasu "+(parseInt((zapasy[i][4].split("#tymid_"))[1], 10)+1);
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
        string=string+"<div class=\"zapas\" onClick=\""+onclick+"\"><h3>Zápas č. "+(zapasy[i][0]+1)+""+skupina_write+"</h3><div class=\"zapas-team redteam\">"+nazov_tym1+"</div><div class=\"zapas-vysledok\">"+zapasy[i][5]+"</div><div class=\"zapas-team blueteam\">"+nazov_tym2+"</div><div class=\"zapas-vysledok\">"+zapasy[i][6]+"</div><br style=\"clear:both;\"/></div>";
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
      string=string+"<div class=\"zapas\" onClick=\""+onclick+"\"><h3>Zápas č. "+(zapasy[i][0]+1)+"</h3><div class=\"zapas-team\">"+nazov_tym1+"</div><div class=\"zapas-vysledok\">"+zapasy[i][5]+"</div><div class=\"zapas-team\">"+nazov_tym2+"</div><div class=\"zapas-vysledok\">"+zapasy[i][6]+"</div><br style=\"clear:both;\"/></div>";
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
  return poradie+". tím skupiny "+skupina;
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
  string="";
  for(var i=0; i<aktualny_turnaj_pocet_skupin; i++)
  {
    if(aktualny_turnaj_pocet_skupin!=0 && aktualny_turnaj_typ=="turnaj")string+="<h2>"+String.fromCharCode(i+65)+" skupina</h2>";
    string+="<table width=\"100%\"><tr><th>Č.</th><th>Team</th><th>Zap.</th><th>GF</th><th>GA</th><th>B</th></tr>";
    for(var j=0; j<pole.length;j++)
    {
      //treba doplnit body a goly
      if(aktualny_turnaj_pocet_skupin==1 || pole[j][9]==String.fromCharCode(i+65))
      {
        string=string+"<tr><td>"+(j+1)+".</td><td>"+pole[j][0]+"</td><td>"+ pole[j][2] +"</td><td>"+ pole[j][3] +"</td><td>"+ pole[j][4] +"</td><td>"+ pole[j][8] +"</td></tr>";
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
  string="<h3>Zápas č. "+(zapasy[vysledok][0]+1)+"</h3><div class=\"zapas\"><label><div class=\"zapas-team\">"+ziskaj_nazov_tymu_z_id(zapasy[vysledok][3])+"</div><div class=\"zapas-vysledok-select\"><select id=\"tym_1_vysledok\">"+option1+"</select></div></label><label><div class=\"zapas-team\">"+ziskaj_nazov_tymu_z_id(zapasy[vysledok][4])+"</div><div class=\"zapas-vysledok-select\"><select id=\"tym_2_vysledok\">"+option2+"</select></div></label><br style=\"clear:both;\"/></div>";
  string=string+"<button id=\"spat_zapasy\" style=\"width\"20%\" class=\"back\" onclick=\"zobraz_podstranku(4);\">späť</button><button onClick=\"uloz_vysledok("+vysledok+")\" style=\"width:75%;\">Uložiť výsledok</button>";
  obsah_stranky[7][1]=string;
  zobraz_podstranku(7);
}

function uloz_vysledok(zapas)
{
  if(aktualny_turnaj_typ=="play_off")
  {
    if(!confirm("Zadanie výsledku ovplyvňuje zápasy v ďalších kolách turnaja. Zmeny nebudú vratné. Zadali ste správny výsledok?"))return false;
    var vitaz="";
    if($('#tym_1_vysledok').val()>$('#tym_2_vysledok').val())vitaz=zapasy[zapas][3];
    if($('#tym_1_vysledok').val()<$('#tym_2_vysledok').val())vitaz=zapasy[zapas][4];
    if(vitaz=="")
    {
      alert("V play-off nesmie byť remíza!");
      return;
    }
    ovplyvni_ostatne_zapasy(zapasy[zapas][0], vitaz);
  }

  zapasy[zapas][5]=$('#tym_1_vysledok').val();
  zapasy[zapas][6]=$('#tym_2_vysledok').val();
  
  if(aktualny_turnaj_typ=="turnaj")
  {  
    if(zisti_ci_je_kompletna_skupinova_faza())
    {
      if(!confirm("Zadanie výsledku ovplyvňuje zápasy v ďalších kolách turnaja. Zmeny nebudú vratné. Zadali ste správny výsledok?"))return false;
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
      if(vitaz=="")
      {
        alert("V play-off nesmie byť remíza!");
        return;
      }
      ovplyvni_ostatne_zapasy(zapasy[zapas][0], vitaz);
    }
  }

  vypis_zapasy_aktualny_turnaj();
  var tabulka=ziskaj_tabulku_podla_zapasov();
  vykresli_tabulku(zorad_tabulku_podla_bodov(tabulka));
  
  localStorage.zapasyvpamati=JSON.stringify(zapasy);
  
  zobraz_podstranku(4);
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
  string+="<table width=\"100%\"><tr><th>Č.</th><th>Názov</th><th>Typ</th><th>Skupiny</th>";
  for(var i=0; i<turnaje.length; i++)
  {
    string+="<tr onClick=\"nacitaj_turnaj("+(turnaje[i][0])+")\"><td>"+(turnaje[i][0]+1)+"</td><td>"+turnaje[i][1]+"</td><td>"+turnaje[i][2]+"</td><td>"+turnaje[i][3]+"</td></tr>";
  }
  if(i==0)string+="<tr><td colspan=\"4\">Žiadne turnaje</td></tr>"
  string+="</table>";
  obsah_stranky[9][1]=string;
  zobraz_podstranku(9);
}

function nacitaj_turnaj(id)
{
  if(aktualny_turnaj_id!=id)
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
  string+="<table width=\"100%\"><tr><th>Č.</th><th>Team</th><th>Záp.</th><th>GF</th><th>GA</th><th>B</th>";
  for(var i=0; i<tabulka.length; i++)
  {
    string+="<tr onClick=\"\"><td>"+(i+1)+"</td><td>"+(tabulka[i][0])+"</td><td>"+tabulka[i][2]+"</td><td>"+tabulka[i][3]+"</td><td>"+tabulka[i][4]+"</td><td>"+tabulka[i][8]+"</td></tr>";
  }
  if(i==0)string+="<tr><td colspan=\"6\">Žiadne tímy</td></tr>"
  string+="</table>";
  return string;
}