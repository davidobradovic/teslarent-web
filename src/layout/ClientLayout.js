// import {  Menu, X } from 'lucide-react';
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { useAppContext } from '../context/ApplicationContext';

// function ClientLayout({ children }) {

//     const { user } = useAppContext();

//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     const signOut = async () => {
//         Cookies.remove('authToken');
//         Cookies.remove('userId');
//         window.location.href = '/auth';
//     }

//     return (
//         <div className="w-screen h-screen flex flex-col md:flex-row">
//             <div
//                 className={`sidebar fixed inset-y-0 left-0 bg-[#F7F7F7] text-black flex flex-col p-6 w-full sm:w-[300px] md:relative transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//                     } md:translate-x-0`}
//             >
//                 <button
//                     className="absolute top-8 right-8 md:hidden text-black"
//                     onClick={() => setIsSidebarOpen(false)}
//                 >
//                     <X size={24} />
//                 </button>

//                 <div className="flex justify-start mb-12">
//                     <img src={require('../assets/teslalogo.png')} alt="Tesla Logo" style={{ height: 40 }} />
//                 </div>

//                 {
//                     user?.role === 'administrator' ? (
//                         <nav className="flex flex-col gap-3">
//                             <Link to="/client/all-reservations" onClick={() => {
//                                 setIsSidebarOpen(false)
//                             }} className="flex items-center gap-3 p-3 rounded bg-[#F7F7F7] hover:bg-[#ddd] transition">
//                                 <span className="text-sm">All reservations</span>
//                             </Link>
//                             <Link to="/client/all-vehicles" onClick={() => {
//                                 setIsSidebarOpen(false)
//                             }} className="flex items-center gap-3 p-3 rounded bg-[#F7F7F7] hover:bg-[#ddd] transition">
//                                 <span className="text-sm">All vehicles</span>
//                             </Link>
//                             <Link to="/client/users" onClick={() => {
//                                 setIsSidebarOpen(false)
//                             }} className="flex items-center gap-3 p-3 rounded bg-[#F7F7F7] hover:bg-[#ddd] transition">
//                                 <span className="text-sm">Users</span>
//                             </Link>
//                         </nav>
//                     ) : (
//                         <nav className="flex flex-col gap-3">
//                             <Link to="/client" onClick={() => {
//                                 setIsSidebarOpen(false)
//                             }} className="flex items-center gap-3 p-3 rounded bg-[#F7F7F7] hover:bg-[#ddd] transition">
//                                 <span className="text-sm">My reservations</span>
//                             </Link>
//                         </nav>
//                     )
//                 }



//                 <div className="mt-auto flex flex-col gap-3">
//                     <Link to="/client/settings" onClick={() => {
//                         setIsSidebarOpen(false)
//                     }} className="flex items-center gap-3 p-3 rounded bg-[#F7F7F7] hover:bg-[#ddd] transition">
//                         <span className="text-sm">Settings</span>
//                     </Link>
//                     <button onClick={signOut} className="flex items-center gap-3 p-3 rounded bg-[#F7F7F7] hover:bg-[#ddd] border transition">
//                         <span className="text-sm">Sign out</span>
//                     </button>
//                 </div>
//             </div>

//             <main className="flex-1 flex flex-col overflow-y-auto bg-white text-black">
//                 <header className="flex items-center gap-4 md:hidden p-6 border-b border-b-[#F7F7F7]">
//                     <button onClick={() => setIsSidebarOpen(true)} className="text-black">
//                         <Menu size={24} />
//                     </button>
//                     <h3 className='font-bold'>Welcome back</h3>
//                 </header>

//                 <div className="p-4">{children}</div>
//             </main>
//         </div>
//     );
// }

// export default ClientLayout;


import { Menu, X, Home, Car, Users, Settings, LogOut, Calendar, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppContext } from '../context/ApplicationContext';
import { useTranslation } from 'react-i18next';

function ClientLayout({ children }) {
    const { user } = useAppContext();
    const { t, i18n } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const changeLanguage = (lang) => { i18n.changeLanguage(lang); };

    const signOut = async () => {
        Cookies.remove('authToken');
        Cookies.remove('userId');
        window.location.href = '/auth';
    };

    const isActive = (path) => location.pathname === path;

    const adminLinks = [
        { path: '/client/all-reservations', icon: Calendar, label: t('dashboard.allReservations') },
        { path: '/client/all-vehicles', icon: Car, label: t('dashboard.allVehicles') },
        { path: '/client/users', icon: Users, label: t('dashboard.users') },
    ];

    const userLinks = [
        { path: '/client', icon: Calendar, label: t('dashboard.myReservations') },
    ];

    const navLinks = user?.role === 'administrator' ? adminLinks : userLinks;

    return (
        <div className="w-screen h-screen flex bg-gray-50" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                .sidebar-link { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; font-size: 14px; font-weight: 500; color: #5c5e62; transition: all 0.2s ease; }
                .sidebar-link:hover { background: #f4f4f4; color: #171a20; }
                .sidebar-link.active { background: #171a20; color: #fff; }
                .sidebar-link.active:hover { background: #000; }
                .lang-select { appearance: none; background: transparent; border: 1px solid #e5e7eb; border-radius: 6px; padding: 6px 24px 6px 10px; font-size: 12px; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%235c5e62' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; }
            `}</style>

            {/* Sidebar Overlay (Mobile) */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:relative inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <img src={require('../assets/teslalogo.png')} alt="Tesla Rent" style={{ height: 28 }} />
                        </Link>
                        <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg" onClick={() => setIsSidebarOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* User Info */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                                {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.full_name || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-4 mb-3">
                        {t('dashboard.navigation')}
                    </p>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
                        >
                            <link.icon size={18} />
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-gray-100 space-y-1">
                    <Link to="/client/settings" onClick={() => setIsSidebarOpen(false)} className={`sidebar-link ${isActive('/client/settings') ? 'active' : ''}`}>
                        <Settings size={18} />
                        {t('dashboard.settings')}
                    </Link>
                    <button onClick={signOut} className="sidebar-link w-full text-left text-red-600 hover:bg-red-50 hover:text-red-700">
                        <LogOut size={18} />
                        {t('dashboard.signOut')}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">{t('dashboard.welcome')}</h1>
                            <p className="text-sm text-gray-500">{t('dashboard.welcomeSubtitle')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <select onChange={(e) => changeLanguage(e.target.value)} className="lang-select" value={i18n.language}>
                            <option value="en">EN</option>
                            <option value="de">DE</option>
                            <option value="sr">SR</option>
                        </select>
                        <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                            {t('dashboard.backToSite')} <ChevronRight size={14} />
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default ClientLayout;