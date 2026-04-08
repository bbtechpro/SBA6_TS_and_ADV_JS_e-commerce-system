export const calculateDiscount = (price: number, discountPercentage: number = 0): number => {
  if (price < 0 || discountPercentage < 0) return 0;
  
  const discountAmount = (price * discountPercentage) / 100;
  
  // Returns the amount rounded to 2 decimal places for currency accuracy
  return Math.round(discountAmount * 100) / 100;
};
 