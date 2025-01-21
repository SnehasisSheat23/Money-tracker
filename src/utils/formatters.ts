import exp from "constants";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'inr',
    signDisplay: 'always'
  }).format(amount);
};
export const moneySign = (amount?: number | string): string => {
  if (amount === undefined) return '₹';
  return '₹' + (typeof amount === 'number' ? amount.toString() : amount);
};
