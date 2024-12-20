/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PATH } from '@/configs';
import { addOrUpdateFieldInLocalStorage, getLocalStorageItem, hostname } from '@/utils';
import axios, { 
  AxiosError, 
  AxiosInstance, 
  InternalAxiosRequestConfig 
} from 'axios';

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  statusCode?: number;
  code?: number;
  url?: string;
}

interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors: any[];
}

interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const UNAUTHORIZED_MESSAGES = [
  'jwt expired',
  'jwt malformed',
  'invalid token',
  'token invalid',
  'invalid signature',
  'jwt hết hạn',
  'token expired',
  'token đã hết hạn',
  'unauthorized',
  'Unauthorized'
];

const handleLogout = (): void => {
  if (typeof window !== "undefined") {
    // localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    if (!window.location.pathname.includes(PATH.LOGIN)) {
      localStorage.setItem('returnUrl', window.location.pathname);
      window.location.href = PATH.LOGIN;
    }
  }
};

const isTokenError = (error: AxiosError<ApiErrorResponse>): boolean => {
  const errorData = error.response?.data;
  
  if (!errorData) return false;

  const { statusCode, message } = errorData;

  if (statusCode === 401) {
    return UNAUTHORIZED_MESSAGES.some(msg => 
      message?.toLowerCase().includes(msg.toLowerCase())
    );
  }

  return false;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${hostname}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing: boolean = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null): void => {
  failedQueue.forEach((promise: QueueItem) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

const clearAuthData = (): void => {
  isRefreshing = false;
  failedQueue = [];
  delete axiosInstance.defaults.headers.common['Authorization'];
};

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = getLocalStorageItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: any): any => {
    
    if(response.data?.statusCode === 401) {
      clearAuthData();
      handleLogout();
    }
    return { 
      ...response.data, 
      url: response.config.url,
      success: true 
    };
  },
  async (error: AxiosError<ApiErrorResponse>): Promise<ApiResponse> => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      error.response?.data?.statusCode === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('auth/refresh-tokens')
    ) {
      if (isTokenError(error)) {
        const refreshToken = getLocalStorageItem('refreshToken');
        
        if (!refreshToken) {
          clearAuthData();
          handleLogout();
          return Promise.reject({
            success: false,
            message: 'Authentication required',
            statusCode: 401,
            errors: []
          });
        }

        if (isRefreshing) {
          try {
            const token = await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });

            originalRequest.headers.Authorization = `Bearer ${token}`;
            const retryResponse = await axiosInstance(originalRequest);
            return { ...retryResponse, success: true };
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (err) {
            clearAuthData();
            handleLogout();
            return Promise.reject({
              success: false,
              message: error.response?.data?.message || 'Authentication failed',
              statusCode: 401,
              errors: error.response?.data?.errors || []
            });
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await axiosInstance.post<RefreshTokenResponse>('auth/refresh-tokens', {
            refreshToken: refreshToken
          });

          const newAccessToken = response.data.accessToken;
          
          if (!newAccessToken) {
            throw new Error('Failed to refresh token');
          }

          addOrUpdateFieldInLocalStorage(null, 'accessToken', newAccessToken);
          if (response.data.refreshToken) {
            addOrUpdateFieldInLocalStorage(null, 'refreshToken', response.data.refreshToken);
          }
          
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          processQueue(null, newAccessToken);
          
          const retryResponse = await axiosInstance(originalRequest);
          return { ...retryResponse, success: true };
        } catch (refreshError) {
          processQueue(refreshError as Error, null);
          clearAuthData();
          handleLogout();
          return Promise.reject({
            success: false,
            message: error.response?.data?.message || 'Authentication failed',
            statusCode: 401,
            errors: error.response?.data?.errors || []
          });
        } finally {
          isRefreshing = false;
        }
      } else {
        clearAuthData();
        handleLogout();
        return Promise.reject({
          success: false,
          message: error.response?.data?.message || 'Authentication required',
          statusCode: 401,
          errors: error.response?.data?.errors || []
        });
      }
    }

    if (error.response?.data) {
      const { statusCode, message, errors } = error.response.data;
      return Promise.reject({
        success: false,
        message: message,
        statusCode: statusCode,
        errors: errors || [],
        url: error.config?.url
      });
    }
    
    return Promise.reject({
      success: false,
      message: 'Network error',
      statusCode: 0,
      errors: []
    });
  }
);

export default axiosInstance;
