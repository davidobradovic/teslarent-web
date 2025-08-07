import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function ConfirmReservation() {
    const [reservationId, setReservationId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [advancePayment, setAdvancePayment] = useState("uzivo");
    const [imageFile, setImageFile] = useState(null);

    const [confirmingRes, setConfirmingRes] = useState(null);

    const [selectedImage2, setSelectedImage2] = useState(null);
    const [imageFile2, setImageFile2] = useState(null);

    const { t } = useTranslation();

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const openFileSelector = () => {
        document.getElementById('imageInput').click();
    };

    const handleImageSelect2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage2(URL.createObjectURL(file));
            setImageFile2(file);
        }
    };

    const openFileSelector2 = () => {
        document.getElementById('imageInput2').click();
    };

    const handleSubmit = async () => {

        setConfirmingRes(true)

        if (!reservationId || !imageFile) {
            toast.info('Missing required confirmation data!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            return;
        }

        const formData = new FormData();
        formData.append('advancePayment', advancePayment);
        formData.append('advancePaymentImage', imageFile2);
        formData.append('reservation_image', imageFile);
        formData.append('id', reservationId);

        try {
            await axios.put(`https://api.davidtesla.online/reservations/update-reservation/${reservationId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setConfirmingRes(null)

            toast.success('Reservation confirmed succesfuly!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        } catch (error) {
            toast.error('Failed updating reservation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
    };

    return (
        <div className='bg-gray-100 p-4 w-screen min-h-screen flex items-center justify-center'>
            {
                confirmingRes && (
                    <div className='w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center fixed top-0 left-0' style={{ backdropFilter: 'blur(10px)' }}>
                        <h1 className='text-2xl text-white font-semibold'>Processing</h1>
                    </div>
                )
            }
            <div className='bg-white p-4 rounded w-full max-w-screen-lg overflow-auto'>
                <h1 className='text-2xl font-bold'>{t('confirmReservation.title')}</h1>
                <p className='opacity-50'>{t('confirmReservation.subtitle')}</p>

                <div className='my-6'>
                    <label className='text-xs uppercase font-bold'>{t('confirmReservation.reservationId')}</label>
                    <input
                        type="number"
                        className='w-full bg-gray-100 p-3 rounded outline-none'
                        placeholder={t('confirmReservation.placeholderReservationId')}
                        value={reservationId}
                        onChange={(e) => setReservationId(e.target.value)}
                    />
                </div>

                <div className='my-6'>
                    <label className='text-xs uppercase font-bold'>{t('confirmReservation.paymentSlip')}</label>
                    <div className=''>
                        <button
                            className='bg-[#59c23d] text-white p-3 rounded w-full'
                            onClick={openFileSelector}
                        >
                            {t('confirmReservation.selectImage')}
                        </button>
                        <input
                            id='imageInput'
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={handleImageSelect}
                        />
                    </div>

                    {selectedImage && (
                        <div className='mt-4'>
                            <p className='text-xs'>Selected Image:</p>
                            <img
                                src={selectedImage}
                                alt='Selected Payment Slip'
                                className='mt-2 w-full h-auto'
                            />
                        </div>
                    )}
                </div>

                {
                    advancePayment === 'uplatnica' && (
                        <div className='my-6'>
                            <label className='text-xs uppercase font-bold'>{t("advancePayment.title")}</label>
                            <div className=''>
                                <button
                                    className='bg-[#59c23d] text-white p-3 rounded w-full'
                                    onClick={openFileSelector2}
                                >
                                    {t('confirmReservation.selectImage')}
                                </button>
                                <input
                                    id='imageInput2'
                                    type='file'
                                    accept='image/*'
                                    className='hidden'
                                    onChange={handleImageSelect2}
                                />
                            </div>

                            {selectedImage2 && (
                                <div className='mt-4'>
                                    <p className='text-xs'>Selected Image:</p>
                                    <img
                                        src={selectedImage2}
                                        alt='Selected Payment Slip'
                                        className='mt-2 w-full h-auto'
                                    />
                                </div>
                            )}
                        </div>
                    )
                }

                <div className="">
                    <h3 className='font-semibold'>{t('confirmReservation.paymentSlipRequirements.title')}</h3>
                    <div>
                        <li className='list-decimal text-sm'>{t('confirmReservation.paymentSlipRequirements.one')}</li>
                        <li className='list-decimal text-sm'>{t('confirmReservation.paymentSlipRequirements.two')}</li>
                        <li className='list-decimal text-sm'>{t('confirmReservation.paymentSlipRequirements.three')}</li>
                    </div>
                    <p className='text-xs text-gray-500 mt-3'>
                        {t('confirmReservation.confirmingRes')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-3">
                    <button className={`flex items-center p-3 rounded border gap-3 text-sm ${advancePayment === 'uplatnica' ? 'border-[#59c23d]' : null}`} onClick={() => setAdvancePayment('uplatnica')}>
                        <div className={`p-3 rounded-full ${advancePayment === 'uplatnica' ? 'bg-[#59c23d]' : 'bg-gray-100'}`}>

                        </div>
                        {t('advancePayment.buttonOne')}
                    </button>
                    <button className={`flex items-center p-3 rounded border gap-3 text-sm ${advancePayment === 'uzivo' ? 'border-[#59c23d]' : null}`} onClick={() => setAdvancePayment('uzivo')}>
                        <div className={`p-3 rounded-full ${advancePayment === 'uzivo' ? 'bg-[#59c23d]' : 'bg-gray-100'}`}>

                        </div>
                        {t('advancePayment.buttonTwo')}
                    </button>
                </div>

                <div className='mt-6'>
                    <button
                        className='w-full bg-[#59c23d] text-white px-4 py-3 rounded hover:bg-[#4b9936] cursor-pointer'
                        disabled={!reservationId || !selectedImage}
                        onClick={handleSubmit}
                    >
                        {t('confirmReservation.confirm')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmReservation;
