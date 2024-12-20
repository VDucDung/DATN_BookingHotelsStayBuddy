export const formatCurrency = (
  value: number, 
  currency: string = 'VND', 
  locale: string = 'vi-VN'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (
  value: number, 
  options: Intl.NumberFormatOptions = {}
): string => {
  const defaultOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  return new Intl.NumberFormat('vi-VN', {
    ...defaultOptions,
    ...options
  }).format(value);
};

export const formatPercentage = (
  value: number, 
  digits: number = 2
): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value / 100);
};
