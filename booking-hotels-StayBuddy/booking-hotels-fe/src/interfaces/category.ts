export interface CategoryProps {
  className?: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  statusCode: number | null;
  error: string | null;
}

export interface Category {
  id: string | number;
  name: string;
  image: string;
}

export interface GetCategoriesResponse{
  statusCode: number;
  message: string;
  data: Category[];
}
