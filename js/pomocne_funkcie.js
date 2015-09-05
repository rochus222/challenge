/*vracia nazov tymu ktory ma byt na nejakom poradi v nejakej skupine ako sa to ma vypisat do zozanamu zapasov*/
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

/*ziska id tymu podla random cisla pri generovani turnaja*/
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

/*vrati nazov timu podla zadaneho id*/
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

/*zisti cu uz zapas existuje v aktualnom turnaji*/
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

/*zisti ci tim uz v kole hral*/
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

/*vrati pocet tymov v aktualnom turnaji*/
function ziskaj_pocet_tymov_aktualneho_turnaju()
{
  var pocitadlo=0
  for(var i=0; i<tymy.length;i++)
  {
    if(tymy[i][3]==1)pocitadlo++;
  }
  return pocitadlo;
}