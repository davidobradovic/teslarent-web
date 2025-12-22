import React, { useState } from "react";
import { User, Car, Shield, Wrench, Clock, Zap, ChevronDown, ChevronRight, Star, Phone, Mail, MapPin, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MainScreen = () => {
    const { t, i18n } = useTranslation();
    const [openFaq, setOpenFaq] = useState(null);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        { question: t('faq.q1'), answer: t('faq.a1') },
        { question: t('faq.q2'), answer: t('faq.a2') },
        { question: t('faq.q3'), answer: t('faq.a3') },
        { question: t('faq.q4'), answer: t('faq.a4') },
        { question: t('faq.q5'), answer: t('faq.a5') },
    ];

    const testimonials = [
        { name: t('testimonials.items.t1.name'), role: t('testimonials.items.t1.role'), text: t('testimonials.items.t1.text'), rating: 5 },
        { name: t('testimonials.items.t2.name'), role: t('testimonials.items.t2.role'), text: t('testimonials.items.t2.text'), rating: 5 },
        { name: t('testimonials.items.t3.name'), role: t('testimonials.items.t3.role'), text: t('testimonials.items.t3.text'), rating: 5 },
        { name: t('testimonials.items.t4.name'), role: t('testimonials.items.t4.role'), text: t('testimonials.items.t4.text'), rating: 5 },
    ];

    return (
        <div className="w-screen min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
                    * { font-family: 'Plus Jakarta Sans', sans-serif; }
                    .hero-gradient { background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); }
                    .btn-primary { background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%); transition: all 0.3s ease; }
                    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3); }
                    .card-hover { transition: all 0.3s ease; }
                    .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); }
                    .feature-icon { background: linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%); }
                    .section-blue { background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%); }
                    .glass-card { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); }
                    .text-gradient { background: linear-gradient(135deg, #0066FF 0%, #00AAFF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                    .lang-select { appearance: none; background: transparent; border: 1px solid #e5e7eb; border-radius: 6px; padding: 6px 24px 6px 10px; font-size: 14px; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; }
                `}
            </style>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={require('../assets/teslalogo.png')} style={{ height: 32 }} alt="Tesla Rent" />
                        </Link>
                        <nav className="hidden md:flex items-center gap-8">
                            <Link to="/vehicles" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">{t('header.vehicles')}</Link>
                            <Link to="/general-terms" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">{t('footer.linkFour')}</Link>
                            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">{t('header.howItWorks')}</a>
                            <a href="#faq" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">{t('header.faq')}</a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <select onChange={(e) => changeLanguage(e.target.value)} className="lang-select text-gray-600" value={i18n.language}>
                                <option value="en">EN</option>
                                <option value="de">DE</option>
                                <option value="sr">SR</option>
                            </select>
                            <Link to="/auth" className="p-2 text-gray-600 hover:text-gray-900 transition-colors"><User size={20} /></Link>
                            <Link to="/vehicles" className="btn-primary px-5 py-2.5 text-white text-sm font-semibold rounded-lg hidden sm:block">{t('hero.bookNow')}</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-gradient pt-28 pb-16 lg:pt-32 lg:pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-4">{t('hero.welcome')}</p>
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                {t('hero.title')}<br /><span className="text-gradient">{t('hero.titleHighlight')}</span>
                            </h1>
                            <div className="glass-card rounded-2xl p-6 shadow-xl mb-8 max-w-md">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-gray-500 text-sm">{t('hero.insuranceLabel')}</p>
                                        <p className="text-gray-900 font-semibold">{t('hero.insuranceValue')}</p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 pt-4 mb-4">
                                    <p className="text-gray-500 text-sm mb-1">{t('hero.priceFrom')}</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-gray-900">1600 RSD</span>
                                        <span className="text-gray-500">{t('hero.perDay')}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-600">{t('hero.unlimitedMileage')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-600">{t('hero.minAge')}</span>
                                    </div>
                                </div>
                                <Link to="/vehicles" className="btn-primary w-full py-4 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                                    {t('hero.bookNow')} <ChevronRight size={18} />
                                </Link>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <img src="https://cdn.shopify.com/s/files/1/0628/1281/5558/files/TeslaSiva.png?v=1714031520" alt="Tesla Model 3" className="w-full max-w-2xl mx-auto drop-shadow-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Daily Rental Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-4">{t('rental.subtitle')}</p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t('rental.title')}</h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <img src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600" alt="Happy driver" className="rounded-2xl shadow-2xl w-full" />
                        </div>
                        <div>
                            <div className="bg-blue-50 rounded-2xl p-8 mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('rental.featureTitle')}</h3>
                                <p className="text-gray-600 mb-4">{t('rental.featureDesc')} <span className="font-bold text-blue-600">1600 RSD {t('rental.perDay')}</span>.</p>
                            </div>
                            <ul className="space-y-4">
                                {[t('rental.benefits.insurance'), t('rental.benefits.registration'), t('rental.benefits.maintenance'), t('rental.benefits.flexible'), t('rental.benefits.delivery'), t('rental.benefits.support'), t('rental.benefits.replacement')].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"><Check size={12} className="text-white" /></div>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/vehicles" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl mt-8">
                                {t('rental.learnMore')} <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tesla Model 3 Feature Section */}
            <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t('model3.title')}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">{t('model3.description')} <span className="font-bold text-blue-600">1600 RSD {t('model3.perDay')}</span>.</p>
                    </div>
                    <div className="mb-12">
                        <p className="text-center text-gray-500 font-medium mb-8">{t('model3.whyChoose')}</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: <Zap size={24} />, title: t('model3.features.ownership.title'), desc: t('model3.features.ownership.desc') },
                                { icon: <Shield size={24} />, title: t('model3.features.technology.title'), desc: t('model3.features.technology.desc') },
                                { icon: <Car size={24} />, title: t('model3.features.eco.title'), desc: t('model3.features.eco.desc') },
                                { icon: <Star size={24} />, title: t('model3.features.performance.title'), desc: t('model3.features.performance.desc') },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-6 card-hover border border-gray-100">
                                    <div className="feature-icon w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4">{item.icon}</div>
                                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t('included.title')}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Shield size={32} />, title: t('included.insurance.title'), desc: t('included.insurance.desc') },
                            { icon: <Wrench size={32} />, title: t('included.maintenance.title'), desc: t('included.maintenance.desc') },
                            { icon: <Clock size={32} />, title: t('included.support.title'), desc: t('included.support.desc') },
                            { icon: <Car size={32} />, title: t('included.flexibility.title'), desc: t('included.flexibility.desc') },
                        ].map((item, idx) => (
                            <div key={idx} className="text-center">
                                <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">{item.icon}</div>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-4">{t('comparison.subtitle')}</p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t('comparison.title')}</h2>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900"></th>
                                    <th className="text-center py-4 px-6"><span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">{t('comparison.teslaRent')}</span></th>
                                    <th className="text-center py-4 px-6 text-gray-500 font-medium">{t('comparison.traditional')}</th>
                                    <th className="text-center py-4 px-6 text-gray-500 font-medium">{t('comparison.buying')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[t('comparison.features.noHiddenFees'), t('comparison.features.registrationIncluded'), t('comparison.features.maintenanceIncluded'), t('comparison.features.insuranceIncluded'), t('comparison.features.chargerIncluded'), t('comparison.features.flexibleDates')].map((feature, idx) => (
                                    <tr key={idx} className="border-b border-gray-100 last:border-0">
                                        <td className="py-4 px-6 text-gray-700">{feature}</td>
                                        <td className="py-4 px-6 text-center"><Check className="mx-auto text-blue-600" size={20} /></td>
                                        <td className="py-4 px-6 text-center"><X className="mx-auto text-red-400" size={20} /></td>
                                        <td className="py-4 px-6 text-center"><X className="mx-auto text-red-400" size={20} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="bg-gray-50 p-6 text-center">
                            <Link to="/vehicles" className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-xl">{t('hero.bookNow')} <ChevronRight size={18} /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="section-blue py-20 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
                        <div>
                            <p className="text-blue-400 font-semibold text-sm tracking-wide uppercase mb-2">{t('howItWorks.subtitle')}</p>
                            <h2 className="text-3xl lg:text-4xl font-bold">{t('howItWorks.title')}</h2>
                        </div>
                        <Link to="/vehicles" className="mt-4 lg:mt-0 text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2">{t('howItWorks.viewAll')} <ChevronRight size={18} /></Link>
                    </div>
                    <div className="bg-white/5 backdrop-blur rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-8">{t('howItWorks.chooseYourPlan')}</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { step: t('howItWorks.steps.step1.number'), title: t('howItWorks.steps.step1.title'), desc: t('howItWorks.steps.step1.desc') },
                                { step: t('howItWorks.steps.step2.number'), title: t('howItWorks.steps.step2.title'), desc: t('howItWorks.steps.step2.desc') },
                                { step: t('howItWorks.steps.step3.number'), title: t('howItWorks.steps.step3.title'), desc: t('howItWorks.steps.step3.desc') },
                            ].map((item, idx) => (
                                <div key={idx} className="relative">
                                    <span className="text-6xl font-bold text-white/10 absolute -top-4 -left-2">{item.step}</span>
                                    <div className="relative z-10 pt-8">
                                        <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t('faq.title')}</h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden">
                                <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between p-6 text-left">
                                    <span className="font-semibold text-gray-900">{faq.question}</span>
                                    <ChevronDown size={20} className={`text-gray-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === idx && <div className="px-6 pb-6"><p className="text-gray-600">{faq.answer}</p></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Test Drive CTA */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="relative rounded-3xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1617704548623-340376564e68?w=1200" alt="Tesla Interior" className="w-full h-96 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                            <div className="p-12">
                                <p className="text-blue-400 font-semibold text-sm tracking-wide uppercase mb-2">{t('testDrive.subtitle')}</p>
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('testDrive.title')}</h2>
                                <Link to="/vehicles" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl">{t('testDrive.button')} <ChevronRight size={18} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t('testimonials.title')}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {testimonials.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-2xl p-6 card-hover">
                                <p className="text-gray-600 text-sm mb-6 leading-relaxed">"{item.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><User size={18} className="text-blue-600" /></div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                                        <p className="text-gray-500 text-xs">{item.role}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mt-4">{[...Array(item.rating)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-2">{t('contact.subtitle')}</p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t('contact.title')}</h2>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <p className="text-gray-600 mb-6">{t('contact.formIntro')}</p>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <input type="text" placeholder={t('contact.firstName')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none transition-colors" />
                            <input type="text" placeholder={t('contact.lastName')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none transition-colors" />
                        </div>
                        <input type="email" placeholder={t('contact.email')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none transition-colors mb-4" />
                        <textarea placeholder={t('contact.message')} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none transition-colors mb-6 resize-none"></textarea>
                        <button className="btn-primary w-full py-4 text-white font-semibold rounded-xl flex items-center justify-center gap-2">{t('contact.submit')} <ChevronRight size={18} /></button>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-12 bg-blue-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t('newsletter.title')}</h3>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input type="email" placeholder={t('newsletter.placeholder')} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none transition-colors" />
                        <button className="btn-primary px-8 py-3 text-white font-semibold rounded-xl">{t('newsletter.button')}</button>
                    </div>
                </div>
            </section>

            {/* Data Protection Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-gray-50 rounded-2xl overflow-hidden">
                        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">{t('dataProtection.title')}</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dataProtection.serialNumber')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dataProtection.controllerName')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dataProtection.controllerAddress')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dataProtection.dpoName')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dataProtection.dpoEmail')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dataProtection.dpoPhone')}</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t('dataProtection.data.serialNumber')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t('dataProtection.data.controllerName')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t('dataProtection.data.controllerAddress')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t('dataProtection.data.dpoName')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600"><a href={`mailto:${t('dataProtection.data.dpoEmail')}`}>{t('dataProtection.data.dpoEmail')}</a></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600"><a href={`tel:${t('dataProtection.data.dpoPhone')}`}>{t('dataProtection.data.dpoPhone')}</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-1">
                            <img src={require('../assets/teslalogo.png')} style={{ height: 40, filter: 'brightness(0) invert(1)' }} alt="Tesla Rent" className="mb-6" />
                            <p className="text-gray-400 text-sm leading-relaxed">{t('footer.description')}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
                            <ul className="space-y-2">
                                <li><Link to="/vehicles" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.vehicles')}</Link></li>
                                <li><a href="#how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.howItWorks')}</a></li>
                                <li><a href="#faq" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.faqLink')}</a></li>
                                <li><Link to="/auth" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.login')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">{t('footer.information')}</h4>
                            <ul className="space-y-2">
                                <li><Link to="/terms-of-complaints" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkOne')}</Link></li>
                                <li><Link to="/payment-terms" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkTwo')}</Link></li>
                                <li><Link to="/payment-methods" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkThree')}</Link></li>
                                <li><Link to="/general-terms" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkFour')}</Link></li>
                                <li><Link to="/rights-to-withdraw" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkFive')}</Link></li>
                                <li><Link to="/protection-of-transaction" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.linkSix')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">{t('footer.contactTitle')}</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-400 text-sm"><MapPin size={16} className="flex-shrink-0" /><span>{t('footer.address')}</span></li>
                                <li className="flex items-center gap-3 text-gray-400 text-sm"><Phone size={16} className="flex-shrink-0" /><a href="tel:+381661212000" className="hover:text-white transition-colors">{t('footer.phone')}</a></li>
                                <li className="flex items-center gap-3 text-gray-400 text-sm"><Mail size={16} className="flex-shrink-0" /><a href="mailto:info@teslarent.rs" className="hover:text-white transition-colors">{t('footer.email')}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center">
                        <p className="text-gray-500 text-sm">{t('footer.copyright')}</p>
                        <p className="text-gray-600 text-xs mt-2">{t('footer.madeBy')} <a href="tel:+381661212000" className="hover:text-gray-400 transition-colors">David Obradović</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainScreen;