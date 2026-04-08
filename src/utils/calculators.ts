export const calculateDiscount = (price: number, discountPercentage: number = 0): number => {
    if (price < 0 || discountPercentage < 0) return 0;
    return Math.round(((price * discountPercentage) / 100) * 100) / 100;
};

export const calculateTax = (price: number, category: string): number => {
    if (price < 0) return 0;
    const taxRate = category.toLowerCase() === 'groceries' ? 3 : 4.75;
    return Math.round(((price * taxRate) / 100) * 100) / 100;
};
