export const calculateDiscount = (price, discountPercentage = 0) => {
    if (price < 0 || discountPercentage < 0)
        return 0;
    return Math.round(((price * discountPercentage) / 100) * 100) / 100;
};
export const calculateTax = (price, category) => {
    if (price < 0)
        return 0;
    const taxRate = category.toLowerCase() === 'groceries' ? 3 : 4.75;
    return Math.round(((price * taxRate) / 100) * 100) / 100;
};
//# sourceMappingURL=calculators.js.map