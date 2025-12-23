import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { User, Car, Shield, Wrench, Clock, Zap, ChevronDown, ChevronRight, Star, Phone, Mail, MapPin, Check, X } from "lucide-react";

function RightToWithdraw() {
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
        <h1 className='text-5xl font-semibold text-center w-full'>Pravo na odustanje</h1>
        <h3 className="mt-6 text-center" style={{ fontSize: 18 }}>
          <strong>Pravo na odustajanje (Obrazac za odustanak)</strong>
          <br/>
          <br />
          Imate pravo da odustanete od zakupa vozila u skladu sa Zakonom o zaštiti potrošača, pod sledećim uslovima:
          <br />
          <br />
          Otkazivanje do 15 dana pre početka zakupa: Moguće je izvršiti otkazivanje rezervacije bez ikakvih troškova.
          Otkazivanje manje od 15 dana, a više od 24 sata pre početka zakupa: Tesla Rent-a-Car zadržava pravo naplate 50% ukupne cene zakupa.
          Otkazivanje manje od 24 sata pre početka zakupa: Naplaćuje se 100% ukupne cene zakupa.
          <br />
          <br />
          Ukoliko želite da odustanete od zakupa, molimo vas da popunite sledeći obrazac:
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

export default RightToWithdraw