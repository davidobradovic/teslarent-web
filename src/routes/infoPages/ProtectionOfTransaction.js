import React from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ProtectionOfTransaction() {
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
        <h1 className='text-5xl font-semibold'>Zaštita podataka o transakciji</h1>
        <h3 className="mt-6 text-center" style={{ fontSize: 18 }}>
          Zaštita poverljivih podataka o transakciji
          <br/>
          <br />
          Prilikom unošenja podataka o platnoj kartici, poverljive informacija se prenose putem javne mreže u zaštićenoj (kriptovanoj) formi upotrebom SSL protokola i PKI sistema, kao trenutno najsavremenije kriptografske tehnologije.
          <br />
          <br />
          Sigurnost podataka prilikom kupovine, garantuje procesor platnih kartica, OTP Banka Beograd, pa se tako kompletni proces naplate obavlja na stranicama banke. Niti jednog trenutka podaci o platnoj kartici nisu dostupni našem sistemu.
        </h3>
        <img src="https://i.imgur.com/Gooisa2.png" className="text-center mx-auto mt-6" style={{ height: 60 }} alt="" />
      </div>

      <footer className="p-6 bg-[#f7f7f7] grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <img src={require('../../assets/teslalogo.png')} style={{ height: 60 }} alt="" />
        </div>
        <div>
          <h1 className="font-semibold text-xl">{t('footer.titleOne')}</h1>
          <div className="grid grid-cols-1 gap-1 mt-3">
            <p className="opacity-50">{t('footer.infoOne')}</p>
            <p className="opacity-50">{t('footer.infoTwo')}</p>
            <p className="opacity-50">{t('footer.infoThree')}</p>
            <p className="opacity-50">{t('footer.infoFour')}</p>
            <p className="opacity-50">{t('footer.infoFive')}</p>
            <p className="opacity-50">{t('footer.infoSix')}</p>
            <p className="opacity-50">{t('footer.infoSeven')}</p>
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-xl">{t('footer.titleTwo')}</h1>
          <div className="grid grid-cols-1 gap-1 mt-3">
            <Link to="/terms-of-complaints" className="underline opacity-50 hover:opacity-100" href="">{t('footer.linkOne')}</Link>
            <Link to="/payment-terms" className="underline opacity-50 hover:opacity-100" href="">{t('footer.linkTwo')}</Link>
            <Link to="/payment-methods" className="underline opacity-50 hover:opacity-100" href="">{t('footer.linkThree')}</Link>
            <Link to="/general-terms" className="underline opacity-50 hover:opacity-100" href="">{t('footer.linkFour')}</Link>
            <Link to="/rights-to-withdraw" className="underline opacity-50 hover:opacity-100" href="">{t('footer.linkFive')}</Link>
            <Link to="/protection-of-transaction" className="underline opacity-50 hover:opacity-100" href="">{t('footer.linkSix')}</Link>
          </div>
        </div>
        <div className="md:col-span-2 text-center p-3">
          © 2025, Telsa Rent A Car
          <p className="text-xs opacity-50">Webiste made by: <a className="underline" href="tel:0038766415295">David Obradović</a></p>
        </div>
      </footer>

    </div>
  )
}

export default ProtectionOfTransaction