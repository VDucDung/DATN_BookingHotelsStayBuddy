import { ROLE_NAME } from "@/enum";
import { DetailResult } from "./detailResult";

export interface Role{
  id: number,
  name: ROLE_NAME,
}

export interface User {
  id: number;
  fullname?: string;
  email?: string;
  phone?: string;
  password?: string;
  avatar?: string;
  dateOfBirth?: Date;
  balance?: number;
  role?: Role;
  stripeAccountId?: string;
}
export interface UserState {
  users: User[];
  isUpdate: boolean;
  loading: boolean;
  error: string | null;
  message: string;
  status: string | null;
}

export interface GetUsersResponse {
  data: {
    users: User[];
    detailResult: DetailResult;
  };
  statusCode: number;
  message: string;
}

export interface GetUserResponse {
  data: {
    user: User;
    detailResult: DetailResult;
  };
  statusCode: number;
  message: string;
}

export interface ChangePasswordValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}
