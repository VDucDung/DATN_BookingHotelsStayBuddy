export interface Utilities {
  id: string | number;
  name: string;
}

export interface TypeUtility {
  id: string | number;
  name: string;
  utilities: Utilities[];
}

export interface GetTypeUtiliesResponse{
  statusCode: number;
  message: string;
  data: TypeUtility[];
}

export interface TypeUtilitiesState {
  typeUtilities: TypeUtility[] | [];
  loading: boolean;
  statusCode: number | null;
  error: string | null;
  message: string;
}
