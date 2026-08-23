export function formatPrice(amount: number, currency: string = 'PKR'): string {
  if (currency === 'PKR') {
    return `PKR ${Math.round(amount).toLocaleString('en-PK')}`;
  }
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`;
  }
  return `${currency} ${Math.round(amount).toLocaleString()}`;
}

export function formatPriceShort(amount: number, currency: string = 'PKR'): string {
  if (currency === 'PKR') {
    return `Rs ${Math.round(amount).toLocaleString('en-PK')}`;
  }
  return formatPrice(amount, currency);
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `HS-${year}-${random}`;
}
