import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { User, Car, Shield, Wrench, Clock, Zap, ChevronDown, ChevronRight, Star, Phone, Mail, MapPin, Check, X } from "lucide-react";

function GeneralTerms() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };


  return (
    <div className=''>

      <header>
        <div className="flex items-center justify-between" style={{ padding: 30 }}>
          <Link to="/"><img src={require('../../assets/teslalogo.png')} style={{ height: 40 }} alt="" /></Link>
          <nav className="text-black flex gap-6">
            <select onChange={(e) => changeLanguage(e.target.value)} name="" id="">
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="sr">SR</option>
            </select>
            <Link to="/auth"><User /></Link>
          </nav>
        </div>
        <div className="flex header-submenu items-center justify-center gap-6 text-black py-2 border-t border-[#f7f7f7]">
          <Link className="opacity-50" to="/vehicles" style={{ fontSize: 14 }}>{t('header.vehicles')}</Link>
          <Link className="opacity-50" to="/general-terms" style={{ fontSize: 14 }}>{t('footer.linkFour')}</Link>
        </div>
      </header>

      <div className="w-full max-w-screen-md p-6 mx-auto">
        <h1 className='text-5xl font-semibold text-center w-full'>Opšti Uslovi</h1>
        <h3 className="mt-6 text-center" style={{ fontSize: 18 }}>
          <strong className="text-center w-full">OPŠTI USLOVI POSLOVANJA</strong>
          <br />
          <br />
          <br />
          Član 1
          <br />
          TESLA CAR RENT-A-CAR DOO BEOGRAD je privredno društvo registrovano pred Agencijom za Privredne Registre, sa sedištem u Beogradu (Zemun), na adresi Vojvode Vratka broj 10A, MB: 21929603, PIB: 113813797. U skladu sa ovim Opštim uslovima poslovanja, kao i Ugovorom o najmu između TESLA CAR RENT-A-CAR DOO BEOGRAD i Najmoprimca, Ugovorne strane imaju sledeća prava i obaveze, a sve kako dalje sledi:
          <br />
          <br />
          Član 2
          <br />
          Najmoprimac se svojim potpisom na Ugovoru o najmu, saglašava sa odredbama Ugovora, važećeg cenovnika i Opštim uslovima poslovanja TESLA CAR RENT-A-CAR DOO BEOGRAD te se posebno obavezuje:
          <br />
          1. Da je iznajmljeno vozilo preuzeo shodno Zakonu o osnovama bezbednosti saobraćaja na putevima.
          <br />
          2. Da je uz vozilo primio svu potrebnu dokumentaciju za vozilo, ključeve za vozilo, svu obaveznu opremu, kao i dodatnu opremu za vozilo.
          <br />
          3. Da će iznajmljeno vozilo nakon završetka perioda najma vratiti na mesto utvrđeno Ugovorom o najmu.
          <br />
          4. Da će produženje perioda najma vozila, kao i sve ostale promene u Ugovoru, zahtevati od TESLA CAR RENT-A-CAR DOO BEOGRAD u periodu ne kasnijem od 24 časa pre ugovorenog roka vraćanja iznajmljenog vozila.
          <br />
          5. Da će odmah prekinuti vožnju iznajmljenog vozila ako se za vreme najma dogodi kvar na vozilu i da će o kvaru odmah obavestiti TESLA CAR RENT-A-CAR DOO BEOGRAD.
          <br />
          6. Da iznajmljeno vozilo neće koristiti u bilo kakve nedozvoljene svrhe (za vršenje krivičnih dela, carinskih i sličnih prekršaja, kao i drugih protivpravnih radnji), da vozilo neće koristiti za vršenje obuke drugih vozača, da vozilo neće iznajmiti trećem licu, da neće vršiti prevoz teškog tereta, vuču drugih vozila i prikolica, da vozilo neće koristiti za prevoz životinja, lako zapaljivog i eksplozivnog materijala i kabastog materijala koji može oštetiti vozilo, kao i da neće učestvovati u automobilskim trkama i sličnim priredbama.
          <br />
          7. Da neće upravljati iznajmljenim vozilom pod dejstvom alkohola, droga ili drugih opojnih sredstava, da neće konzumirati cigarete u iznajmljenom vozilu.
          <br />
          8. Ukoliko Najmoprimac postupi suprotno tačkama broj 6 i 7 ovog člana, dužan je da nadoknadi pričinjenu štetu, bez odlaganja, u punom iznosu, TESLA CAR RENT-A-CAR DOO BEOGRAD.
          <br />
          9. Da će iznajmljeno vozilo koristiti samo za sopstvene potrebe i da će vozilom upravljati Najmoprimac, potpisnik Ugovora ili dodatni vozač, naveden u odredbama Ugovora, koja lica moraju ispunjavati sve potrebne uslove. Materijalna odgovornost svih Najmoprimaca vozila (osnovni vozač, dodatni vozač) je solidarna.
          <br />
          10. Da iznajmljeno vozilo ne optereti osobama ili predmetima preko dozvoljene maksimalne težine.
          <br />
          11. Da vozilom ne pređe državnu granicu Republike Srbije, bez posebne saglanosti TESLA CAR RENT-A-CAR DOO BEOGRAD.
          <br />
          12. Da bez pisane saglasnosti TESLA CAR RENT-A-CAR DOO BEOGRAD ne sme vršiti nikakvu promenu delova, sklopova, uređaja niti opreme na iznajmljenom vozilu, niti da menja spoljašnji i unutrašnji izgled vozila. Promenjene ili nedostajuće delove Najmoprimac je dužan nadoknaditi TESLA CAR RENT-A-CAR DOO BEOGRAD.
          <br />
          13. Da uređaje ili sredstva za obezbeđenje vozila od krađe, koja su na raspolaganju obavezno koristi i vozilo adekvatno zaštiti u svakom momentu tokom trajanja perioda najma istog.
          <br />
          14. Da u svako doba omogući kontrolu vozila i dokumentacije ovlašćenom licu TESLA CAR RENT-A-CAR DOO BEOGRAD.
          <br />
          15. Da će posebno obratiti pažnju na sve signale i kontrolne lampice na instrument tabli Iznajmljenog vozila i da će o svim iregularnostima i nepravilnostima bez odlaganja obavestiti Najmodavca.
          <br />
          <br />
          Član 3
          <br />
          Najmoprimac je u obavezi da ispuni osnovne uslove za najam vozila kako dalje sledi:
          
          <li>Da ima navršenih 21 godinu života;</li>
          
          <li>Posedovanje važeće vozačke dozvole u periodu od minimum tri godine</li>
          
          <li>Identifikacija sa važećom ličnom kartom/pasošem, koje je potrebno dostaviti kako u originalu na uvid, tako i kopirani/skenirani primerak Najmodavcu</li>
          
          <li>Dokaz o svojstvu Najmoprimaca u pravnom licu (ugovor o radu, pečat firme, punomoć- važi samo u slučaju da pravno lice iznajmljuje vozilo).</li>
          
          <li>Obavezno polaganje depozita u odgovarajućem iznosu, putem platne kartice, ili u gotovini, kao sredstvo obezbeđenja prilikom najma vozila, u minimalnom iznosu od 117.000,00 RSD.</li>
          
          <li>Minimalna dužina najma vozila u periodu od 1 dana (24h), uz toleranciju do 1h kašnjenja prilikom vraćanja vozila, nakon čega se automatski uračunava novi dan najma prema važećem cenovniku.</li>
          
          <br />
          Član 4
          <br />
          Najmoprimac se obavezuje da u slučaju nastanka krađe iznajmljenog vozila, nadoknadi tržišnu vrednost vozila TESLA CAR RENT-A-CAR DOO BEOGRAD, u skladu sa procenom nezavisnog procenitelja, angažovanog od strane TESLA CAR RENT-A-CAR DOO BEOGRAD.
          <br />
          Sva vozila TESLA CAR RENT-A-CAR DOO BEOGRAD opremljena su odgovarajućim uređajima za praćenje, odnosno tehnologijom koja omogućuje određivanje položaja vozila. Prilikom iznajmljivanja vozila, Najmoprimac se obavezuje da posebno da pisanu saglasnost da TESLA CAR RENT-A-CAR DOO BEOGRAD može da prikupi, sačuva i koristi GPS koordinate i merenje brzine i ostalih parametara iznajmljenog vozila.
          <br />
          <br />
          Član 5
          <br />
          Najmoprimac je dužan da pri zaključivanju Ugovora o najmu vozila akontira utvrđeni novčani iznos i deponuje druge ispravne i naplative instrumente plaćanja, prema važećem cenovniku.
          <br />
          Najmoprimac ima mogućnost plaćanja:
          <br />
          <li>Platnim karticama</li>
          <li>Gotovinom</li>
          <br />
          Član 6
          <br />
          U cenu najma vozila je uključen PDV, koji se obračunava prema važećim zakonskim propisima.
          <br />
          <br />
          Član 7
          <br />
          Najmoprimac, zaključenjem Ugovora o najmu, prihvata da isplati TESLA CAR RENT-A-CAR DOO BEOGRAD:
          <br />
          <li className="list-none">1. Najam vozila i ostale izabrane dodatne usluge, prema važećem cenovniku.</li>
          <li className="list-none">2. Sve troškove koji nastanu u vezi sa korišćenjem vozila za vreme trajanja najma (putarine, saobraćajne kazne, parking kazne i druge slične troškove).</li>
          <li className="list-none">3. Trošak povratne kilometraže, u slučaju kad Najmoprimac vraća iznajmljeno vozilo van ugovorenog mesta vraćanja vozila, prema važećem cenovniku.</li>

          <br />
          Član 8
          <br />
          Najmoprimcu se na korišćenje daje tehnički ispravno vozilo, koju činjenicu Najmoprimac posle pregleda istog potvrđuje svojim potpisom na Ugovoru.
          <br />
          <br />
          Najmodavac ima pravo da sačini fotografije vozila, kao i da pregleda vozilo, kako pre, tako i posle perioda najma vozila.
          <br />
          <br />
          Za sve eventualne tehničke neispravnosti koje nastanu u toku perioda najma vozila Najmoprimac snosi punu odgovornost.
          <br />
          <br />
          Najmoprimac je u potpunosti odgovoran za nivo napunjenosti baterije električnog vozila, te će snositi sve eventualne posledice koje se mogu pojaviti usled eventualnog pražnjenja baterije, kao što je, na primer, snošenje troška prevoza električnog vozila šlep službom usled ispražnjenosti baterije, kao i bilo kog drugog troška uzrokovanog navedenim pražnjenjem baterije.
          <br />
          <br />
          Najmoprimac se obavezuje da puni bateriju isključivo na aparatima – punjačima, koji su namenjeni za punjenje tog tipa električnog vozila.
          <br />
          <br />
          Najmoprimac nema pravo na korišćenje opcije autopilota na električnom vozilu, već se obavezuje da u celosti samostalno, na manuelan način, upravlja električnim vozilom, te se obavezuje da u celosti naknadi štetu koja može nastati usled korišćenja opcije autopilota.
          <br />
          <br />
          Ako prilikom korišćenja vozila dođe do oštećenja elektromotora, pogonskog mehanizma, menjača, baterijskog sistema ili drugog karakterističnog dela, ugovorne strane će zajednički, odlaskom u ovlašćeni servis, ili putem ovlašćenog sudskog veštaka, izvršiti defektažu kvara i utvrditi visinu materijalne štete. Ukoliko je do kvara došlo usled nepažnje Najmoprimca prilikom korišćenja vozila, Najmoprimac je dužan da nadoknadi TESLA CAR RENT-A-CAR DOO BEOGRAD pričinjenu materijalnu štetu na vozilu u punom iznosu, kao i izgubljenu dobit zbog nekorišćenja vozila, u visini minimalne zarade TESLA CAR RENT-A-CAR DOO BEOGRAD, prema važećem cenovniku, za vremenski period u kom se vozilo nije moglo koristiti. U slučaju totalne havarije na iznajmljenom vozilu, Najmoprimac je dužan da TESLA CAR RENT-A-CAR DOO BEOGRAD nadoknadi izgubljenu dobit od dana nastanka havarije do dana zamene havarisanog vozila novim.
          <br />
          <br />
          Član 9
          <br />
          Najmoprimac može koristiti vozilo van teritorije Republike Srbije, isključivo uz posebnu prethodnu saglasnost datu od strane TESLA CAR RENT-A-CAR DOO BEOGRAD. Ukoliko Najmoprimac samoinicijativno koristi vozilo van teritorije Republike Srbije, bez prethodno izdate saglasnosti, snosi punu odgovornost u slučaju kvara, krađe ili saobraćajne nezgode sa iznajmljenim vozilom i dužan je da obešteti TESLA RENT-A-CAR DOO BEOGRAD za nastale štete, u punom iznosu, procenjenom od strane nezavisnog procenitelja.
          <br />
          <br />
          Korišćenje vozila na teritoriji Turske, Rusije, Ukrajine, Belorusije, teritorije Autonomne pokrajine Kosovo i Metohija, kao i na ostrvima i ostrvskim državama izričito je zabranjeno.
          <br />
          <br />

          Član 10
          <br />
          Ukoliko Najmoprimac vrati vozilo pre roka koji je naveden u Ugovoru, nema pravo na naknadu i povraćaj prethodno uplaćenih sredstava za najam istog.
          <br />
          <br />
          Najmoprimcu se posebno obraća pažnja na to da se Ugovor o najmu ne završava automatski nakon ostavljanja ključeva iznajmljenog vozila. Iznajmljeno vozilo ostaje na parking mestu gde ste ga parkirali do otvaranja poslovnice Najmodavca, koji će izvršiti pregled Vozila i okončati Ugovor o najmu. Vi se kao Najmoprimac obavezujete da iznajmljeno vozilo vratite na prostor predviđen u tu svrhu, i to tako da vozilo ne predstavlja opasnost za druge, da ne ometa saobraćaj, u skladu sa saobraćajnim propisima.
          <br />
          <br />
          Najmodavac se ne može smatrati odgovornim za eventualnu imovinu ili predmete koje je Najmoprimac zaboravio ili ostavio u iznajmljenom vozilu.
          <br />
          <br />
          Član 11
          <br />
          Osiguranje vozila ne pokriva i sledeće vrste štete na iznajmljenom vozilu:
          <br />
          
          <li className="list-none">1. Štete nastale u unutrašnjosti vozila</li>
          <li className="list-none">2. Štete nastale sa donje strane šasije vozila</li>
          <li className="list-none">3. Šteta nastala na baterijskom sistemu vozila</li>
          <li className="list-none">4. Oštećenje guma i felni</li>
          <li className="list-none">5. Oštećenje ili gubitak ključa vozila</li>
          <li className="list-none">6. Ostale štete nastale svesno ili grubom nepažnjom Najmoprimca</li>
          <br />
          <br />
          Sva prethodno nabrojena oštećenja biće naplaćena u punom iznosu popravke istih od Najmoprimca, najkasnije u momentu vraćanja iznajmljenog vozila.
          <br />
          <br />
          Član 12
          <br />
          TESLA CAR RENT-A-CAR DOO BEOGRAD ne odgovara za štetu pričinjenu trećim licima, koja je nastala nepoštovanjem saobraćajnih propisa i neprilagođavanjem vožnje uslovima puta od strane Najmodavca kao ni za štetu nastalu gubitkom ili oštećenjem prtljaga i robe koja se nalazi u ili van vozila.
          <br />
          <br />
          U slučaju da za TESLA CAR RENT-A-CAR DOO BEOGRAD nastane bilo kakva obaveza plaćanja po osnovu naknade štete ili po bilo kom drugom osnovu, prema trećim licima, a povodom uzroka ili događaja koji se mogu pripisati Najmoprimcu, TESLA CAR RENT-A-CAR DOO BEOGRAD je ovlašćen da zadrži ceo iznos prethodno primljenog depozita, sve dok od strane Najmoprimca ne bude obeštećen u punom iznosu nastale štete.
          <br />
          <br />
          Član 13
          <br />
          Ukoliko Najmoprimac ne vrati vozilo u ugovorenom roku (uz toleranciju dozvoljenog kašnjenja), smatraće se da je Ugovor o najmu vozila produžen pod istim uslovima.
          <br />
          <br />
          Član 14
          <br />
          Dostava i preuzimanje vozila se ne naplaćuje na području opštine Novi Beograd, a van područja opštine Novi Beograd, u ostalim gradskim opštinama u okviru grada Beograda, naplaćuje se u iznosu od 6000 RSD, u dinarskoj protivvrednosti, po srednjem kursu NBS na dan uplate.
          <br />
          <br />
          Član 15
          <br />
          Najmoprimac je dužan da vrati iznajmljeno vozilo sa jednakim procentom napunjene baterije sa kojom ga je i preuzeo, a najmanje sa preostalim dometom vožnje od 50km, koji mora biti iskazan na kontrolnoj tabli iznajmljenog vozila u momentu vraćanja istog.
          <br />
          <br />

          Član 16
          <br />
          U slučaju saobraćajne nezgode ili totalne havarije vozila, koje je prouzrokovao Najmoprimac, isti je dužan da snosi troškove šlep službe do servisa ili poslovnice TESLA CAR RENT-A-CAR DOO BEOGRAD, u skladu sa nalogom TESLA CAR RENT-A-CAR DOO BEOGRAD.
          <br />
          <br />
          Član 17
          <br />
          Gubitak saobraćajne dozvole ili registarske tablice iznajmljenog vozila naplaćuje se kao ugovorna kazna, u iznosu od 17500 RSD, u dinarskoj protivvrednosti, po srednjem kursu NBS na dan uplate.

          Najmoprimac dužan je da gubitak saobraćajne dozvole ili registarske tablice iznajmljenog vozila prijavi odmah nakon što primeti nestanak istih.
          <br />
          <br />
          Član 18
          <br />
          Prethodno navedeni uslovi osiguranja vozila, iz člana 11 i 12 Ugovora, ne važe u slučaju kada Najmoprimac da na upotrebu vozilo drugom licu, koje nije navedeno kao dodatni vozač u okviru Ugovora, a vozilu se pričini eventualna šteta. U ovom slučaju Najmoprimac snosi sve troškove naknade štete, kako prema trećem licu kojem je šteta prouzrokovana, tako i prema TESLA CAR RENT-A-CAR DOO BEOGRAD.
          <br />
          <br />
          Član 19
          <br />
          U slučaju saobraćajne nezgode ili havarije na iznajmljenom vozilu, Najmoprimac preuzima obavezu da dostavi sledeću dokumentaciju:

          1. Zapisnik MUP-a
          2. Izjavu lica koje je prouzrokovalo saobraćajnu nezgodu/havariju na vozilu
          3. Izjavu o načinu nastanka saobraćajne nezgode/havarije na vozilu
          4. Naziv osiguravajućeg društva lica koje je prouzrokovalo saobraćajnu nezgodu, registarski broj vozila i broj polise osiguranja
          <br />
          <br />
          Član 20
          <br />
          U slučaju totalne havarije ili krađe vozila, depozit uplaćen prilikom preuzimanja iznajmljenog vozila se ne vraća Najmoprimcu.
          <br />
          <br />
          Član 21
          <br />
          Najmodavac obaveštava Najmoprimca da je pušenje u iznajmljenom vozilu strogo zabranjeno, te da u slučaju pušenja u vozilu, Najmodavac ima pravo da od Najmoprimca potražuje paušalnu nadoknadu u slučaju kršenja zabrane, i to u iznosu od 11700 RSD.
          <br />
          <br />
          U slučaju da Najmoprimac koristi iznajmljeno vozilo na način suprotan ovim Opštim uslovima poslovanja, kao i suprotno Ugovorom o najmu, i to na način da izazove dodatne troškove čišćenja, Najmodavac ima pravo da od Najmoprimca potražuje paušalnu nadoknadu u slučaju potrebe čišćenja vozila, i to u iznosu od 11700 RSD.
          <br />
          <br />
          Član 22
          <br />
          Najmoprimac može da izvrši izmenu ili otkazivanje rezervacije, bez naknade, pod uslovima da o tome obavesti Najmodavca najmanje 15 dana pre početka najma vozila, a u ostalim slučajevima, Najmodavac ima pravo da naplati iznos od 50% od ukupne cene najma vozila.
          <br />
          <br />
          Najmodavac ima pravo da naplati 100% cene najma vozila u slučaju da Najmoprimac izvrši otkaz ili izmenu rezervacije u roku kraćem od 24h od početka najma vozila.
          <br />
          <br />
          Najmodavac ima pravo da u slučaju izmene rezervacije može izvršiti izmenu cene najma.
          <br />
          <br />
          Izmene rezervacije se mogu učiniti kontaktiranjem Najmodavca.
          <br />
          <br />
          Član 23
          <br />
          Najmodavac ovim putem obaveštava Najmoprimca da će koristiti i obrađivati njegove lične podatke samo u obimu u kom je to neophodno radi poslovanja Najmodavca, regulisanog relevantnim zakonskim odredbama, Ugovorom o najmu i ovim Opštim uslovima poslovanja.
          <br />
          <br />
          Član 24
          <br />
          Najmoprimac ima pravo da prodnese reklamaciju na rad Najmodavca, na način i u rokovima propisanim relevantnim zakonskim odredbama o reklamaciji.
          <br />
          <br />
          Član 25
          <br />
          Najmoprimac je upoznat sa svim uslovima i odredbama ovih Opštih uslova poslovanja, Ugovora o najmu, te prihvata punu pravnu i materijalnu odgovornost po svim prethodno navedenim članovima istog.
          <br />
          <br />
          Član 26
          <br />
          Ugovorne strane se obavezuju da će sve sporove koji bi mogli nastati u vezi s Opštim uslovima poslovanja ili Ugovorom nastojati rešiti sporazumno i mirnim putem, a ukoliko to nije moguće, ugovaraju nadležnost Osnovnog suda u Novom Sadu.
        </h3>
        <img src="https://i.imgur.com/Gooisa2.png" className="text-center mx-auto mt-6" style={{ height: 60 }} alt="" />
      </div>

                  <footer className="bg-gray-900 text-white py-16">
                      <div className="max-w-7xl mx-auto px-6">
                          <div className="grid md:grid-cols-4 gap-12 mb-12">
                              <div className="md:col-span-1">
                                  <img src={require('../../assets/teslalogo.png')} style={{ height: 40 }} alt="Tesla Rent" className="mb-6" />
                                  <p className="text-gray-400 text-sm leading-relaxed">{t('footer.description')}</p>
                              </div>
                              <div>
                                  <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
                                  <ul className="space-y-2">
                                      <li><Link to="/vehicles" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.vehicles')}</Link></li>
                                      <li><a href="#how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.howItWorks')}</a></li>
                                      <li><a href="#faq" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.faqLink')}</a></li>
                                      <li><Link to="/auth" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.login')}</Link></li>
                                  </ul>
                              </div>
                              <div>
                                  <h4 className="font-semibold mb-4">{t('footer.information')}</h4>
                                  <ul className="space-y-2">
                                      <li><Link to="/terms-of-complaints" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkOne')}</Link></li>
                                      <li><Link to="/payment-terms" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkTwo')}</Link></li>
                                      <li><Link to="/payment-methods" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkThree')}</Link></li>
                                      <li><Link to="/general-terms" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkFour')}</Link></li>
                                      <li><Link to="/rights-to-withdraw" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkFive')}</Link></li>
                                      <li><Link to="/protection-of-transaction" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkSix')}</Link></li>
                                  </ul>
                              </div>
                              <div>
                                  <h4 className="font-semibold mb-4">{t('footer.contactTitle')}</h4>
                                  <ul className="space-y-3">
                                      <li className="flex items-center gap-3 text-gray-400 text-sm"><MapPin size={16} className="flex-shrink-0" /><span>{t('footer.address')}</span></li>
                                      <li className="flex items-center gap-3 text-gray-400 text-sm"><Phone size={16} className="flex-shrink-0" /><a href="tel:+381661212000" className="hover:text-white transition-colors">{t('footer.phone')}</a></li>
                                      <li className="flex items-center gap-3 text-gray-400 text-sm"><Mail size={16} className="flex-shrink-0" /><a href="mailto:info@teslarent.rs" className="hover:text-white transition-colors">{t('footer.email')}</a></li>
                                  </ul>
                              </div>
                          </div>
                          <div className="border-t border-gray-800 pt-8 text-center">
                              <p className="text-gray-500 text-sm">{t('footer.copyright')}</p>
                              <p className="text-gray-600 text-xs mt-2">{t('footer.madeBy')} <a href="tel:+381661212000" className="hover:text-gray-400 transition-colors">David Obradović</a></p>
                          </div>
                      </div>
                  </footer>

    </div>
  )
}

export default GeneralTerms