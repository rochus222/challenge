var lang_vytvor_turnaj="";
var lang_stolny_futbal="";    
var lang_pravidla_sub="";
var lang_o_aplikacii_sub="";
var lang_zvol_timy="";
var lang_novy_turnaj="";
var lang_tabulka="";
var lang_zapasy="";
var lang_pravidla="";
var lang_o_aplikacii="";
var lang_vysledok="";
var lang_nastavenia="";
var lang_turnaje="";
var lang_statistiky_timov="";
var lang_close_app="";
var lang_nastavenie_bodovania="";
var lang_body_za_vyhru="";
var lang_body_za_remizu="";
var lang_body_za_prehru="";
var lang_nastavenie_skupin="";
var lang_pocet_postupujucich="";
var lang_hra_sa_na_odvetu="";
var lang_nahodne_play_off_v_turnaji="";
var lang_ano="";
var lang_nie="";
var lang_nastavenie_aplikacie="";
var lang_jazyk="";
var lang_povodne_nastavenia="";
var lang_ulozit_nastavenia="";
var lang_povodne_nastavenia_confirm="";
var lang_povodne_nastavenia_alert="";
var lang_pridat_team="";
var lang_nazov_turnaja="";
var lang_generovat_turnaj="";
var lang_liga="";
var lang_play_off="";
var lang_turnaj="";
var lang_skupina="";
var lang_predkolo="";
var lang_kolo="";
var lang_vitaz_zapasu="";
var lang_zapas_c="";
var lang_tim_skupiny="";
var lang_tim="";
var lang_zapasov="";
var lang_body="";
var lang_ulozit_vysledok="";
var lang_ulozit_vysledok_confirm="";
var lang_ulozit_vysledok_alert="";
var lang_cislo="";
var lang_nazov="";
var lang_typ="";
var lang_skupiny="";
var lang_ziadne_turnaje="";
var lang_statistiky="";
var lang_pocet_odohranych_zapasov="";
var lang_pocet_danych_golov="";
var lang_pocet_dostanych_golov="";
var lang_bilancia_golov="";
var lang_pocet_vitazstiev="";
var lang_pocet_remiz="";
var lang_pocet_prehier="";
var lang_pocet_bodov="";
var lang_spat="";
var lang_malo_timov="";
var lang_nastavenia_boli_zmenene="";
var lang_zobraz_velke_vysledky="";
var lang_uloz_aktualny_vysledok="";
var lang_aktualny_turnaj="";
var lang_aktualne_zapasy="";
var lang_statistiky_popis="";
var lang_aktulana_tabulka="";
var neni_zadany_nazov_turnaja="";

