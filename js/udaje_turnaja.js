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
  
  obsah_stranky[2][1]="<input type=\"text\" maxlength=\"50\" name=\"nazov_turnaja\" id=\"nazov_turnaja\" placeholder=\""+lang_nazov_turnaja+"\" value=\""+vytvor_turnaj_nazov+"\"/><select onChange=\"zobraz_pocet_skupin()\" name=\"typ_turnaju\" id=\"typ_turnaju\"><option value=\"liga\" "+liga+">"+lang_liga+"</option><option value=\"play_off\" "+play_off+">"+lang_play_off+"</option><option value=\"turnaj\" "+turnaj+">"+lang_turnaj+"</option></select><select id=\"pocet_skupin\" class=\"pocet_skupin\" name=\"pocet_skupin\"><option value=\"1\" "+skupiny1+">"+lang_pocet_skupin+": 1</option><option value=\"2\" "+skupiny2+">"+lang_pocet_skupin+": 2</option><option value=\"4\" "+skupiny4+">"+lang_pocet_skupin+": 4</option><option value=\"8\" "+skupiny8+">"+lang_pocet_skupin+": 8</option></select><button id=\"spat_vyber_teamov\" style=\"width\"20%\" class=\"back\" onclick=\"spat_na_vyber_tymov();\">"+lang_spat+"</button><button id=\"spat_vyber_teamov\" style=\"width:75%;\" onClick=\"generovat_turnaj();\">"+lang_generovat_turnaj+"</button>";
  

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
