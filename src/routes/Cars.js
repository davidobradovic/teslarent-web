// import React, { useEffect, useState } from "react";
// import { User, Users, Snowflake, Check, Info, ChevronRight, ChevronDown, ShoppingBasket, Battery, Zap, Shield, Calendar, MapPin, Clock } from "lucide-react";
// import { Link } from "react-router-dom";
// import DateTimePicker from "../components/DateTimePicker";
// import { useAppContext } from "../context/ApplicationContext";
// import Cookies from 'js-cookie';
// import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";

// function Cars() {
//     const [isModalOpen, setModalOpen] = useState(false);
//     const [isModalOpenReturn, setModalOpenReturn] = useState(false);
//     const [pickupDate, setPickupDate] = useState("");
//     const [returnDate, setReturnDate] = useState("");
//     const [duration, setDuration] = useState(null);
//     const [selectedCar, setSelectedCar] = useState(null);
//     const [error, setError] = useState({ status: false, message: "" });

//     const { t, i18n } = useTranslation();
//     const changeLanguage = (lang) => { i18n.changeLanguage(lang); };
//     const { vehicles, reservations } = useAppContext();
//     const [reservationStep, setReservationStep] = useState(0);

//     const parseDateString = (dateString) => {
//         if (!dateString) return null;
//         const [datePart] = dateString.split(" at ");
//         if (!datePart) return null;
//         const [day, month, year] = datePart.split(".");
//         if (!day || !month || !year) return null;
//         const date = new Date(year, month - 1, day, 8, 0);
//         return date;
//     };

//     const calculateDuration = (pickup, returnDate) => {
//         const pickupDateObj = parseDateString(pickup);
//         const returnDateObj = parseDateString(returnDate);
//         if (!pickupDateObj || !returnDateObj) { setDuration(null); return; }
//         const timeDiff = returnDateObj - pickupDateObj;
//         if (timeDiff < 0) { setDuration("Invalid duration"); return; }
//         const dayInMillis = 1000 * 60 * 60 * 24;
//         const durationInDays = Math.ceil(timeDiff / dayInMillis);
//         setDuration(durationInDays);
//     };

//     const convertDate = (dateString) => {
//         const [day, month, yearTime] = dateString.split('.');
//         const [year, time] = yearTime.split(' at ');
//         return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${time}:00`;
//     };

//     const formattedPickupDate = pickupDate ? convertDate(pickupDate) : null;

//     const finishReservation = () => {
//         if (Cookies.get('authToken')) {
//             if (duration <= 1 && selectedCar === null) {
//                 setError({ status: true, message: t('errors.invalidReservation') });
//             } else {
//                 setReservationStep(1);
//                 setError({ status: false, message: "" });
//             }
//         } else {
//             setError({ status: true, message: t('errors.notAllowed') });
//         }
//     };

//     useEffect(() => {
//         if (pickupDate && returnDate) { calculateDuration(pickupDate, returnDate); }
//     }, [pickupDate, returnDate]);

//     const createReservation = async () => {
//         try {
//             const userId = Cookies.get('userId');
//             if (!userId || !selectedCar || !pickupDate || !returnDate || !duration) {
//                 toast.error(t('errors.missingData'), { position: "top-right", autoClose: 5000 });
//                 return;
//             }
//             const formattedPickupDate = convertDate(pickupDate);
//             const formattedReturnDate = convertDate(returnDate);
//             const vehicle = vehicles.find((veh) => veh.id === selectedCar);
//             if (!vehicle) {
//                 toast.error(t('errors.carNotFound'), { position: "top-right", autoClose: 5000 });
//                 return;
//             }
//             const price = vehicle.price_per_day * duration;
//             const response = await fetch('https://tesla.movelink.org/reservations/create-reservation', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ vehicle_id: selectedCar, start_time: formattedPickupDate, end_time: formattedReturnDate, user_id: userId, duration, price }),
//             });
//             if (!response.ok) {
//                 toast.error(t('errors.reservationFailed'), { position: "top-right", autoClose: 5000 });
//                 return;
//             }
//             toast.success(t('success.reservationCreated'), { position: "top-right", autoClose: 5000 });
//         } catch (error) {
//             console.error('An error occurred:', error);
//         }
//     };

//     const isCarBusy = (vehicleId) => {
//         if (!pickupDate || !returnDate) return false;
//         const fPickup = convertDate(pickupDate);
//         const fReturn = convertDate(returnDate);
//         return reservations.some(res =>
//             res.vehicle_id === vehicleId &&
//             ((fPickup >= res.start_time && fPickup < res.end_time) ||
//                 (fReturn > res.start_time && fReturn <= res.end_time) ||
//                 (fPickup <= res.start_time && fReturn >= res.end_time))
//         );
//     };

//     return (
//         <div className="w-screen min-h-screen bg-gray-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//             <style>{`
//                 @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
//                 * { font-family: 'Plus Jakarta Sans', sans-serif; }
//                 .btn-primary { background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%); transition: all 0.3s ease; }
//                 .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3); }
//                 .btn-green { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); transition: all 0.3s ease; }
//                 .btn-green:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3); }
//                 .card-hover { transition: all 0.3s ease; }
//                 .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); }
//                 .glass-card { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); }
//                 .lang-select { appearance: none; background: transparent; border: 1px solid #e5e7eb; border-radius: 6px; padding: 6px 24px 6px 10px; font-size: 14px; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; }
//                 .date-input { transition: all 0.2s ease; }
//                 .date-input:hover { border-color: #0066FF; }
//                 .vehicle-card { transition: all 0.3s ease; border: 2px solid transparent; }
//                 .vehicle-card:hover { border-color: #e5e7eb; }
//                 .vehicle-card.selected { border-color: #0066FF; background: linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%); }
//                 .vehicle-card.unavailable { opacity: 0.5; }
//                 .tag { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: #f3f4f6; border-radius: 9999px; font-size: 12px; font-weight: 500; color: #374151; }
//             `}</style>

//             {/* Header */}
//             <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
//                 <div className="max-w-7xl mx-auto px-6 py-4">
//                     <div className="flex items-center justify-between">
//                         <Link to="/" className="flex items-center gap-2">
//                             <img src={require('../assets/teslalogo.png')} style={{ height: 32 }} alt="Tesla Rent" />
//                         </Link>
//                         <nav className="hidden md:flex items-center gap-8">
//                             <Link to="/vehicles" className="text-blue-600 text-sm font-semibold transition-colors">{t('header.vehicles')}</Link>
//                             <Link to="/general-terms" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">{t('footer.linkFour')}</Link>
//                             <a href="/#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">{t('header.howItWorks')}</a>
//                             <a href="/#faq" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">{t('header.faq')}</a>
//                         </nav>
//                         <div className="flex items-center gap-4">
//                             <select onChange={(e) => changeLanguage(e.target.value)} className="lang-select text-gray-600" value={i18n.language}>
//                                 <option value="en">EN</option>
//                                 <option value="de">DE</option>
//                                 <option value="sr">SR</option>
//                             </select>
//                             <Link to="/auth" className="p-2 text-gray-600 hover:text-gray-900 transition-colors"><User size={20} /></Link>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             <main className="pt-24 pb-16">
//                 {/* Page Header */}
//                 <div className="bg-gradient-to-b from-white to-gray-50 py-12">
//                     <div className="max-w-7xl mx-auto px-6">
//                         <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{t('vehicles.pageTitle')}</h1>
//                         <p className="text-gray-600">{t('vehicles.pageSubtitle')}</p>
//                     </div>
//                 </div>

//                 {/* Error Message */}
//                 {error.status && (
//                     <div className="max-w-7xl mx-auto px-6 mt-4">
//                         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
//                             <Info size={18} />
//                             <span className="text-sm font-medium">{error.message}</span>
//                         </div>
//                     </div>
//                 )}

//                 {reservationStep === 0 ? (
//                     <>
//                         {/* Auth Notice */}
//                         {!Cookies.get('authToken') && (
//                             <div className="max-w-7xl mx-auto px-6 mt-6">
//                                 <div className="glass-card rounded-2xl p-6 shadow-lg border border-blue-100 flex flex-col md:flex-row gap-4 items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                                             <User className="text-blue-600" size={24} />
//                                         </div>
//                                         <div>
//                                             <h3 className="font-semibold text-gray-900">{t('vehicles.authNotice.title')}</h3>
//                                             <p className="text-sm text-gray-600">{t('vehicles.authNotice.subtitle')}</p>
//                                         </div>
//                                     </div>
//                                     <Link to="/auth" className="btn-primary px-6 py-3 rounded-xl text-white font-semibold text-sm w-full md:w-auto text-center">
//                                         {t('vehicles.authNotice.button')}
//                                     </Link>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Reservation Form */}
//                         <div className="max-w-7xl mx-auto px-6 mt-6">
//                             <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
//                                 <div className="flex items-center gap-3 mb-6">
//                                     <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
//                                         <Calendar className="text-blue-600" size={20} />
//                                     </div>
//                                     <div>
//                                         <h2 className="font-bold text-gray-900">{t('vehicles.reservationForm.title')}</h2>
//                                         <p className="text-sm text-gray-500">{t('vehicles.reservationForm.subtitle')}</p>
//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
//                                     <div className="flex flex-col">
//                                         <label className="font-medium text-sm text-gray-700 mb-2">{t('vehicles.reservationForm.pickupDate')}</label>
//                                         <div
//                                             onClick={() => setModalOpen(true)}
//                                             className="date-input flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100"
//                                         >
//                                             <Calendar size={18} className="text-gray-400" />
//                                             <span className={pickupDate ? "text-gray-900" : "text-gray-400"}>
//                                                 {pickupDate || t('vehicles.reservationForm.selectDate')}
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col">
//                                         <label className="font-medium text-sm text-gray-700 mb-2">{t('vehicles.reservationForm.returnDate')}</label>
//                                         <div
//                                             onClick={() => setModalOpenReturn(true)}
//                                             className="date-input flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100"
//                                         >
//                                             <Calendar size={18} className="text-gray-400" />
//                                             <span className={returnDate ? "text-gray-900" : "text-gray-400"}>
//                                                 {returnDate || t('vehicles.reservationForm.selectDate')}
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <button
//                                         onClick={finishReservation}
//                                         className="btn-green py-4 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
//                                     >
//                                         {t('vehicles.reservationForm.button')} <ChevronRight size={18} />
//                                     </button>
//                                 </div>
//                                 {duration && duration > 0 && (
//                                     <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
//                                         <Clock size={18} className="text-green-600" />
//                                         <span className="text-green-700 font-medium">
//                                             {t('vehicles.reservationForm.duration')}: {duration} {duration === 1 ? t('vehicles.reservationForm.day') : t('vehicles.reservationForm.days')}
//                                         </span>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Vehicle List */}
//                         <div className="max-w-7xl mx-auto px-6 mt-8">
//                             <h2 className="text-xl font-bold text-gray-900 mb-6">{t('vehicles.availableVehicles')}</h2>
//                             <div className="space-y-4">
//                                 {vehicles.map((vehicle) => {
//                                     const busy = isCarBusy(vehicle.id);
//                                     const isSelected = selectedCar === vehicle.id;
//                                     return (
//                                         <div
//                                             key={vehicle.id}
//                                             className={`vehicle-card bg-white rounded-2xl p-6 shadow-sm ${isSelected ? 'selected' : ''} ${busy ? 'unavailable' : ''}`}
//                                         >
//                                             <div className="flex flex-col lg:flex-row gap-6">
//                                                 {/* Vehicle Image */}
//                                                 <div className="lg:w-80 flex-shrink-0">
//                                                     <img
//                                                         src={vehicle.banner_image}
//                                                         alt={vehicle.vehicle_name}
//                                                         className="w-full h-48 object-contain rounded-xl bg-gray-50"
//                                                     />
//                                                 </div>

//                                                 {/* Vehicle Info */}
//                                                 <div className="flex-1 flex flex-col lg:flex-row justify-between gap-6">
//                                                     <div className="flex-1">
//                                                         <h3 className="text-2xl font-bold text-gray-900 mb-4">{vehicle.vehicle_name}</h3>

//                                                         {/* Tags */}
//                                                         <div className="flex flex-wrap gap-2 mb-4">
//                                                             <span className="tag"><Users size={14} /> 5 {t('vehicles.tags.seats')}</span>
//                                                             <span className="tag"><Battery size={14} /> {vehicle.range_km} km</span>
//                                                             <span className="tag"><Snowflake size={14} /> A/C</span>
//                                                             <span className="tag"><Zap size={14} /> {vehicle.battery_capacity_kwh} kWh</span>
//                                                             <span className="tag"><Check size={14} /> Autopilot</span>
//                                                             <span className="tag"><Shield size={14} /> AWD</span>
//                                                         </div>

//                                                         {/* Features */}
//                                                         <div className="space-y-2">
//                                                             <div className="flex items-center gap-2 text-sm">
//                                                                 <Check size={16} className="text-green-500" />
//                                                                 <span className="text-gray-700">{t('vehicles.features.unlimitedMileage')}</span>
//                                                             </div>
//                                                             <div className="flex items-center gap-2 text-sm">
//                                                                 <Check size={16} className="text-green-500" />
//                                                                 <span className="text-gray-700">{t('vehicles.features.insurance')}</span>
//                                                             </div>
//                                                             <div className="flex items-center gap-2 text-sm">
//                                                                 <Info size={16} className="text-gray-400" />
//                                                                 <span className="text-gray-500">{t('vehicles.features.minAge')}</span>
//                                                             </div>
//                                                         </div>
//                                                     </div>

//                                                     {/* Price & Action */}
//                                                     <div className="lg:w-56 flex flex-col items-end justify-between">
//                                                         <div className="text-right">
//                                                             <p className="text-sm text-gray-500 mb-1">{t('vehicles.price.payAtDesk')}</p>
//                                                             <div className="flex items-baseline gap-1 justify-end">
//                                                                 <span className="text-3xl font-bold text-gray-900">{vehicle.price_per_day.toLocaleString()}</span>
//                                                                 <span className="text-gray-500">din/{t('vehicles.price.day')}</span>
//                                                             </div>
//                                                             {duration && duration > 0 && (
//                                                                 <p className="text-sm text-gray-500 mt-1">
//                                                                     {t('vehicles.price.total')}: <span className="font-semibold text-gray-900">{(duration * vehicle.price_per_day).toLocaleString()} din</span>
//                                                                 </p>
//                                                             )}
//                                                         </div>
//                                                         <button
//                                                             onClick={() => { if (!busy) setSelectedCar(isSelected ? null : vehicle.id); }}
//                                                             disabled={busy}
//                                                             className={`w-full lg:w-auto mt-4 py-3 px-6 rounded-xl font-semibold text-sm transition-all ${busy
//                                                                     ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                                                                     : isSelected
//                                                                         ? 'bg-gray-900 text-white'
//                                                                         : 'btn-green text-white'
//                                                                 }`}
//                                                         >
//                                                             {busy ? t('vehicles.buttons.notAvailable') : isSelected ? t('vehicles.buttons.selected') : t('vehicles.buttons.select')}
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     /* Checkout Step */
//                     <div className="max-w-4xl mx-auto px-6 mt-6">
//                         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                             {/* Header */}
//                             <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
//                                 <h1 className="text-2xl font-bold mb-2">{t('vehicles.checkout.title')}</h1>
//                                 <p className="text-gray-300">{t('vehicles.checkout.subtitle')}</p>
//                             </div>

//                             {/* Selected Vehicle */}
//                             {vehicles.filter((v) => v.id === selectedCar).map((vehicle) => (
//                                 <div key={vehicle.id} className="p-6 border-b border-gray-100">
//                                     <div className="flex flex-col md:flex-row gap-6">
//                                         <img src={vehicle.banner_image} className="w-full md:w-64 h-40 object-contain bg-gray-50 rounded-xl" alt={vehicle.vehicle_name} />
//                                         <div className="flex-1">
//                                             <h3 className="text-xl font-bold text-gray-900 mb-3">{vehicle.vehicle_name}</h3>
//                                             <div className="flex flex-wrap gap-2 mb-3">
//                                                 <span className="tag"><Users size={14} /> 5</span>
//                                                 <span className="tag"><Battery size={14} /> {vehicle.range_km} km</span>
//                                                 <span className="tag"><Snowflake size={14} /> A/C</span>
//                                             </div>
//                                             <div className="space-y-1">
//                                                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                                                     <Check size={14} className="text-green-500" /> {t('vehicles.features.unlimitedMileage')}
//                                                 </div>
//                                                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                                                     <Check size={14} className="text-green-500" /> {t('vehicles.features.insurance')}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}

//                             {/* Date Range */}
//                             <div className="p-6 bg-gray-50">
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
//                                     <div className="bg-white p-4 rounded-xl text-center">
//                                         <p className="text-xs text-gray-500 mb-1">{t('vehicles.checkout.pickup')}</p>
//                                         <p className="font-semibold text-gray-900">{pickupDate}</p>
//                                     </div>
//                                     <div className="flex justify-center">
//                                         <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                                             <ChevronRight className="text-blue-600" size={20} />
//                                         </div>
//                                     </div>
//                                     <div className="bg-white p-4 rounded-xl text-center">
//                                         <p className="text-xs text-gray-500 mb-1">{t('vehicles.checkout.return')}</p>
//                                         <p className="font-semibold text-gray-900">{returnDate}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Price Summary */}
//                             <div className="p-6">
//                                 {vehicles.filter((v) => v.id === selectedCar).map((vehicle) => (
//                                     <div key={vehicle.id} className="space-y-3">
//                                         <div className="flex justify-between text-gray-600">
//                                             <span>{t('vehicles.checkout.pricePerDay')}</span>
//                                             <span>{vehicle.price_per_day.toLocaleString()} din</span>
//                                         </div>
//                                         <div className="flex justify-between text-gray-600">
//                                             <span>{t('vehicles.checkout.duration')}</span>
//                                             <span>{duration} {duration === 1 ? t('vehicles.reservationForm.day') : t('vehicles.reservationForm.days')}</span>
//                                         </div>
//                                         <div className="flex justify-between text-gray-600">
//                                             <span>{t('vehicles.checkout.discount')}</span>
//                                             <span>0 din</span>
//                                         </div>
//                                         <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
//                                             <span className="text-lg font-bold text-gray-900">{t('vehicles.checkout.total')}</span>
//                                             <span className="text-2xl font-bold text-gray-900">{(duration * vehicle.price_per_day).toLocaleString()} din</span>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Actions */}
//                             <div className="p-6 bg-gray-50 flex flex-col md:flex-row gap-4 justify-between">
//                                 <button
//                                     onClick={() => setReservationStep(0)}
//                                     className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
//                                 >
//                                     {t('vehicles.checkout.back')}
//                                 </button>
//                                 <button
//                                     onClick={createReservation}
//                                     className="btn-green px-8 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
//                                 >
//                                     <ShoppingBasket size={18} /> {t('vehicles.checkout.confirm')}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </main>

//             {/* Footer */}
//             <footer className="bg-gray-900 text-white py-8">
//                 <div className="max-w-7xl mx-auto px-6 text-center">
//                     <p className="text-gray-500 text-sm">{t('footer.copyright')}</p>
//                 </div>
//             </footer>

//             {/* Date Modals */}
//             {isModalOpen && (
//                 <DateTimePicker
//                     onClose={() => setModalOpen(false)}
//                     disabled={{ before: new Date() }}
//                     onConfirm={(formattedDate) => { setPickupDate(formattedDate); calculateDuration(formattedDate, returnDate); }}
//                 />
//             )}
//             {isModalOpenReturn && (
//                 <DateTimePicker
//                     onClose={() => setModalOpenReturn(false)}
//                     disabled={{ before: formattedPickupDate }}
//                     onConfirm={(formattedDate) => { setReturnDate(formattedDate); calculateDuration(pickupDate, formattedDate); }}
//                 />
//             )}
//         </div>
//     );
// }

// export default Cars;

import React, { useEffect, useState } from "react";
import { Users, Snowflake, Check, Info, ChevronRight, ChevronLeft, Calendar, ArrowRight, ShieldCheck, Clock, User, Globe, Zap, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ApplicationContext";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

// Pricing tiers
const PRICING_TIERS = [
    { minDays: 1, maxDays: 3, pricePerDay: 100 },
    { minDays: 4, maxDays: 7, pricePerDay: 85 },
    { minDays: 8, maxDays: 15, pricePerDay: 75 },
    { minDays: 16, maxDays: 24, pricePerDay: 60 },
    { minDays: 25, maxDays: 29, pricePerDay: 50 },
    { minDays: 30, maxDays: Infinity, pricePerDay: 40 },
];

const DEPOSIT_AMOUNT = 1000;

const getPricePerDay = (days) => {
    if (!days || days < 1) return PRICING_TIERS[0].pricePerDay;
    const tier = PRICING_TIERS.find(t => days >= t.minDays && days <= t.maxDays);
    return tier ? tier.pricePerDay : PRICING_TIERS[0].pricePerDay;
};

const calculatePrice = (days) => {
    const pricePerDay = getPricePerDay(days);
    const totalPrice = pricePerDay * days;
    const fullPrice = PRICING_TIERS[0].pricePerDay * days;
    const savings = fullPrice - totalPrice;
    const savingsPercent = days > 0 ? Math.round((savings / fullPrice) * 100) : 0;
    return { pricePerDay, totalPrice, savings, savingsPercent };
};

function Cars() {
    const { reservations, vehicles } = useAppContext();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [checkoutStep, setCheckoutStep] = useState(0);
    const [durationDays, setDurationDays] = useState(0);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const id = Cookies.get('userId');
        setUserId(id);
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDurationDays(diffDays);
        } else {
            setDurationDays(0);
        }
    }, [startDate, endDate]);

    const changeLanguage = (lang) => { i18n.changeLanguage(lang); };

    const isVehicleBusy = (vehicleId) => {
        if (!startDate || !endDate) return false;
        const start = new Date(startDate);
        const end = new Date(endDate);
        return reservations.some(res => {
            if (res.vehicle_id !== vehicleId || res.status === 'failed') return false;
            const resStart = new Date(res.start_time);
            const resEnd = new Date(res.end_time);
            return (start <= resEnd && end >= resStart);
        });
    };

    const pricing = calculatePrice(durationDays);

    const makeReservation = async () => {
        if (durationDays < 1 || !selectedCar) {
            toast.error(t('errors.invalidReservation'));
            return;
        }
        if (!userId) {
            toast.error(t('errors.notAllowed'));
            return;
        }

        const vehicle = vehicles.find(v => v.id === selectedCar);
        if (!vehicle) {
            toast.error(t('errors.carNotFound'));
            return;
        }

        try {
            const response = await fetch("https://tesla.movelink.org/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: userId,
                    vehicle_id: selectedCar,
                    start_time: startDate,
                    end_time: endDate,
                    duration: durationDays,
                    price: pricing.totalPrice
                }),
            });
            if (!response.ok) throw new Error("Failed");
            toast.success(t('success.reservationCreated'));
            navigate("/client");
        } catch (error) {
            toast.error(t('errors.reservationFailed'));
        }
    };

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .date-input { width: 100%; padding: 14px 16px; font-size: 14px; border: 1px solid #e5e7eb; border-radius: 12px; background: #f9fafb; transition: all 0.2s; outline: none; }
        .date-input:focus { border-color: #171a20; background: #fff; }
        .vehicle-card { border: 2px solid transparent; border-radius: 16px; transition: all 0.3s ease; background: #fff; }
        .vehicle-card:hover { border-color: #e5e7eb; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
        .vehicle-card.selected { border-color: #171a20; background: linear-gradient(135deg, #fafafa 0%, #fff 100%); }
        .btn-primary { background: #171a20; color: #fff; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-primary:hover { background: #000; transform: translateY(-1px); }
        .btn-primary:disabled { background: #d1d5db; cursor: not-allowed; transform: none; }
        .btn-secondary { background: #f3f4f6; color: #171a20; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; transition: all 0.2s; }
        .btn-secondary:hover { background: #e5e7eb; }
        .pricing-badge { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .tier-active { background: #171a20; color: #fff; }
        .info-card { background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
      `}</style>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/"><img src={require('../assets/teslalogo.png')} style={{ height: 20 }} alt="Tesla Rent" /></Link>
                    <div className="flex items-center gap-4">
                        <select onChange={(e) => changeLanguage(e.target.value)} className="text-sm bg-transparent border border-gray-200 rounded-lg px-3 py-2" value={i18n.language}>
                            <option value="en">EN</option>
                            <option value="de">DE</option>
                            <option value="sr">SR</option>
                        </select>
                        <Link to={userId ? "/client" : "/auth"} className="p-2 hover:bg-gray-100 rounded-full">
                            <User size={20} className="text-gray-600" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('vehicles.pageTitle')}</h1>
                        <p className="text-gray-500">{t('vehicles.pageSubtitle')}</p>
                    </div>

                    {/* Auth Notice */}
                    {!userId && (
                        <div className="info-card mb-8 flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{t('vehicles.authNotice.title')}</p>
                                    <p className="text-sm text-gray-500">{t('vehicles.authNotice.subtitle')}</p>
                                </div>
                            </div>
                            <Link to="/auth" className="btn-primary">{t('vehicles.authNotice.button')}</Link>
                        </div>
                    )}

                    {checkoutStep === 0 ? (
                        <>
                            {/* Date Selection */}
                            <div className="bg-gray-50 rounded-2xl p-8 mb-10">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('vehicles.reservationForm.title')}</h2>
                                <p className="text-sm text-gray-500 mb-6">{t('vehicles.reservationForm.subtitle')}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                            {t('vehicles.reservationForm.pickupDate')}
                                        </label>
                                        <input type="datetime-local" className="date-input" value={startDate || ''} onChange={(e) => setStartDate(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                            {t('vehicles.reservationForm.returnDate')}
                                        </label>
                                        <input type="datetime-local" className="date-input" value={endDate || ''} onChange={(e) => setEndDate(e.target.value)} />
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <p className="text-xs text-gray-500 mb-1">{t('vehicles.reservationForm.duration')}</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {durationDays} <span className="text-sm font-normal text-gray-500">{durationDays === 1 ? t('vehicles.reservationForm.day') : t('vehicles.reservationForm.days')}</span>
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <p className="text-xs text-gray-500 mb-1">{t('vehicles.checkout.pricePerDay')}</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            €{pricing.pricePerDay} <span className="text-sm font-normal text-gray-500">/{t('vehicles.price.day')}</span>
                                        </p>
                                        {pricing.savingsPercent > 0 && (
                                            <span className="pricing-badge">{t('pricing.saveBadge').replace('60', pricing.savingsPercent)}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Pricing Tiers */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{t('vehicles.pricingNote')}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {PRICING_TIERS.map((tier, idx) => (
                                            <div key={idx} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${durationDays >= tier.minDays && durationDays <= tier.maxDays
                                                    ? 'tier-active'
                                                    : 'bg-white border border-gray-200 text-gray-600'
                                                }`}>
                                                {tier.maxDays === Infinity ? '30+' : `${tier.minDays}-${tier.maxDays}`} {t('vehicles.reservationForm.days')}: €{tier.pricePerDay}/{t('vehicles.price.day')}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Requirements Notice */}
                            <div className="info-card mb-8 flex items-start gap-3">
                                <AlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-900 mb-1">{t('pricing.requirements')}</p>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1"><Check size={14} className="text-green-500" /> {t('pricing.requirementAge')}</span>
                                        <span className="flex items-center gap-1"><Check size={14} className="text-green-500" /> {t('pricing.requirementLicense')}</span>
                                        <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-blue-500" /> {t('pricing.deposit')}: €{DEPOSIT_AMOUNT}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Vehicles Grid */}
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('vehicles.availableVehicles')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {vehicles.map((vehicle) => {
                                    const isBusy = isVehicleBusy(vehicle.id);
                                    const isSelected = selectedCar === vehicle.id;

                                    return (
                                        <div key={vehicle.id} className={`vehicle-card p-6 ${isSelected ? 'selected' : ''} ${isBusy ? 'opacity-50' : ''}`}>
                                            <div className="h-40 flex items-center justify-center mb-4">
                                                <img src={vehicle.banner_image} alt={vehicle.vehicle_name} className="max-h-full object-contain" />
                                            </div>

                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{vehicle.vehicle_name}</h3>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center gap-1">
                                                    <Users size={12} /> 5 {t('vehicles.tags.seats')}
                                                </span>
                                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center gap-1">
                                                    <Zap size={12} /> {vehicle.range_km} km
                                                </span>
                                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center gap-1">
                                                    <Snowflake size={12} /> A/C
                                                </span>
                                            </div>

                                            <div className="space-y-2 mb-4 text-sm">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Check size={14} className="text-green-500" /> {t('vehicles.features.unlimitedMileage')}
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <ShieldCheck size={14} className="text-blue-500" /> {t('vehicles.features.insurance')}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div>
                                                    <p className="text-xs text-gray-500">{t('vehicles.price.from')}</p>
                                                    <p className="text-xl font-bold text-gray-900">€{durationDays > 0 ? pricing.pricePerDay : 40}<span className="text-sm font-normal text-gray-500">/{t('vehicles.price.day')}</span></p>
                                                </div>
                                                <button
                                                    onClick={() => !isBusy && setSelectedCar(isSelected ? null : vehicle.id)}
                                                    disabled={isBusy}
                                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${isBusy ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                                            isSelected ? 'bg-green-500 text-white' : 'bg-gray-900 text-white hover:bg-black'
                                                        }`}
                                                >
                                                    {isBusy ? t('vehicles.buttons.notAvailable') : isSelected ? t('vehicles.buttons.selected') : t('vehicles.buttons.select')}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Continue Button */}
                            {selectedCar && durationDays > 0 && (
                                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
                                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">{t('vehicles.price.total')}</p>
                                            <p className="text-2xl font-bold text-gray-900">€{pricing.totalPrice}</p>
                                        </div>
                                        <button onClick={() => setCheckoutStep(1)} className="btn-primary">
                                            {t('vehicles.reservationForm.button')} <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Checkout Step */
                        <div className="max-w-2xl mx-auto">
                            <button onClick={() => setCheckoutStep(0)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
                                <ChevronLeft size={20} /> {t('vehicles.checkout.back')}
                            </button>

                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('vehicles.checkout.title')}</h2>
                            <p className="text-gray-500 mb-8">{t('vehicles.checkout.subtitle')}</p>

                            {/* Selected Vehicle */}
                            {vehicles.filter(v => v.id === selectedCar).map(vehicle => (
                                <div key={vehicle.id} className="bg-gray-50 rounded-2xl p-6 mb-6">
                                    <div className="flex items-center gap-4">
                                        <img src={vehicle.banner_image} alt={vehicle.vehicle_name} className="w-32 h-20 object-contain" />
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{vehicle.vehicle_name}</h3>
                                            <p className="text-sm text-gray-500">{vehicle.range_km} km {t('carControl.range')}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Dates */}
                            <div className="grid grid-cols-3 items-center gap-4 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <Calendar size={20} className="mx-auto text-gray-400 mb-2" />
                                    <p className="text-xs text-gray-500">{t('vehicles.checkout.pickup')}</p>
                                    <p className="font-medium text-gray-900">{new Date(startDate).toLocaleDateString()}</p>
                                </div>
                                <div className="flex justify-center"><ArrowRight size={24} className="text-gray-300" /></div>
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <Calendar size={20} className="mx-auto text-gray-400 mb-2" />
                                    <p className="text-xs text-gray-500">{t('vehicles.checkout.return')}</p>
                                    <p className="font-medium text-gray-900">{new Date(endDate).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Requirements */}
                            <div className="info-card mb-6">
                                <p className="font-medium text-gray-900 mb-3">{t('vehicles.checkout.requirements')}</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Check size={14} className="text-green-500" /> {t('vehicles.checkout.requirementAge')}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Check size={14} className="text-green-500" /> {t('vehicles.checkout.requirementLicense')}
                                    </div>
                                </div>
                            </div>

                            {/* Price Summary */}
                            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">{t('vehicles.checkout.pricePerDay')}</span>
                                        <span className="text-gray-900">€{pricing.pricePerDay}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">{t('vehicles.checkout.duration')}</span>
                                        <span className="text-gray-900">{durationDays} {t('vehicles.reservationForm.days')}</span>
                                    </div>
                                    {pricing.savings > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>{t('vehicles.checkout.discount')}</span>
                                            <span>-€{pricing.savings}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                                        <span className="font-semibold text-gray-900">{t('vehicles.checkout.total')}</span>
                                        <span className="text-2xl font-bold text-gray-900">€{pricing.totalPrice}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Deposit Notice */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
                                <ShieldCheck size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-amber-900">{t('vehicles.checkout.deposit')}: €{DEPOSIT_AMOUNT}</p>
                                    <p className="text-sm text-amber-700">{t('vehicles.checkout.depositNote')}</p>
                                </div>
                            </div>

                            {/* Confirm Button */}
                            <button onClick={makeReservation} className="btn-primary w-full justify-center">
                                {t('vehicles.checkout.confirm')} <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Cars;