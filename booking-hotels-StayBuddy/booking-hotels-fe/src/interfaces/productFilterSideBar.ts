import { FormikProps } from "formik";

export interface Category {
  label: string;
  image: string;
}

export interface Adress {
  name: string;
  code: string;
}

export interface ProductFilterSideBarProps {
  values: {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: number | null;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: FormikProps<any>['setFieldValue'];
  categoryList: Category[];
  addressList: Adress[];
}
