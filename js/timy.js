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