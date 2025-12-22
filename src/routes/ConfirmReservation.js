import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Upload, FileText, CreditCard, Building, Check, AlertCircle, Loader2 } from 'lucide-react';

function ConfirmReservation() {
    const [reservationId, setReservationId] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [advancePayment, setAdvancePayment] = useState('uzivo');
    const [imageFile, setImageFile] = useState(null);
    const [confirmingRes, setConfirmingRes] = useState(false);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [imageFile2, setImageFile2] = useState(null);

    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handleImageSelect2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage2(URL.createObjectURL(file));
            setImageFile2(file);
        }
    };

    const handleSubmit = async () => {
        setConfirmingRes(true);

        if (!reservationId || !imageFile) {
            toast.info(t('confirm.errorMissing'), { position: 'top-right', autoClose: 5000 });
            setConfirmingRes(false);
            return;
        }

        const formData = new FormData();
        formData.append('advancePayment', advancePayment);
        formData.append('advancePaymentImage', imageFile2);
        formData.append('reservation_image', imageFile);
        formData.append('id', reservationId);

        try {
            await axios.put(`https://tesla.movelink.org/reservations/update-reservation/${reservationId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setConfirmingRes(false);
            toast.success(t('confirm.success'), { position: 'top-right', autoClose: 5000 });
        } catch (error) {
            setConfirmingRes(false);
            toast.error(t('confirm.errorFailed'), { position: 'top-right', autoClose: 5000 });
        }
    };

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
                
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
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                
                .tesla-btn-primary {
                    background: #171a20;
                    color: #fff;
                    border: none;
                }
                
                .tesla-btn-primary:hover:not(:disabled) {
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
                
                .upload-zone {
                    border: 2px dashed #d0d0d0;
                    border-radius: 8px;
                    padding: 32px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    background: #fafafa;
                }
                
                .upload-zone:hover {
                    border-color: #171a20;
                    background: #f5f5f5;
                }
                
                .upload-zone.has-image {
                    border-style: solid;
                    border-color: #171a20;
                    padding: 16px;
                }
                
                .payment-option {
                    border: 1px solid #d0d0d0;
                    border-radius: 8px;
                    padding: 20px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                
                .payment-option:hover {
                    border-color: #9b9b9b;
                }
                
                .payment-option.selected {
                    border-color: #171a20;
                    background: #fafafa;
                }
                
                .payment-option .radio {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #d0d0d0;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                
                .payment-option.selected .radio {
                    border-color: #171a20;
                }
                
                .payment-option.selected .radio::after {
                    content: '';
                    width: 10px;
                    height: 10px;
                    background: #171a20;
                    border-radius: 50%;
                }
                
                .info-box {
                    background: #f8f9fa;
                    border-left: 4px solid #171a20;
                    padding: 16px 20px;
                    border-radius: 0 8px 8px 0;
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
                
                .step-number {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: #171a20;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 600;
                    flex-shrink: 0;
                }
            `}</style>

            {/* Loading Overlay */}
            {confirmingRes && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
                        <Loader2 size={40} className="animate-spin text-gray-900" />
                        <p className="text-gray-900 font-medium">{t('confirm.processing')}</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-4">
                        <ArrowLeft size={20} className="text-gray-600" />
                        <img src={require('../assets/teslalogo.png')} style={{ height: 24 }} alt="Tesla" />
                    </Link>
                    <select onChange={(e) => changeLanguage(e.target.value)} className="lang-select" value={i18n.language}>
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                        <option value="sr">Srpski</option>
                    </select>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-20 pb-16 px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Page Title */}
                    <div className="text-center mb-10 pt-8">
                        <h1 className="text-3xl font-medium text-gray-900 tracking-tight mb-2">
                            {t('confirm.title')}
                        </h1>
                        <p className="text-sm text-gray-500 max-w-md mx-auto">
                            {t('confirm.subtitle')}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-8">
                        {/* Step 1: Reservation ID */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="step-number">1</span>
                                <label className="text-sm font-medium text-gray-900">{t('confirm.reservationId')}</label>
                            </div>
                            <input
                                type="text"
                                className="tesla-input"
                                placeholder={t('confirm.reservationIdPlaceholder')}
                                value={reservationId}
                                onChange={(e) => setReservationId(e.target.value)}
                            />
                        </div>

                        {/* Step 2: Payment Slip Upload */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="step-number">2</span>
                                <label className="text-sm font-medium text-gray-900">{t('confirm.paymentSlip')}</label>
                            </div>
                            <div
                                className={`upload-zone ${selectedImage ? 'has-image' : ''}`}
                                onClick={() => document.getElementById('imageInput').click()}
                            >
                                {selectedImage ? (
                                    <div>
                                        <img src={selectedImage} alt="Payment Slip" className="max-h-48 mx-auto rounded" />
                                        <p className="text-xs text-gray-500 mt-3">{t('confirm.clickToChange')}</p>
                                    </div>
                                ) : (
                                    <>
                                        <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                                        <p className="text-sm text-gray-600 mb-1">{t('confirm.uploadText')}</p>
                                        <p className="text-xs text-gray-400">{t('confirm.uploadHint')}</p>
                                    </>
                                )}
                            </div>
                            <input id="imageInput" type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                        </div>

                        {/* Step 3: Payment Method */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="step-number">3</span>
                                <label className="text-sm font-medium text-gray-900">{t('confirm.paymentMethod')}</label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div
                                    className={`payment-option ${advancePayment === 'uzivo' ? 'selected' : ''}`}
                                    onClick={() => setAdvancePayment('uzivo')}
                                >
                                    <div className="radio"></div>
                                    <div className="flex items-center gap-3">
                                        <Building size={20} className="text-gray-600" />
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">{t('confirm.payInPerson')}</p>
                                            <p className="text-xs text-gray-500">{t('confirm.payInPersonDesc')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`payment-option ${advancePayment === 'uplatnica' ? 'selected' : ''}`}
                                    onClick={() => setAdvancePayment('uplatnica')}
                                >
                                    <div className="radio"></div>
                                    <div className="flex items-center gap-3">
                                        <CreditCard size={20} className="text-gray-600" />
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">{t('confirm.payBySlip')}</p>
                                            <p className="text-xs text-gray-500">{t('confirm.payBySlipDesc')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Deposit Slip Upload (conditional) */}
                        {advancePayment === 'uplatnica' && (
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="step-number">4</span>
                                    <label className="text-sm font-medium text-gray-900">{t('confirm.depositSlip')}</label>
                                </div>
                                <div
                                    className={`upload-zone ${selectedImage2 ? 'has-image' : ''}`}
                                    onClick={() => document.getElementById('imageInput2').click()}
                                >
                                    {selectedImage2 ? (
                                        <div>
                                            <img src={selectedImage2} alt="Deposit Slip" className="max-h-48 mx-auto rounded" />
                                            <p className="text-xs text-gray-500 mt-3">{t('confirm.clickToChange')}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                                            <p className="text-sm text-gray-600 mb-1">{t('confirm.uploadDeposit')}</p>
                                            <p className="text-xs text-gray-400">{t('confirm.uploadHint')}</p>
                                        </>
                                    )}
                                </div>
                                <input id="imageInput2" type="file" accept="image/*" className="hidden" onChange={handleImageSelect2} />
                            </div>
                        )}

                        {/* Payment Info Box */}
                        <div className="info-box">
                            <div className="flex items-start gap-3">
                                <FileText size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-900 text-sm mb-2">{t('confirm.requirements.title')}</p>
                                    <ul className="space-y-1.5 text-sm text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <Check size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                            {t('confirm.requirements.one')}
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                            {t('confirm.requirements.two')}
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                            {t('confirm.requirements.three')}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Terms Notice */}
                        <div className="flex items-start gap-3 text-xs text-gray-500">
                            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                            <p>{t('confirm.termsNotice')}</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="tesla-btn tesla-btn-primary"
                            disabled={!reservationId || !selectedImage || confirmingRes}
                            onClick={handleSubmit}
                        >
                            {confirmingRes ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    {t('confirm.processing')}
                                </>
                            ) : (
                                <>
                                    <Check size={18} />
                                    {t('confirm.confirmButton')}
                                </>
                            )}
                        </button>
                    </div>
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

export default ConfirmReservation;