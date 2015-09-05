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
