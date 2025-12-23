import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { User, Car, Shield, Wrench, Clock, Zap, ChevronDown, ChevronRight, Star, Phone, Mail, MapPin, Check, X } from "lucide-react";

function TermsOfComplaintsEtc() {

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
        <h1 className='text-5xl font-semibold text-center w-full'>Uslovi Reklamacije, Plaćanja, Naknade, Povraćaja Novca</h1>
        <h3 className="mt-6" style={{ fontSize: 20 }}>
          Reklamacija i Povraćaj Novca:
          U slučaju da dođe do reklamacije, klijent je u obavezi da nas kontaktira putem email adrese ili telefona navedenih na našem sajtu. Reklamacija mora biti podneta u roku od 24 sata nakon preuzimanja vozila. Nakon prijema reklamacije, naš tim će proceniti situaciju i, ukoliko je reklamacija opravdana, izvršiće povraćaj novca ili zamenu vozila u skladu sa dogovorom. Povraćaj novca se vrši u roku od 7 radnih dana od datuma odobrenja reklamacije.
          <br/>
          <br />
          Plaćanja i Naknade:
          Plaćanja se vrše putem online platforme dostupne na našem sajtu. Sve cene su jasno istaknute i uključuju PDV. Naknade za usluge se naplaćuju unapred i u skladu sa odabranim paketom usluga.
          <br />
          <br />
          Otkazivanje Usluge:
          Klijent ima pravo da otkaže rezervaciju najkasnije 48 sati pre preuzimanja vozila, bez dodatnih troškova. U slučaju otkazivanja u roku kraćem od 48 sati, zadržava se 50% od ukupnog iznosa kao naknada. Ukoliko se rezervacija otkaže na dan preuzimanja, povraćaj novca nije moguć. Otkazivanje se vrši putem emaila ili telefona, uz obaveznu potvrdu od strane našeg tima.
          <br />
          <br />
          „U slučaju vraćanja robe i povraćaja sredstava kupcu koji je prethodno platio nekom od
          platnih kartica, delimično ili u celosti, a bez obzira na razlog vraćanja, Tesla Rent a Car je u obavezi da povraćaj vrši isključivo preko VISA, EC/MC, Maestro i Dinacard metoda plaćanja, što znači da će banka na zahtev prodavca obaviti povraćaj sredstava na račun korisnika platne kartice“.
          <br />
          <br />
          Ovi uslovi su kreirani u cilju transparentnosti i zaštite prava naših klijenata, kao i obezbeđivanja vrhunske usluge u skladu sa zakonima i propisima Republike Srbije.
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

export default TermsOfComplaintsEtc