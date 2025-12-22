// Pricing tiers based on rental duration
export const PRICING_TIERS = [
    { minDays: 1, maxDays: 3, pricePerDay: 100 },
    { minDays: 4, maxDays: 7, pricePerDay: 85 },
    { minDays: 8, maxDays: 15, pricePerDay: 75 },
    { minDays: 16, maxDays: 24, pricePerDay: 60 },
    { minDays: 25, maxDays: 29, pricePerDay: 50 },
    { minDays: 30, maxDays: Infinity, pricePerDay: 40 },
];

export const DEPOSIT_AMOUNT = 1000; // €1,000

/**
 * Get price per day based on rental duration
 * @param {number} days - Number of rental days
 * @returns {number} - Price per day in EUR
 */
export const getPricePerDay = (days) => {
    const tier = PRICING_TIERS.find(t => days >= t.minDays && days <= t.maxDays);
    return tier ? tier.pricePerDay : PRICING_TIERS[0].pricePerDay;
};

/**
 * Calculate total price for rental
 * @param {number} days - Number of rental days
 * @returns {object} - { pricePerDay, totalPrice, savings, savingsPercent }
 */
export const calculatePrice = (days) => {
    const pricePerDay = getPricePerDay(days);
    const totalPrice = pricePerDay * days;
    const fullPrice = PRICING_TIERS[0].pricePerDay * days;
    const savings = fullPrice - totalPrice;
    const savingsPercent = Math.round((savings / fullPrice) * 100);

    return {
        pricePerDay,
        totalPrice,
        savings,
        savingsPercent,
        deposit: DEPOSIT_AMOUNT
    };
};

/**
 * Get the current pricing tier label
 * @param {number} days - Number of rental days
 * @returns {string} - Tier label (e.g., "4-7 days")
 */
export const getPricingTierLabel = (days) => {
    if (days >= 1 && days <= 3) return '1-3';
    if (days >= 4 && days <= 7) return '4-7';
    if (days >= 8 && days <= 15) return '8-15';
    if (days >= 16 && days <= 24) return '16-24';
    if (days >= 25 && days <= 29) return '25-29';
    return '30+';
};