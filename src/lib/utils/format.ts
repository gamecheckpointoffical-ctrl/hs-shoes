export function formatPrice(price: number, currency: string = 'USD'): string {
  const symbols: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', PKR: 'Rs ' };
  const symbol = symbols[currency] || '$';
  return `${symbol}${price.toFixed(2)}`;
}

export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `HS-${year}-${random}`;
}
