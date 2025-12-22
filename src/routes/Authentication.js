// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';

// function Authentication() {
//     const [authType, setAuthType] = useState(0); // 0 = Login, 1 = Register
//     const [formData, setFormData] = useState({
//         full_name: '',
//         email: '',
//         phone: '',
//         password: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const { t } = useTranslation();

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const endpoint = authType === 0 ? 'https://tesla.movelink.org/users/login' : 'https://tesla.movelink.org/users/register';

//         try {
//             const response = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 if (authType === 0) {
//                     Cookies.set('authToken', result.token, { expires: 7 });
//                     Cookies.set('userId', result.userId, { expires: 7 });
//                     navigate('/client')
//                 } else {
//                     alert('Registered successfully');
//                 }
//             } else {
//                 alert(`Error: ${result.error}`);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Something went wrong. Please try again.');
//         }
//     };

//     useEffect(() => {
//         const haveToken = Cookies.get('authToken');
//         if (haveToken) {
//             navigate('/client');
//         }
//     }, [navigate])

//     return (
//         <div className="w-screen h-screen flex items-center justify-center">
//             <form
//                 onSubmit={handleSubmit}
//                 className="form-input w-full max-w-md p-6 mx-4 rounded-lg bg-[#f7f7f7] shadow-lg shadow-[#DDD] border border-[#ddd]"
//             >
//                 {/* Header */}
//                 <h1 className="text-2xl font-semibold text-center text-white mb-8">
//                     <img
//                         className="mx-auto mb-6"
//                         src={require('../assets/teslalogo.png')}
//                         style={{ height: 40 }}
//                         alt=""
//                     />
//                     <p className="text-sm font-light opacity-50">
//                         {authType === 1 ? 'Register' : 'Login'} to Tesla Rent a Car
//                     </p>
//                 </h1>

//                 {/* Form Fields */}
//                 {authType === 1 && (
//                     <input
//                         type="text"
//                         name="fullName"
//                         value={formData.full_name}
//                         onChange={handleInputChange}
//                         placeholder={t('authForm.enterFullName')}
//                         className="w-full p-4 mb-4 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
//                     />
//                 )}
//                 <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder={t('authForm.enterEmail')}
//                     className="w-full p-4 mb-4 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
//                 />
//                 {authType === 1 && (
//                     <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         placeholder={t('authForm.enterPhone')}
//                         className="w-full p-4 mb-4 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
//                     />
//                 )}
//                 <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     placeholder={t('authForm.enterPassword')}
//                     className="w-full p-4 mb-6 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
//                 />

//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     className="block w-full py-4 text-center text-white font-light text-sm rounded-lg bg-[#59c23d] shadow-md hover:bg-[#34A745] transition"
//                 >
//                     {authType === 1 ? t('authForm.signUp') : t('authForm.signIn')}
//                 </button>

//                 {/* Toggle Auth Type */}
//                 <div className="text-center pt-6">
//                     <p className="text-sm text-gray-400">
//                         {authType === 1 ? t('authForm.alreadyHaveAccount') : t('authForm.dontHaveAccount')}{' '}
//                         <button
//                             type="button"
//                             onClick={() => setAuthType(authType === 0 ? 1 : 0)}
//                             className="text-[#59c23d] underline hover:text-green-400 transition"
//                         >
//                             {authType !== 1 ? t('authForm.signUp') : t('authForm.signIn')}
//                         </button>
//                     </p>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default Authentication;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

function Authentication() {
    const [authType, setAuthType] = useState(0); // 0 = Login, 1 = Register
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const endpoint = authType === 0 ? 'https://tesla.movelink.org/users/login' : 'https://tesla.movelink.org/users/register';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                if (authType === 0) {
                    Cookies.set('authToken', result.token, { expires: 7 });
                    Cookies.set('userId', result.userId, { expires: 7 });
                    navigate('/client');
                } else {
                    setAuthType(0);
                }
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const haveToken = Cookies.get('authToken');
        if (haveToken) {
            navigate('/client');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'Gotham', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
                
                * {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                .tesla-input {
                    width: 100%;
                    padding: 16px;
                    font-size: 14px;
                    border: 1px solid #d0d0d0;
                    border-radius: 4px;
                    background: #fff;
                    transition: border-color 0.2s ease;
                    outline: none;
                }
                
                .tesla-input:focus {
                    border-color: #171a20;
                }
                
                .tesla-input::placeholder {
                    color: #9b9b9b;
                }
                
                .tesla-btn {
                    width: 100%;
                    padding: 14px 24px;
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                .tesla-btn-primary {
                    background: #171a20;
                    color: #fff;
                    border: none;
                }
                
                .tesla-btn-primary:hover {
                    background: #000;
                }
                
                .tesla-btn-primary:disabled {
                    background: #d0d0d0;
                    cursor: not-allowed;
                }
                
                .tesla-btn-secondary {
                    background: #f4f4f4;
                    color: #171a20;
                    border: none;
                }
                
                .tesla-btn-secondary:hover {
                    background: #e8e8e8;
                }
                
                .tesla-link {
                    color: #3e6ae1;
                    text-decoration: none;
                    font-size: 14px;
                    transition: color 0.2s ease;
                }
                
                .tesla-link:hover {
                    color: #2d4fa8;
                    text-decoration: underline;
                }
                
                .password-toggle {
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #9b9b9b;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .password-toggle:hover {
                    color: #171a20;
                }
                
                .divider {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    color: #9b9b9b;
                    font-size: 12px;
                    margin: 24px 0;
                }
                
                .divider::before,
                .divider::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid #e0e0e0;
                }
                
                .divider::before {
                    margin-right: 16px;
                }
                
                .divider::after {
                    margin-left: 16px;
                }
                
                .lang-select {
                    appearance: none;
                    background: transparent;
                    border: none;
                    font-size: 12px;
                    color: #5c5e62;
                    cursor: pointer;
                    padding: 4px 16px 4px 0;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%235c5e62' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right center;
                }
            `}</style>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-4">
                        <ArrowLeft size={20} className="text-gray-600" />
                        <img src={require('../assets/teslalogo.png')} style={{ height: 24 }} alt="Tesla" />
                    </Link>
                    <select
                        onChange={(e) => changeLanguage(e.target.value)}
                        className="lang-select"
                        value={i18n.language}
                    >
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                        <option value="sr">Srpski</option>
                    </select>
                </div>
            </header>

            {/* Main Content */}
            <main className="min-h-screen flex items-center justify-center pt-16 pb-12 px-6">
                <div className="w-full max-w-sm">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-medium text-gray-900 tracking-tight mb-2">
                            {authType === 0 ? t('auth.signIn') : t('auth.createAccount')}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {authType === 0 ? t('auth.signInSubtitle') : t('auth.createAccountSubtitle')}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name (Register only) */}
                        {authType === 1 && (
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wider">
                                    {t('auth.fullName')}
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    placeholder={t('auth.fullNamePlaceholder')}
                                    className="tesla-input"
                                    required
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wider">
                                {t('auth.email')}
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder={t('auth.emailPlaceholder')}
                                className="tesla-input"
                                required
                            />
                        </div>

                        {/* Phone (Register only) */}
                        {authType === 1 && (
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wider">
                                    {t('auth.phone')}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder={t('auth.phonePlaceholder')}
                                    className="tesla-input"
                                    required
                                />
                            </div>
                        )}

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wider">
                                {t('auth.password')}
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder={t('auth.passwordPlaceholder')}
                                    className="tesla-input pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="password-toggle"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password (Login only) */}
                        {authType === 0 && (
                            <div className="text-right">
                                <button type="button" className="tesla-link text-sm">
                                    {t('auth.forgotPassword')}
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="tesla-btn tesla-btn-primary mt-6"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    {t('auth.loading')}
                                </span>
                            ) : (
                                authType === 0 ? t('auth.signInButton') : t('auth.createAccountButton')
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider">
                        {t('auth.or')}
                    </div>

                    {/* Toggle Auth Type */}
                    <button
                        type="button"
                        onClick={() => setAuthType(authType === 0 ? 1 : 0)}
                        className="tesla-btn tesla-btn-secondary"
                    >
                        {authType === 0 ? t('auth.createAccountButton') : t('auth.signInButton')}
                    </button>

                    {/* Terms */}
                    <p className="text-center text-xs text-gray-500 mt-8 leading-relaxed">
                        {t('auth.terms')}{' '}
                        <Link to="/general-terms" className="tesla-link">
                            {t('auth.termsLink')}
                        </Link>{' '}
                        {t('auth.and')}{' '}
                        <Link to="/protection-of-transaction" className="tesla-link">
                            {t('auth.privacyLink')}
                        </Link>
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
                        <span>© 2025 Tesla Rent</span>
                        <Link to="/general-terms" className="hover:text-gray-700">{t('auth.footerTerms')}</Link>
                        <Link to="/protection-of-transaction" className="hover:text-gray-700">{t('auth.footerPrivacy')}</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Authentication;