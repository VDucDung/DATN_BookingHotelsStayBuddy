export function formatDate(input: Date | string | number): string {
  try {
    const date = input instanceof Date ? input : new Date(input);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

export const formatDateBooking = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long", 
    day: "2-digit",  
    month: "2-digit", 
    year: "numeric",  
  }).format(date);
};
