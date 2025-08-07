import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

function Authentication() {
    const [authType, setAuthType] = useState(0); // 0 = Login, 1 = Register
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

    const { t } = useTranslation();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = authType === 0 ? 'https://api.davidtesla.online/users/login' : 'https://api.davidtesla.online/users/register';

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
                    navigate('/client')
                } else {
                    alert('Registered successfully');
                }
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    useEffect(() => {
        const haveToken = Cookies.get('authToken');
        if (haveToken) {
            navigate('/client');
        }
    }, [navigate])

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="form-input w-full max-w-md p-6 mx-4 rounded-lg bg-[#f7f7f7] shadow-lg shadow-[#DDD] border border-[#ddd]"
            >
                {/* Header */}
                <h1 className="text-2xl font-semibold text-center text-white mb-8">
                    <img
                        className="mx-auto mb-6"
                        src={require('../assets/teslalogo.png')}
                        style={{ height: 40 }}
                        alt=""
                    />
                    <p className="text-sm font-light opacity-50">
                        {authType === 1 ? 'Register' : 'Login'} to Tesla Rent a Car
                    </p>
                </h1>

                {/* Form Fields */}
                {authType === 1 && (
                    <input
                        type="text"
                        name="fullName"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder={t('authForm.enterFullName')}
                        className="w-full p-4 mb-4 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
                    />
                )}
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('authForm.enterEmail')}
                    className="w-full p-4 mb-4 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
                />
                {authType === 1 && (
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('authForm.enterPhone')}
                        className="w-full p-4 mb-4 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
                    />
                )}
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t('authForm.enterPassword')}
                    className="w-full p-4 mb-6 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="block w-full py-4 text-center text-white font-light text-sm rounded-lg bg-[#59c23d] shadow-md hover:bg-[#34A745] transition"
                >
                    {authType === 1 ? t('authForm.signUp') : t('authForm.signIn')}
                </button>

                {/* Toggle Auth Type */}
                <div className="text-center pt-6">
                    <p className="text-sm text-gray-400">
                        {authType === 1 ? t('authForm.alreadyHaveAccount') : t('authForm.dontHaveAccount')}{' '}
                        <button
                            type="button"
                            onClick={() => setAuthType(authType === 0 ? 1 : 0)}
                            className="text-[#59c23d] underline hover:text-green-400 transition"
                        >
                            {authType !== 1 ? t('authForm.signUp') : t('authForm.signIn')}
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Authentication;
