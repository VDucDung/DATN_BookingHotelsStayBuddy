export interface SearchParams {
  keyword: string;
  location: string;
  startDate: string;
  endDate: string;
  totalRoom: string;
  capacity: string;
  address: string;
}

export interface FormValues {
  rating: number;
  displayOption: string;
  maxPrice: string;
  minPrice: string;
  displayOptions: Record<string, unknown>;
  price: string;
  search: string;
  address: string;
}

export interface FetchHotelParams {
  page: number;
  limit: number;
  sortBy: string;
  keyword: string;
  startDate: string;
  endDate: string;
  totalRoom: string;
  capacity: string;
  address: string;
}
