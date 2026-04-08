/**
 * Calculates the tax amount for a product based on its category.
 * @param price - The price of the product (usually after discounts).
 * @param category - The product category to determine the specific rate.
 * @returns The calculated tax amount in dollars.
 */
export const calculateTax = (price: number, category: string): number => {
  if (price < 0) return 0;

  // Groceries get a reduced rate of 3%, all other categories get 4.75%
  const taxRate = category.toLowerCase() === 'groceries' ? 3 : 4.75;
  
  const taxAmount = (price * taxRate) / 100;

  // Returns the amount rounded to 2 decimal places
  return Math.round(taxAmount * 100) / 100;
};
Updated displayDetails() implementaion:
displayDetails(): void {
    const discountAmount = calculateDiscount(this.price, this.discountPercentage);
    const priceAfterDiscount = this.price - discountAmount;
    const taxAmount = calculateTax(priceAfterDiscount, this.category);
    const finalTotal = priceAfterDiscount + taxAmount;

    console.log(`--- ${this.title} ---`);
    console.log(`Subtotal: $${priceAfterDiscount.toFixed(2)}`);
    console.log(`Tax (${this.category}): $${taxAmount.toFixed(2)}`);
    console.log(`Total: $${finalTotal.toFixed(2)}`);
}