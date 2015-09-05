/*zoradenie tabulky podla abecedy pomocou sortu, najskor vytvorim pole z idciek zoradim a podla toho to potom zoradim*/
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

/*ak je all=1 tak sa nedava pozor na aktualny turnaj ak nie tak sa iba z aktualneho turnaja nacitaju*/
/*tabulka sa zostavuje zo zapasov a vyratavaju sa aj statistiky*/
function ziskaj_tabulku_podla_zapasov(all)
{
  var id_tymu;
  var goly_dane=0;
  var goly_dostane=0;
  var body=0;
  var vitazstva=0;
  var prehry=0;
  var remizy=0;
  var skupina="";
  var pocitadlo=0;
  var vysledne_pole=[];
  pole=zorad_tabulku_podla_abecedy();
  for(var i=0; i<pole.length; i++)
  {
    pocitadlo=0;
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
          pocitadlo++;
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
          pocitadlo++;
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
    if (pocitadlo>0)vysledne_pole.push([ziskaj_nazov_tymu_z_id(id_tymu), id_tymu, odohrane, goly_dane, goly_dostane, vitazstva, remizy, prehry, body,skupina]);
  }
  return vysledne_pole;
}

/*zoradenie tabulky podla ziskanych bodov*/
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

/*vykresli podstranku tabulka podla ziskaneho pola*/
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

/*vypis dostatocneho poctu tabuliek pri turnaji*/
function vypis_tabulky_turnaj()
{
  for(var i=0; i<aktualny_turnaj_pocet_skupin;i++)
  {
    var tabulka=ziskaj_tabulku_podla_zapasov();
    zorad_tabulku_podla_bodov(tabulka);
  }
}