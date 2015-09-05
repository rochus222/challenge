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
  
  if(!funkcie_pri_generovani())
  {
    stop_loading();
    return false;
  }
  
  zacaty_turnaj=1;
  nastav_menu(); 
  
  zobraz_podstranku(4);
  stop_loading();
}

function funkcie_pri_generovani()
{
  presun_z_vytvor_do_aktual();
  ulozit_tymy_aktualneho_turnaju();
  
  turnaje.push([(turnaje.length),aktualny_turnaj_nazov,aktualny_turnaj_typ,aktualny_turnaj_pocet_skupin,localStorage.pocet_bodov_za_vyhru,localStorage.pocet_bodov_za_remizu,localStorage.pocet_bodov_za_prehru]);
  aktualny_turnaj_id=turnaje.length-1;
  
  var spravne_generovanie;
  if(aktualny_turnaj_typ=="liga")spravne_generovanie=vygeneruj_turnaj_liga();
  if(aktualny_turnaj_typ=="play_off")spravne_generovanie=vygeneruj_turnaj_play_off();
  if(aktualny_turnaj_typ=="turnaj")spravne_generovanie=vygeneruj_turnaj_turnaj();
  if(spravne_generovanie==false)return false;
  
  localStorage.turnajevpamati=JSON.stringify(turnaje);
  localStorage.zapasyvpamati=JSON.stringify(zapasy);
  
  var tabulka=ziskaj_tabulku_podla_zapasov();
  vykresli_tabulku(zorad_tabulku_podla_bodov(tabulka));
  return true;
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
  if(pocet_tymov==1)
  {
    alert(""+lang_malo_timov+"");
    return false;
  }
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
  return true;
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

  if(pocet_tymov==1)
  {
    alert(""+lang_malo_timov+"");
    return false;
  }
  
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
  return true;
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
  return true;
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
