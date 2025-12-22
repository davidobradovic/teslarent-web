import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Shield, Clock, CreditCard, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
    const { t } = useTranslation();

    const pricingTiers = [
        { key: 'tier1', days: '1-3', price: 100, popular: false },
        { key: 'tier2', days: '4-7', price: 85, popular: false },
        { key: 'tier3', days: '8-15', price: 75, popular: true },
        { key: 'tier4', days: '16-24', price: 60, popular: false },
        { key: 'tier5', days: '25-29', price: 50, popular: false },
        { key: 'tier6', days: '30+', price: 40, popular: false },
    ];

    return (
        <section className="py-20 bg-white" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .pricing-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 24px; transition: all 0.3s ease; }
        .pricing-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .pricing-card.popular { border: 2px solid #171a20; position: relative; }
        .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #171a20; color: #fff; padding: 4px 16px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .deposit-card { background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; }
        .requirement-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        .requirement-item:last-child { border-bottom: none; }
      `}</style>

            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-4">
                        {t('pricing.title')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('pricing.subtitle')}</h2>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <Check size={16} /> {t('pricing.saveBadge')}
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                    {pricingTiers.map((tier) => (
                        <div key={tier.key} className={`pricing-card text-center ${tier.popular ? 'popular' : ''}`}>
                            {tier.popular && <span className="popular-badge">{t('pricing.popular')}</span>}
                            <p className="text-sm text-gray-500 mb-2">{t(`pricing.tiers.${tier.key}.days`)}</p>
                            <p className="text-3xl font-bold text-gray-900">€{tier.price}</p>
                            <p className="text-sm text-gray-500">{t(`pricing.tiers.${tier.key}.perDay`)}</p>
                        </div>
                    ))}
                </div>

                {/* Deposit & Requirements */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* Deposit Card */}
                    <div className="deposit-card">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <CreditCard size={24} className="text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{t('pricing.deposit')}</h3>
                                <p className="text-2xl font-bold text-gray-900">{t('pricing.depositAmount')}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">{t('pricing.depositNote')}</p>
                    </div>

                    {/* Requirements Card */}
                    <div className="deposit-card">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <Shield size={24} className="text-amber-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{t('pricing.requirements')}</h3>
                        </div>
                        <div className="requirement-item">
                            <Check size={18} className="text-green-500" />
                            <span className="text-gray-700">{t('pricing.requirementAge')}</span>
                        </div>
                        <div className="requirement-item">
                            <Check size={18} className="text-green-500" />
                            <span className="text-gray-700">{t('pricing.requirementLicense')}</span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        to="/vehicles"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl transition-all"
                    >
                        {t('howItWorks.viewAll')} <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;