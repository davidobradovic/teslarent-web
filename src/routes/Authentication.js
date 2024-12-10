import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Authentication() {
    const [authType, setAuthType] = useState(0); // 0 = Login, 1 = Register

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="form-input w-full max-w-md p-6 mx-4 rounded-lg bg-[#f7f7f7] shadow-lg shadow-[#DDD] border border-[#ddd]">
                {/* Header */}
                <h1 className="text-2xl font-semibold text-center text-white mb-8">
                    <img className='mx-auto mb-6' src={require('../assets/teslalogo.png')} style={{ height: 40 }} alt="" />
                    <p className='text-sm font-light opacity-50'>{authType === 1 ? "Register" : "Login"} to Tesla Rent a Car</p>
                </h1>

                {/* Form Fields */}
                {authType === 0 ? (
                    <>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full p-4 mb-4 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
                        />
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full p-4 mb-6 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
                        />
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            className="w-full p-4 mb-4 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
                        />
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full p-4 mb-4 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
                        />
                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            className="w-full p-4 mb-4 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
                        />
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full p-4 mb-6 rounded-lg font-light text-sm bg-[#f5] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#59c23d]"
                        />
                    </>
                )}

                {/* Submit Button */}
                <Link
                    to="/client"
                    className="block w-full py-4 text-center text-white font-light text-sm rounded-lg bg-[#59c23d] shadow-md hover:bg-[#34A745] transition"
                >
                    Sign {authType === 1 ? "up" : "in"}
                </Link>

                {/* Toggle Auth Type */}
                <div className="text-center pt-6">
                    <p className="text-sm text-gray-400">
                        {authType === 1 ? "Already have an account?" : "Don't have an account?"}{' '}
                        <button
                            onClick={() => setAuthType(authType === 0 ? 1 : 0)}
                            className="text-[#59c23d] underline hover:text-green-400 transition"
                        >
                            {authType !== 1 ? "Sign up now" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Authentication;
