import { UserRound, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ClientLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="w-screen h-screen flex flex-col md:flex-row">
            <div
                className={`sidebar fixed inset-y-0 left-0 bg-[#F7F7F7] text-black flex flex-col p-6 w-full sm:w-[300px] md:relative transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                <button
                    className="absolute top-8 right-8 md:hidden text-black"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <X size={24} />
                </button>

                <div className="flex justify-start mb-12">
                    <img src={require('../assets/teslalogo.png')} alt="Tesla Logo" style={{ height: 40 }} />
                </div>

                <nav className="flex flex-col gap-3">
                    <Link to="/client" onClick={() => {
                        setIsSidebarOpen(false)
                    }} className="flex items-center gap-3 p-3 rounded bg-[#F7F7F7] hover:bg-[#ddd] transition">
                        <span className="text-sm">Dashboard</span>
                    </Link>
                    <Link to="/client/my-reservations" onClick={() => {
                        setIsSidebarOpen(false)
                    }} className="flex items-center gap-3 p-3 rounded bg-[#F7F7F7] hover:bg-[#ddd] transition">
                        <span className="text-sm">My reservations</span>
                    </Link>
                    <Link to="/client/current-reservation" onClick={() => {
                        setIsSidebarOpen(false)
                    }} className="flex items-center gap-3 p-3 rounded bg-[#F7F7F7] hover:bg-[#ddd] transition">
                        <span className="text-sm">Current vehicle</span>
                    </Link>
                </nav>

                <div className="mt-auto flex flex-col gap-3">
                    <Link to="/client/settings" onClick={() => {
                        setIsSidebarOpen(false)
                    }} className="flex items-center gap-3 p-3 rounded bg-[#F7F7F7] hover:bg-[#ddd] transition">
                        <span className="text-sm">Settings</span>
                    </Link>
                    <Link className="flex items-center gap-3 p-3 rounded bg-[#F7F7F7] hover:bg-[#ddd] border transition">
                        <span className="text-sm">Sign out</span>
                    </Link>
                </div>
            </div>

            <main className="flex-1 flex flex-col overflow-y-auto bg-white text-black">
                <header className="flex items-center gap-4 md:hidden p-6 border-b border-b-[#F7F7F7]">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-black">
                        <Menu size={24} />
                    </button>
                    <h3>Dobrodošli, David</h3>
                </header>

                <div className="p-4">{children}</div>
            </main>
        </div>
    );
}

export default ClientLayout;
