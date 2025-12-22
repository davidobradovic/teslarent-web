import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function NotFound() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            `}</style>

            {/* Header */}
            <header className="border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <Link to="/">
                        <img src={require('../assets/teslalogo.png')} style={{ height: 24 }} alt="Tesla Rent" />
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    {/* 404 Number */}
                    <div className="mb-8">
                        <span className="text-[150px] font-bold text-gray-100 leading-none select-none">404</span>
                    </div>

                    {/* Message */}
                    <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                        {t('notFound.title')}
                    </h1>
                    <p className="text-gray-500 mb-8">
                        {t('notFound.description')}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                        >
                            <ArrowLeft size={18} />
                            {t('notFound.goBack')}
                        </button>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-lg transition-colors"
                        >
                            <Home size={18} />
                            {t('notFound.goHome')}
                        </Link>
                    </div>

                    {/* Help Link */}
                    <p className="mt-8 text-sm text-gray-400">
                        {t('notFound.needHelp')}{' '}
                        <Link to="/vehicles" className="text-gray-600 hover:text-gray-900 underline">
                            {t('notFound.browseVehicles')}
                        </Link>
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-4 text-center">
                    <p className="text-xs text-gray-400">© 2025 Tesla Rent A Car</p>
                </div>
            </footer>
        </div>
    );
}

export default NotFound;