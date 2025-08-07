import React from "react";
import { User, Car, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MainScreen = () => {

    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="w-screen min-h-screen bg-white">
<header>
        <div className="flex items-center justify-between" style={{ padding: 30 }}>
          <Link to="/"><img src={require('../assets/teslalogo.png')} style={{ height: 40 }} alt="" /></Link>
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
            <div className="hero-section flex items-center" style={{ height: 900 }}>
                <div className="">
                    <h1>{t('hero.title')}</h1>
                    <p>{t('hero.description')}</p>
                    <Link to="/vehicles" className="px-6 py-3 bg-[#59c23d] text-white rounded-md">{t('hero.button')}</Link>
                </div>
            </div>
            <div className="teslarent-cars max-w-screen-xl mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center px-6 border-b border-b-[#ddd]">
                    <div className="tesla-info text-black">
                        <h1 className="">{t('cars.model3.title')}</h1>
                        <p>{t('cars.model3.description')}</p>
                        <Link to="/vehicles" className="px-6 py-3 bg-[#59c23d] text-white rounded-md">{t('cars.model3.button')}</Link>
                    </div>
                    <img src="https://cdn.shopify.com/s/files/1/0628/1281/5558/files/TeslaSiva.png?v=1714031520" alt="" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center px-6">
                    <img src="https://cdn.shopify.com/s/files/1/0628/1281/5558/files/TeslaBraon.png?v=1714031542" alt="" />
                    <div className="tesla-info text-black">
                        <h1 className="">{t('cars.modelS.title')}</h1>
                        <p>{t('cars.modelS.description')}</p>
                        <Link to="/vehicles" className="px-6 py-3 bg-[#59c23d] text-white rounded-md">{t('cars.modelS.button')}</Link>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto mb-12 pb-8 grid grid-cols-1 md:grid-cols-3 p-12 rounded gap-12">
                <div className="flex flex-col items-center gap-6 text-black">
                    <Car size={60} />
                    <p className="text-center">{t('steps.step1')}</p>
                </div>
                <div className="flex flex-col items-center gap-6 text-black">
                    <Calendar size={60} />
                    <p className="text-center">{t('steps.step2')}</p>
                </div>
                <div className="flex flex-col items-center gap-6 text-black">
                    <Car size={60} />
                    <p className="text-center">{t('steps.step2')}</p>
                </div>
            </div>
            <div className="zasto-tesla bg-[#f7f7f7] max-w-screen-xl mx-auto pb-8 mb-8 rounded-xl gap-12 relative overflow-hidden">
                <img className="absolute opacity-25 bottom-2 right-2" src={require('../assets/icons/nikolatesla.png')} alt="" style={{ height: 400 }} />
                <h1>{t('whyTesla.title')}</h1>
                <p className="mb-8">{t('whyTesla.description')}</p>
                <button className="px-6 py-3 bg-black text-white rounded-md">{t('whyTesla.button')}</button>
            </div>
            
            {/* Data Protection Section */}
            <div className="max-w-screen-xl mx-auto mb-12 pb-8 px-6">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">{t('dataProtection.title')}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                        {t('dataProtection.serialNumber')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                        {t('dataProtection.controllerName')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                        {t('dataProtection.controllerAddress')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                        {t('dataProtection.dpoName')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                        {t('dataProtection.dpoAddress')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                        {t('dataProtection.dpoEmail')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('dataProtection.dpoPhone')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                                        {t('dataProtection.data.serialNumber')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                                        {t('dataProtection.data.controllerName')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                                        {t('dataProtection.data.controllerAddress')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                                        {t('dataProtection.data.dpoName')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                                        {t('dataProtection.data.dpoAddress')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                                        <a href={`mailto:${t('dataProtection.data.dpoEmail')}`} className="text-blue-600 hover:text-blue-800">
                                            {t('dataProtection.data.dpoEmail')}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <a href={`tel:${t('dataProtection.data.dpoPhone')}`} className="text-blue-600 hover:text-blue-800">
                                            {t('dataProtection.data.dpoPhone')}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <footer className="p-6 bg-[#f7f7f7] grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <img src={require('../assets/teslalogo.png')} style={{ height: 60 }} alt="" />
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
    );
};

export default MainScreen;
