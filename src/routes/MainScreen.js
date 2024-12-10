import React from "react";
import { MenuIcon, Search, CarIcon, ShoppingBag, UserRound, Sun, User, Car, Calendar } from "lucide-react";
import bgImage from '../assets/herowp.jpg';
import { Link } from "react-router-dom";

const MainScreen = () => {
    return (
        <div className="w-screen min-h-screen bg-white pb-6">
            <header>
                <div className="flex items-center justify-between" style={{ padding: 30 }}>
                    <Link to="/"><img src={require('../assets/teslalogo.png')} style={{ height: 40 }} alt="" /></Link>
                    <nav className="text-black flex gap-6">
                       
                        <Link to="/auth"><User /></Link>
                    </nav>
                </div>
                <div className="flex header-submenu items-center justify-center gap-6 text-black py-2 border-t border-[#f7f7f7]">
                    <Link className="opacity-50" to="/vozila" style={{ fontSize: 14 }}>Vehicles</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>My reservations</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>Blog</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>About Us</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>Contact</Link>
                </div>
            </header>
            <div className="hero-section flex items-center" style={{ height: 900 }}>
                <div className="">
                    <h1>TESLA RENT A CAR</h1>
                    <p>Uživajte u luksuzu i inovaciji električne vožnje.Otkrijte vrhunski doživljaj vožnje uz Tesla vozila – spoj tehnologije, udobnosti i ekološke odgovornosti. Iznajmite svoju Teslu sada i doživite vožnju bez kompromisa, sa savršenim performansama i modernim dizajnom.</p>
                    <button className="px-6 py-3 bg-[#59c23d] text-white rounded-md">Iznajmi svoju teslu sada</button>
                </div>
            </div>
            <div className="teslarent-cars max-w-screen-xl mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center px-6 border-b border-b-[#ddd]">
                    <div className="tesla-info text-black">
                        <h1 className="">Tesla Model 3</h1>
                        <p>Tesla Model 3 – Spoj performansi i efikasnosti.Brzina, inovacija i vrhunski dizajn u jednom vozilu. Uživajte u izuzetnoj vožnji s električnim pogonom, dugom autonomijom i naprednim tehnologijama koje čine svaki trenutak na putu nezaboravnim.</p>
                        <button className="px-6 py-3 bg-[#59c23d] text-white rounded-md">Iznajmi svoj model 3 sada</button>
                   </div>
                    <img src="https://cdn.shopify.com/s/files/1/0628/1281/5558/files/TeslaSiva.png?v=1714031520" alt="" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center px-6">
                    <img src="https://cdn.shopify.com/s/files/1/0628/1281/5558/files/TeslaBraon.png?v=1714031542" alt="" />
                    <div className="tesla-info text-black">
                        <h1 className="">Tesla Model S</h1>
                        <p>Tesla Model S – Elegancija i snaga u savršenom balansu.Uživajte u vrhunskim performansama, luksuznom dizajnu i najnovijoj tehnologiji. S dugim dometom, brzim punjenjem i inovativnim funkcijama, Model S redefiniše iskustvo vožnje, pružajući neprevaziđenu udobnost i sigurnost na svakom kilometru.</p>
                        <button className="px-6 py-3 bg-[#59c23d] text-white rounded-md">Iznajmi svoj model S sada</button>
                   </div>
                </div>               
            </div>
            <div className="max-w-screen-xl mx-auto mb-12 pb-8 grid grid-cols-1 md:grid-cols-3 p-12 rounded gap-12">
                <div className="flex flex-col items-center gap-6 text-black">
                    <Car size={60} />
                    <p className="text-center">Odaberite Tesla Model koji odgovara vašim potrebama.</p>
                </div>
                <div className="flex flex-col items-center gap-6 text-black">
                    <Calendar size={60} />
                    <p className="text-center">Proveri slobodne datume i bookiraj svoju Teslu</p>
                </div>
                <div className="flex flex-col items-center gap-6 text-black">
                    <Car size={60}/>
                    <p className="text-center">Uživajte u vožnji uz 24/7 podršku.</p>
                </div>
            </div>
            <div className="zasto-tesla bg-[#f7f7f7] max-w-screen-xl mx-auto pb-8 mb-8 rounded-xl gap-12 relative overflow-hidden">
                <img className="absolute opacity-25 bottom-2 right-2" src={require('../assets/icons/nikolatesla.png')} alt="" style={{ height: 400 }} />
                <h1>Zašto Tesla Rent a Car</h1>
                <p className="mb-8">Prilagodite svoje putovanje svom rasporedu i uživajte u potpunoj fleksibilnosti tokom vožnje, istovremeno doživljavajući jedinstveno iskustvo vožnje električnog automobila.</p>
                <button className="px-6 py-3 bg-black text-white rounded-md">Rezerviši teslu</button>
            </div>
        </div>
    );
};

export default MainScreen;
