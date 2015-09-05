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
  obsah_stranky[4][0]=aktualny_turnaj_nazov;
  obsah_stranky[4][1]=string;
}

function zadaj_vysledok_zapasu(vysledok)
{
  var option1="<option value=\"-\">-</option>";
  var option2="<option value=\"-\">-</option>";
  var selected;
  for(var i=0;i<101;i++)
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
