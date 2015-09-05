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