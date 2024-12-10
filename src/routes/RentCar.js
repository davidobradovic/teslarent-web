import React from "react";
import { MenuIcon, Search, CarIcon, ShoppingBag, UserRound, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import bgTeslaModel3 from "../assets/cars/model3.png"

function RentCar() {
    return (
        <div className="w-screen min-h-screen bg-black">
            <header>
                <div className="flex items-center justify-between" style={{ padding: 30 }}>
                    <Link to="/"><img src={require('../assets/teslalogo.png')} style={{ height: 40 }} alt="" /></Link>
                    <nav className="text-white flex gap-6">
                       
                        <Link><User /></Link>
                    </nav>
                </div>
                <div className="flex header-submenu items-center justify-center gap-6 text-white py-2 border-t border-[#1e1e1e]">
                    <Link className="opacity-100" to="/vozila" style={{ fontSize: 14 }}>Vozila</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>Moje rezervacije</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>Blog</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>O nama</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>Kontakt</Link>
                </div>
            </header>
            <div className="car-container">
                <img className="w-full" src={bgTeslaModel3} alt="" />
                <div className="rent-details text-white p-10">
                    <div className="car-main-info mb-10 max-w-screen-xl mx-auto">
                        <h1 className="text-4xl pb-1 font-light">Tesla Model 3</h1>
                        <p className="opacity-50">Tesla Model 3 – Spoj performansi i efikasnosti.Brzina, inovacija i vrhunski dizajn u jednom vozilu. Uživajte u izuzetnoj vožnji s električnim pogonom, dugom autonomijom i naprednim tehnologijama koje čine svaki trenutak na putu nezaboravnim.</p>
                    </div>
                    <div className="rent-section grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 max-w-screen-xl mx-auto">
                        <input className="p-4 border-b border-b-[#2e2e2e] outline-none rounded-lg bg-[#1e1e1e]" type="datetime-local" />
                        <input className="p-4 border-b border-b-[#2e2e2e] outline-none rounded-lg bg-[#1e1e1e]" type="datetime-local" />
                        <button className="p-4 border-none outline-none rounded-lg bg-[#59c23d] text-white">Rezerviši</button>
                    </div>
                    <div className="car-details grid grid-cols-1 gap-6 max-w-screen-xl mx-auto">
                        <div className="car-details-card bg-[#1e1e1e]">
                            <img src={require('../assets/cars/1.png')} className="w-full" alt="" />
                            <h3 className="font-medium px-2 pt-2">Iskusite Revolucionarnu Tehnologiju</h3>
                            <p className="text-xs opacity-50 px-2 pb-2">Zakoračite u budućnost sa Tesla Modelom S, koji nudi vrhunsku tehnološku inovaciju koja će vas oduševiti. Sa njenim naprednim sistemima asistencije vozaču, autonomnim funkcijama i impresivnom brzinom, vaše putovanje će biti uzbudljivo iskustvo.</p>
                        </div>
                        <div className="car-details-card bg-[#1e1e1e]">
                            <img src={require('../assets/cars/3.png')} className="w-full" alt="" />
                            <h3 className="font-medium px-2 pt-2">Ekološka Održivost na Prvom Mestu</h3>
                            <p className="text-xs opacity-50 px-2 pb-2">Rentiranjem Tesla Modela S, ne samo da dobijate luksuzno iskustvo vožnje, već i doprinosite očuvanju životne sredine. Električni pogon ovog vozila omogućava vam da smanjite emisije gasova i budete deo održivije budućnosti.</p>
                        </div>
                        <div className="car-details-card bg-[#1e1e1e]">
                            <img src={require('../assets/cars/2.png')} className="w-full" alt="" />
                            <h3 className="font-medium px-2 pt-2">Beskompromisna Performansa</h3>
                            <p className="text-xs opacity-50 px-2 pb-2">Sa Tesla Modelom S, ne morate da birate između stila i performansi. Ovo vozilo pruža impresivnu brzinu i ubrzanje, uz istovremeno elegantan dizajn i udobnost. Bez obzira da li putujete na dugim relacijama ili gradskim ulicama, Tesla Model S će vas oduševiti svojom beskompromisnom performansom.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentCar