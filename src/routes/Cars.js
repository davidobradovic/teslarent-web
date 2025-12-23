import React, { useEffect, useState } from "react";
import { Users, Snowflake, Check, ChevronRight, ChevronLeft, Calendar, ArrowRight, ShieldCheck, User, Zap, AlertCircle, Battery, Gauge, Star, Clock, MapPin, CreditCard, Info, X, PaintBucket, CarFront, ShipWheel } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ApplicationContext";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { GiCartwheel } from "react-icons/gi";
import { PiSeatDuotone } from "react-icons/pi";


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
    const [showPricingModal, setShowPricingModal] = useState(false);

    const exteriorColorMap = {
        'Pearl White': { label: 'Pearl White', color: '#f2f2f2' },
        'Solid Black': { label: 'Solid Black', color: '#000000' },
        'Midnight Silver': { label: 'Midnight Silver', color: '#42464a' },
        'Deep Blue': { label: 'Deep Blue', color: '#1e3a5f' },
        'Red Multi-Coat': { label: 'Red', color: '#a82535' },
        'Quicksilver': { label: 'Quicksilver', color: '#8c8c8c' },
        'Ultra White': { label: 'Ultra White', color: '#ffffff' },
    };

    const interiorColorMap = {
        'All Black': { label: 'All Black', color: '#1a1a1a' },
        'Black and White': { label: 'Black & White', color: '#f5f5f5' },
        'Cream': { label: 'Cream', color: '#f5f0e6' },
        'Walnut Decor': { label: 'Walnut', color: '#5c4033' },
    };


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

    const getTierLabel = (tier) => {
        if (tier.maxDays === Infinity) return '30+';
        return `${tier.minDays}-${tier.maxDays}`;
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa]" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * { box-sizing: border-box; }
        
        .glass-header {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        }
        
        .card-elevated {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-elevated:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
        
        .vehicle-card {
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
        }
        
        .vehicle-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.2);
        }
        
        .vehicle-card.selected {
          border-color: #000;
          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
        }
        
        .vehicle-image-container {
          background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 32px;
          position: relative;
          overflow: hidden;
        }
        
        .vehicle-image-container::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%);
          transform: translate(-50%, -50%);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #000 0%, #333 100%);
          color: #fff;
          padding: 16px 32px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          cursor: pointer;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        
        .btn-primary:disabled {
          background: #d1d5db;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .btn-secondary {
          background: #f3f4f6;
          color: #1f2937;
          padding: 16px 32px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .btn-secondary:hover {
          background: #e5e7eb;
        }
        
        .btn-select {
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .btn-select-default {
          background: #000;
          color: #fff;
        }
        
        .btn-select-default:hover {
          background: #333;
          transform: scale(1.05);
        }
        
        .btn-select-selected {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #fff;
        }
        
        .btn-select-unavailable {
          background: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        }
        
        .date-input-container {
          position: relative;
        }
        
        .date-input {
          width: 100%;
          padding: 18px 20px;
          font-size: 15px;
          border: 2px solid #e5e7eb;
          border-radius: 14px;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
          font-family: inherit;
        }
        
        .date-input:focus {
          border-color: #000;
          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05);
        }
        
        .pricing-tier {
          padding: 10px 18px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        .pricing-tier-active {
          background: #000;
          color: #fff;
        }
        
        .pricing-tier-inactive {
          background: #fff;
          color: #6b7280;
          border: 1px solid #e5e7eb;
        }
        
        .feature-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #f8f9fa;
          border-radius: 10px;
          font-size: 13px;
          color: #4b5563;
          font-weight: 500;
        }
        
        .info-banner {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 1px solid #fcd34d;
          border-radius: 16px;
          padding: 20px 24px;
        }
        
        .savings-badge {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #fff;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        
        .stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          border: 1px solid #e5e7eb;
        }
        
        .checkout-section {
          background: #fff;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .modal-content {
          background: #fff;
          border-radius: 24px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .lang-select {
          appearance: none;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 10px 36px 10px 14px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }
        
        .sticky-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid #e5e7eb;
          padding: 16px 24px;
          z-index: 50;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

            {/* Header */}
            <header className="glass-header fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3">
                            <img src={require('../assets/teslalogo.png')} style={{ height: 22 }} alt="Tesla Rent" />
                        </Link>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowPricingModal(true)}
                                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <Info size={16} />
                                {t('vehicles.viewPricing')}
                            </button>

                            <select
                                onChange={(e) => changeLanguage(e.target.value)}
                                className="lang-select"
                                value={i18n.language}
                            >
                                <option value="en">English</option>
                                <option value="de">Deutsch</option>
                                <option value="sr">Srpski</option>
                            </select>

                            <Link
                                to={userId ? "/client" : "/auth"}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                            >
                                <User size={18} />
                                <span className="hidden md:inline text-sm font-medium">
                                    {userId ? t('dashboard.myReservations') : t('auth.signIn')}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Pricing Modal */}
            {showPricingModal && (
                <div className="modal-overlay" onClick={() => setShowPricingModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">{t('pricing.title')}</h3>
                            <button onClick={() => setShowPricingModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {PRICING_TIERS.map((tier, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <span className="font-medium text-gray-900">
                                        {getTierLabel(tier)} {t('vehicles.reservationForm.days')}
                                    </span>
                                    <span className="text-xl font-bold text-gray-900">
                                        €{tier.pricePerDay}<span className="text-sm font-normal text-gray-500">/{t('vehicles.price.day')}</span>
                                    </span>
                                </div>
                            ))}
                            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={24} className="text-amber-600" />
                                    <div>
                                        <p className="font-semibold text-amber-900">{t('pricing.deposit')}: €{DEPOSIT_AMOUNT}</p>
                                        <p className="text-sm text-amber-700">{t('pricing.depositNote')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <main className="pt-20">
                {checkoutStep === 0 ? (
                    <>
                        {/* Hero Section */}
                        

                        {/* Main Content */}
                        <section className="py-12">
                            <div className="max-w-7xl mx-auto px-6">

                                {/* Auth Notice */}
                                {!userId && (
                                    <div className="info-banner mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                                                <User size={24} className="text-amber-700" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-amber-900">{t('vehicles.authNotice.title')}</p>
                                                <p className="text-sm text-amber-700">{t('vehicles.authNotice.subtitle')}</p>
                                            </div>
                                        </div>
                                        <Link to="/auth" className="btn-primary whitespace-nowrap">
                                            {t('vehicles.authNotice.button')}
                                            <ChevronRight size={18} />
                                        </Link>
                                    </div>
                                )}

                                {/* Date Selection Card */}
                                <div className="card-elevated p-8 mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">{t('vehicles.reservationForm.title')}</h2>
                                            <p className="text-gray-500 mt-1">{t('vehicles.reservationForm.subtitle')}</p>
                                        </div>
                                        <button
                                            onClick={() => setShowPricingModal(true)}
                                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                                        >
                                            <Info size={16} />
                                            {t('vehicles.viewPricing')}
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {/* Pickup Date */}
                                        <div className="date-input-container">
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                <Calendar size={14} className="inline mr-2" />
                                                {t('vehicles.reservationForm.pickupDate')}
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className="date-input"
                                                value={startDate || ''}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </div>

                                        {/* Return Date */}
                                        <div className="date-input-container">
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                <Calendar size={14} className="inline mr-2" />
                                                {t('vehicles.reservationForm.returnDate')}
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className="date-input"
                                                value={endDate || ''}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </div>

                                        {/* Duration */}
                                        <div className="stat-card">
                                            <Clock size={20} className="mx-auto text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500 mb-1">{t('vehicles.reservationForm.duration')}</p>
                                            <p className="text-3xl font-bold text-gray-900">{durationDays}</p>
                                            <p className="text-sm text-gray-500">{durationDays === 1 ? t('vehicles.reservationForm.day') : t('vehicles.reservationForm.days')}</p>
                                        </div>

                                        {/* Price */}
                                        <div className="stat-card bg-gray-900 text-black border-0">
                                            <CreditCard size={20} className="mx-auto text-gray-400 mb-2" />
                                            <p className="text-sm opacity-50 mb-1">{t('vehicles.checkout.pricePerDay')}</p>
                                            <p className="text-3xl font-bold">€{pricing.pricePerDay}</p>
                                            <p className="text-sm opacity-50">/{t('vehicles.price.day')}</p>
                                            {pricing.savingsPercent > 0 && (
                                                <div className="mt-2">
                                                    <span className="savings-badge">
                                                        <Star size={12} />
                                                        -{pricing.savingsPercent}%
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Pricing Tiers */}
                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                        <p className="text-sm font-semibold text-gray-700 mb-4">{t('vehicles.pricingNote')}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {PRICING_TIERS.map((tier, idx) => {
                                                const isActive = durationDays >= tier.minDays && durationDays <= tier.maxDays;
                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`pricing-tier ${isActive ? 'pricing-tier-active' : 'pricing-tier-inactive'}`}
                                                    >
                                                        {getTierLabel(tier)} {t('vehicles.reservationForm.days')}: €{tier.pricePerDay}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Requirements Banner */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                                    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <Check size={24} className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{t('pricing.requirementAge')}</p>
                                            <p className="text-sm text-gray-500">{t('vehicles.features.minAgeDesc')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <CreditCard size={24} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{t('pricing.requirementLicense')}</p>
                                            <p className="text-sm text-gray-500">{t('vehicles.features.licenseDesc')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                            <ShieldCheck size={24} className="text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{t('pricing.deposit')}: €{DEPOSIT_AMOUNT}</p>
                                            <p className="text-sm text-gray-500">{t('pricing.depositNote')}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicles Section */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('vehicles.availableVehicles')}</h2>
                                    <p className="text-gray-500">{t('vehicles.selectVehicleDesc')}</p>
                                </div>

                                {/* Vehicles Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-32">
                                    {vehicles.map((vehicle, idx) => {
                                        const isBusy = isVehicleBusy(vehicle.id);
                                        const isSelected = selectedCar === vehicle.id;

                                        return (
                                            <div
                                                key={vehicle.id}
                                                className={`vehicle-card ${isSelected ? 'selected' : ''} ${isBusy ? 'opacity-60' : ''}`}
                                                style={{ animationDelay: `${idx * 0.1}s` }}
                                            >
                                                {/* Vehicle Image */}
                                                <div
                                                    className="vehicle-image-container relative w-full h-48 bg-no-repeat bg-center bg-contain"
                                                    style={{
                                                        backgroundImage: `url(${vehicle.banner_image})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                    }}
                                                >
                                                    {isSelected && (
                                                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 z-20">
                                                            <Check size={14} />
                                                            {t('vehicles.buttons.selected')}
                                                        </div>
                                                    )}

                                                    {isBusy && (
                                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-20">
                                                            {t('vehicles.buttons.notAvailable')}
                                                        </div>
                                                    )}
                                                </div>


                                                {/* Vehicle Info */}
                                                <div className="p-6">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <h3 className="text-2xl font-bold text-gray-900">{vehicle.vehicle_name}</h3>
                                                            <p className="text-gray-500">{vehicle.tesla_code}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-500">{t('vehicles.price.from')}</p>
                                                            <p className="text-2xl font-bold text-gray-900">
                                                                €{durationDays > 0 ? pricing.pricePerDay : 40}
                                                                <span className="text-sm font-normal text-gray-500">/{t('vehicles.price.day')}</span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Specs */}
                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        <span className="feature-tag">
                                                            <Users size={14} /> 5 {t('vehicles.tags.seats')}
                                                        </span>
                                                        <span className="feature-tag">
                                                            <Zap size={14} /> {vehicle.range_km} km
                                                        </span>
                                                        <span className="feature-tag">
                                                            <Gauge size={14} /> {vehicle.acceleration_0_100}s
                                                        </span>
                                                        <span className="feature-tag">
                                                            <Snowflake size={14} /> A/C
                                                        </span>
                                                        <span className="feature-tag">
                                                            <PaintBucket size={14} /> {vehicle.exterior_color}
                                                        </span>
                                                        <span className="feature-tag">
                                                            <PiSeatDuotone size={14} /> {vehicle.interior_color}
                                                        </span>
                                                        <span className="feature-tag">
                                                            <GiCartwheel size={14} /> {vehicle.wheel_size}"
                                                        </span>
                                                    </div>

                                                    {/* Features */}
                                                    <div className="space-y-2 mb-6">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Check size={16} className="text-green-500" />
                                                            {t('vehicles.features.unlimitedMileage')}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <ShieldCheck size={16} className="text-blue-500" />
                                                            {t('vehicles.features.insurance')}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Clock size={16} className="text-purple-500" />
                                                            {t('vehicles.features.support')}
                                                        </div>
                                                    </div>

                                                    {/* Select Button */}
                                                    <button
                                                        onClick={() => !isBusy && setSelectedCar(isSelected ? null : vehicle.id)}
                                                        disabled={isBusy}
                                                        className={`btn-select w-full ${isBusy ? 'btn-select-unavailable' :
                                                                isSelected ? 'btn-select-selected' : 'btn-select-default'
                                                            }`}
                                                    >
                                                        {isBusy ? t('vehicles.buttons.notAvailable') :
                                                            isSelected ? (
                                                                <><Check size={16} /> {t('vehicles.buttons.selected')}</>
                                                            ) : t('vehicles.buttons.select')}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>

                        {/* Sticky Footer */}
                        {selectedCar && durationDays > 0 && (
                            <div className="sticky-footer animate-fade-in">
                                <div className="max-w-7xl mx-auto flex items-center flex-wrap justify-between">
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500">{t('vehicles.price.total')}</p>
                                            <p className="text-3xl font-bold text-gray-900">€{pricing.totalPrice}</p>
                                        </div>
                                        {pricing.savings > 0 && (
                                            <span className="savings-badge hidden md:flex">
                                                <Star size={12} />
                                                {t('vehicles.youSave')} €{pricing.savings}
                                            </span>
                                        )}
                                    </div>
                                    <button onClick={() => setCheckoutStep(1)} className="btn-primary">
                                        {t('vehicles.reservationForm.button')}
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* Checkout Step */
                    <section className="py-12">
                        <div className="max-w-2xl mx-auto px-6">
                            <button
                                onClick={() => setCheckoutStep(0)}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-medium"
                            >
                                <ChevronLeft size={20} /> {t('vehicles.checkout.back')}
                            </button>

                            <div className="text-center mb-10">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('vehicles.checkout.title')}</h1>
                                <p className="text-gray-500">{t('vehicles.checkout.subtitle')}</p>
                            </div>

                            {/* Selected Vehicle */}
                            {vehicles.filter(v => v.id === selectedCar).map(vehicle => (
                                <div key={vehicle.id} className="checkout-section mb-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-32 h-24 bg-gray-50 rounded-xl flex items-center justify-center">
                                            <img src={vehicle.banner_image} alt={vehicle.vehicle_name} className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{vehicle.vehicle_name}</h3>
                                            <p className="text-gray-500">{vehicle.tesla_code}</p>
                                            <div className="flex gap-2 mt-2">
                                                <span className="feature-tag text-xs"><Battery size={12} /> {vehicle.battery_capacity_kwh} kWh</span>
                                                <span className="feature-tag text-xs"><Zap size={12} /> {vehicle.range_km} km</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Dates */}
                            <div className="checkout-section mb-6">
                                <div className="grid grid-cols-5 items-center gap-4">
                                    <div className="col-span-2 text-center">
                                        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Calendar size={24} className="text-gray-600" />
                                        </div>
                                        <p className="text-sm text-gray-500 mb-1">{t('vehicles.checkout.pickup')}</p>
                                        <p className="font-bold text-gray-900">{new Date(startDate).toLocaleDateString()}</p>
                                        <p className="text-sm text-gray-500">{new Date(startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div className="flex justify-center">
                                        <ArrowRight size={28} className="text-gray-300" />
                                    </div>
                                    <div className="col-span-2 text-center">
                                        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Calendar size={24} className="text-gray-600" />
                                        </div>
                                        <p className="text-sm text-gray-500 mb-1">{t('vehicles.checkout.return')}</p>
                                        <p className="font-bold text-gray-900">{new Date(endDate).toLocaleDateString()}</p>
                                        <p className="text-sm text-gray-500">{new Date(endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Requirements */}
                            <div className="checkout-section mb-6 bg-gray-50">
                                <h4 className="font-bold text-gray-900 mb-4">{t('vehicles.checkout.requirements')}</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Check size={18} className="text-green-500" />
                                        <span className="text-gray-700">{t('vehicles.checkout.requirementAge')}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Check size={18} className="text-green-500" />
                                        <span className="text-gray-700">{t('vehicles.checkout.requirementLicense')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price Summary */}
                            <div className="checkout-section mb-6">
                                <h4 className="font-bold text-gray-900 mb-4">{t('vehicles.checkout.priceSummary')}</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t('vehicles.checkout.pricePerDay')}</span>
                                        <span className="font-medium text-gray-900">€{pricing.pricePerDay}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t('vehicles.checkout.duration')}</span>
                                        <span className="font-medium text-gray-900">{durationDays} {t('vehicles.reservationForm.days')}</span>
                                    </div>
                                    {pricing.savings > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>{t('vehicles.checkout.discount')}</span>
                                            <span className="font-medium">-€{pricing.savings}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">{t('vehicles.checkout.total')}</span>
                                        <span className="text-2xl font-bold text-gray-900">€{pricing.totalPrice}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Deposit Notice */}
                            <div className="info-banner mb-8 flex items-start gap-4">
                                <ShieldCheck size={28} className="text-amber-600 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-amber-900">{t('vehicles.checkout.deposit')}: €{DEPOSIT_AMOUNT}</p>
                                    <p className="text-sm text-amber-700 mt-1">{t('vehicles.checkout.depositNote')}</p>
                                </div>
                            </div>

                            {/* Confirm Button */}
                            <button onClick={makeReservation} className="btn-primary w-full">
                                {t('vehicles.checkout.confirm')}
                                <ChevronRight size={18} />
                            </button>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                {t('vehicles.checkout.termsNote')}
                            </p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default Cars;




// <section className="hero-gradient text-white py-16 md:py-24">
//     <div className="max-w-7xl mx-auto px-6">
//         <div className="max-w-3xl">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
//                 {t('vehicles.pageTitle')}
//             </h1>
//             <p className="text-lg md:text-xl text-gray-300 mb-8">
//                 {t('vehicles.pageSubtitle')}
//             </p>

//             {/* Quick Stats */}
//             <div className="flex flex-wrap gap-6">
//                 <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
//                         <Zap size={24} className="text-green-400" />
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-400">{t('vehicles.features.unlimitedMileage')}</p>
//                         <p className="font-semibold">{t('included.insurance.title')}</p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
//                         <ShieldCheck size={24} className="text-blue-400" />
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-400">{t('pricing.deposit')}</p>
//                         <p className="font-semibold">€{DEPOSIT_AMOUNT}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>