function ziskaj_popisy_v_jazyku()
{
  if(localStorage.lang===undefined)localStorage.lang="sk";
  //SK
  if(localStorage.lang=="sk")
  {
    lang_vytvor_turnaj="Vytvor turnaj";
    lang_stolny_futbal="Stolný futbal";  
    lang_pravidla_sub="<h1>Zatvorený stôl s vhadzovačom</h1><ul><li>je zakázané : pretáčať hráčov o viac ako 1 otáčku, držať súperové tyče, posúvať stôl ak je lopta v hre, nevhodne znervózňovať súpera</li><li>spoluhráči si môžu vymienať pozície obrana útok po každom góle</li><li>po vhodení nechať prejsť loptu na druhú stranu stola a rozohrať stredovými hráčmi</li><li>strednou tyčou s piatimi hráčmi nestrielať z prvej, len po nahrávke na tyči</li><li>hráč by mal loptu posunúť z tyče - prihrať, alebo strielať do 15 sekúnd</li><li>gól platí aj keď loptička vyletí z brány</li><li>mŕtva lopty - lopta nedosiahnuteľná žiadnym hráčom - keďže sa jedná o uzavretý stôl, je nutné ho podvihnúť. Hráč, ku ktorému sa lopta dostane by mal rozohrať - nahrať si s ďalším hráčom na tyči a až potom pokračovať v hre</li></ul><h1>Otvorený futbalový stôl</h1><ul><li>je zakázané: pretáčať hráčov o viac ako 1 otáčku, držať súperove tyče, posúvať stôl ak je lopta v hre, zasahovať rukou, alebo inými predmetmi do hry, nevhodne znervózňovať súpera</li><li>hráči losujú kto bude rozohrávať, rozohráva sa zo stredu prihrávkou na tyči</li><li>hrá sa do dosiahnutia 10 gólov, alebo podľa dohody</li><li>gól platí aj keď lopta vyletí z brány, nasleduje rozohrávka hráča čo dostal gól</li><li>mŕtva lopta - hráč, ktorý bol naposledy v kontakte s loptou, alebo strielal prichádza o loptu a súper si ju nastaví a rozohráva z obrany prihrávkou.</li><li>hráč by mal loptu posunúť z tyče - prihrať, alebo strielať do 15 sekúnd</li><li>hráč, ktorý sa dopustí faulu (gól po pretáčaní, zdržovanie hry...) prichádza o loptu a súper rozohráva z obrany</li></ul>";
    lang_o_aplikacii_sub="<h1>Popis</h1><p>Aplikácia vznikla ako výsledok riešenia CALCETTO Challengu od spoločnosti ERNI zverejnenom na stránke www.challengest.sk. Aplikácia umožňuje vytváranie rôznych typov turnajov, zaznamenávanie výsledkov a generovanie štatistík podľa odohraných zápasov. Aplikácia je vytvorená pomocou aplikácie Phonegap a napísaná pomocou HTML+CSS+JavaScript.</p><h1>Autor</h1><p style=\"text-align:center;\"><b>Pavol Kögler - PK Designs</b><br />Nová 1076<br />925 22 Veľké Úľany<br /><br /><b>pavolkogler@gmail.com</b></p><br /><h1>© 2015 PK Designs | All rights reserved</h1>";
    
    lang_zvol_timy="Zvoľ tímy";
    lang_novy_turnaj="Nový turnaj";
    lang_tabulka="Tabuľka";
    lang_zapasy="Zápasy";
    lang_pravidla="Pravidlá";
    lang_o_aplikacii="O aplikácii";
    lang_vysledok="Výsledok";
    lang_nastavenia="Nastavenia";
    lang_turnaje="Turnaje";
    lang_statistiky_timov="Štatistiky tímov";
    
    lang_close_app="Chcete ukončiť aplikáciu?";
    
    lang_nastavenie_bodovania="Nastavenie bodovania";
    
    lang_body_za_vyhru="Body za výhru";
    lang_body_za_remizu="Body za remízu";
    lang_body_za_prehru="Body za prehru";
    
    lang_nastavenie_skupin="Nastavenie skupín";
    
    lang_pocet_postupujucich="Počet postupujúcich";
    lang_hra_sa_na_odvetu="Hrá sa na odvetu";
    lang_nahodne_play_off_v_turnaji="Náhodne play-off v turnaji";
    
    lang_ano="Áno";
    lang_nie="Nie";
    
    lang_nastavenie_aplikacie="Nastavenia aplikacie";
    lang_jazyk="Jazyk";
    
    lang_povodne_nastavenia="Pôvodné nastavenia";
    lang_ulozit_nastavenia="Uložiť nastavenia";
    
    lang_povodne_nastavenia_confirm="Pri tejto operácii sa odstránia všetky údaje o doterajších turnajoch, týmoch a zápasoch. Chcete pokračovať?";
    lang_povodne_nastavenia_alert="Pôvodné nastavenia boli nastavené.";
    
    lang_pridat_team="Pridať tím";
    lang_nazov_turnaja="Názov turnaja";
    lang_generovat_turnaj="Generovať turnaj";
    lang_liga="Liga";
    lang_play_off="Play off";
    lang_turnaj="Turnaj";
    lang_skupina="Skupina";
    lang_predkolo="PREDKOLO";
    lang_kolo="KOLO";
    lang_vitaz_zapasu="Víťaz zápasu";
    lang_zapas_c="Zápas č.";
    lang_tim_skupiny="tím skupiny";
    
    lang_tim="Tím";
    lang_zapasov="Zap.";
    lang_body="B";
    
    lang_ulozit_vysledok="Uložiť výsledok";
    lang_ulozit_vysledok_confirm="Zadanie výsledku ovplyvňuje zápasy v ďalších kolách turnaja. Zmeny nebudú vratné. Zadali ste správny výsledok?";
    lang_ulozit_vysledok_alert="V play-off nesmie byť remíza!";
    
    lang_cislo="Č.";
    lang_nazov="Názov";
    lang_typ="Typ";
    lang_skupiny="Skupiny";
    lang_ziadne_turnaje="Žiadne turnaje";
    lang_statistiky="Štatistiky";
    
    lang_pocet_odohranych_zapasov="Počet odohraných zápasov";
    lang_pocet_danych_golov="Počet daných gólov";
    lang_pocet_dostanych_golov="Počet dostaných gólov";
    lang_bilancia_golov="Bilancia gólov";
    lang_pocet_vitazstiev="Počet víťazstiev";
    lang_pocet_remiz="Počet remíz";
    lang_pocet_prehier="Počet prehier";
    lang_pocet_bodov="Celkový počet bodov";
    lang_spat="späť";
    
    lang_malo_timov="Na generovanie turnaja nie je dostatočný počet týmov";
    lang_nastavenia_boli_zmenene="Nastavenia boli úspešne zmenené.";
    
    lang_zobraz_velke_vysledky="Zobraz výsledkovú tabuľku";
    lang_uloz_aktualny_vysledok="Save";
    lang_aktualny_turnaj="Aktuálny turnaj";
    lang_aktualne_zapasy="Aktuálne zápasy";
    lang_statistiky_popis="Štatistiky tímov zo všetkých turnajov";
    lang_aktulana_tabulka="Aktuálna tabuľka";
    neni_zadany_nazov_turnaja="Prosím zadajte názov turnaju.";
  }
  else if(localStorage.lang=="en")
  {
    lang_vytvor_turnaj="Create tournament";
    lang_stolny_futbal="Table football"; 
    lang_pravidla_sub="<h1>Zatvorený stôl s vhadzovačom</h1><ul><li>je zakázané : pretáčať hráčov o viac ako 1 otáčku, držať súperové tyče, posúvať stôl ak je lopta v hre, nevhodne znervózňovať súpera</li><li>spoluhráči si môžu vymienať pozície obrana útok po každom góle</li><li>po vhodení nechať prejsť loptu na druhú stranu stola a rozohrať stredovými hráčmi</li><li>strednou tyčou s piatimi hráčmi nestrielať z prvej, len po nahrávke na tyči</li><li>hráč by mal loptu posunúť z tyče - prihrať, alebo strielať do 15 sekúnd</li><li>gól platí aj keď loptička vyletí z brány</li><li>mŕtva lopty - lopta nedosiahnuteľná žiadnym hráčom - keďže sa jedná o uzavretý stôl, je nutné ho podvihnúť. Hráč, ku ktorému sa lopta dostane by mal rozohrať - nahrať si s ďalším hráčom na tyči a až potom pokračovať v hre</li></ul><h1>Otvorený futbalový stôl</h1><ul><li>je zakázané: pretáčať hráčov o viac ako 1 otáčku, držať súperove tyče, posúvať stôl ak je lopta v hre, zasahovať rukou, alebo inými predmetmi do hry, nevhodne znervózňovať súpera</li><li>hráči losujú kto bude rozohrávať, rozohráva sa zo stredu prihrávkou na tyči</li><li>hrá sa do dosiahnutia 10 gólov, alebo podľa dohody</li><li>gól platí aj keď lopta vyletí z brány, nasleduje rozohrávka hráča čo dostal gól</li><li>mŕtva lopta - hráč, ktorý bol naposledy v kontakte s loptou, alebo strielal prichádza o loptu a súper si ju nastaví a rozohráva z obrany prihrávkou.</li><li>hráč by mal loptu posunúť z tyče - prihrať, alebo strielať do 15 sekúnd</li><li>hráč, ktorý sa dopustí faulu (gól po pretáčaní, zdržovanie hry...) prichádza o loptu a súper rozohráva z obrany</li></ul>";
    lang_o_aplikacii_sub="<h1>Popis</h1><p>Aplikácia vznikla ako výsledok riešenia CALCETTO Challengu od spoločnosti ERNI zverejnenom na stránke www.challengest.sk. Aplikácia umožňuje vytváranie rôznych typov turnajov, zaznamenávanie výsledkov a generovanie štatistík podľa odohraných zápasov. Aplikácia je vytvorená pomocou aplikácie Phonegap a napísaná pomocou HTML+CSS+JavaScript.</p><h1>Autor</h1><p style=\"text-align:center;\"><b>Pavol Kögler - PK Designs</b><br />Nová 1076<br />925 22 Veľké Úľany<br /><br /><b>pavolkogler@gmail.com</b></p><br /><h1>© 2015 PK Designs | All rights reserved</h1>";
    
    lang_zvol_timy="Choose teams";
    lang_novy_turnaj="New tournament";
    lang_generovat_turnaj="Generate";
    lang_tabulka="Table";
    lang_zapasy="Matches";
    lang_pravidla="Rules";
    lang_o_aplikacii="About App";
    lang_vysledok="Result";
    lang_nastavenia="Settings";
    lang_turnaje="Tournaments";
    lang_statistiky_timov="Team Statistics";
    
    lang_close_app="Do you want to close this app?";
    
    lang_nastavenie_bodovania="Points";
    
    lang_body_za_vyhru="Points for win";
    lang_body_za_remizu="Points for draw";
    lang_body_za_prehru="Points for loss";
    
    lang_nastavenie_skupin="Groups";
    
    lang_pocet_postupujucich="Advancing teams";
    lang_hra_sa_na_odvetu="Rematch";
    lang_nahodne_play_off_v_turnaji="Random play-off in tournament";
    
    lang_ano="Yes";
    lang_nie="No";
    
    lang_nastavenie_aplikacie="App Settings";
    lang_jazyk="Language";
    
    lang_povodne_nastavenia="Original settings";
    lang_ulozit_nastavenia="Save settings";
    
    lang_povodne_nastavenia_confirm="All data about teams, matches and tournaments will be deleted. Do you want to continue?";
    lang_povodne_nastavenia_alert="Original settings were set.";
    
    lang_pridat_team="Add team";
    lang_nazov_turnaja="Name";
    lang_liga="League";
    lang_play_off="Play off";
    lang_turnaj="Tournament";
    lang_skupina="Group";
    lang_predkolo="Before Round";
    lang_kolo="Round";
    lang_vitaz_zapasu="Winner of match";
    lang_zapas_c="Match No.";
    lang_tim_skupiny="Team from Group";
    
    lang_tim="Team";
    lang_zapasov="Played";
    lang_body="P";
    
    lang_ulozit_vysledok="Save result";
    lang_ulozit_vysledok_confirm="Saveing this result will affect other matches. These changes can't be returned. Did you insert right result?";
    lang_ulozit_vysledok_alert="There can't be draw in play-off!";
    
    lang_cislo="No.";
    lang_nazov="Name";
    lang_typ="Type";
    lang_skupiny="Groups";
    lang_ziadne_turnaje="No tournaments";
    lang_statistiky="Statistics";
    
    lang_pocet_odohranych_zapasov="Matches played";  
    lang_pocet_danych_golov="Goals For";
    lang_pocet_dostanych_golov="Goals Against";
    lang_bilancia_golov="Goal Difference";
    lang_pocet_vitazstiev="Wins";
    lang_pocet_remiz="Draws";
    lang_pocet_prehier="Loses";
    lang_pocet_bodov="Points";
    lang_spat="back";
    
    lang_malo_timov="There is not enough teams for generating";
    lang_nastavenia_boli_zmenene="Settings were changed.";
    
    lang_zobraz_velke_vysledky="Show big results";
    lang_uloz_aktualny_vysledok="Save";
    lang_aktualny_turnaj="Actual tournament";
    lang_aktualne_zapasy="Actual matches";
    lang_statistiky_popis="Statistics from all tournaments";
    lang_aktulana_tabulka="Actual table";
    neni_zadany_nazov_turnaja="Please insert the name of the tournament";
  }
}