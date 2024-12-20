/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/stripe-connect.tsx
"use client";
import { callApi } from '@/api/apiUtils';
import React, { useState } from 'react';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const CreateStripeAccountPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();


  const handleCreateStripeAccount = async () => {
    setIsLoading(true);
    try {
      const customHeaders = {
        "accept-language": `${Cookies.get("lang") || "vi"}`,
      };

      const res = await callApi(
        "POST",
        "/stripe/create-stripe-account",
        null,
        { },
        customHeaders
      );

      if(res?.data?.accountStatus){
        const result = await callApi(
          "POST",
          "/stripe/account-link",
          null,
          { },
          customHeaders
        );
        const {url} = result.data;
        if(url){
          router.push(url);
        }
      }
      const { onboardingUrl } = await res.data;
      if (onboardingUrl) {
        router.push(onboardingUrl);
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Kết nối tài khoản Stripe
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Để nhận thanh toán từ hệ thống, bạn cần kết nối tài khoản Stripe. 
          Sau khi kết nối, bạn có thể nhận tiền trực tiếp qua tài khoản Stripe của mình.
        </p>
        <button
          onClick={handleCreateStripeAccount}
          disabled={isLoading}
          className={`w-full py-2 px-4 text-white font-medium rounded-lg 
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
            transition-colors duration-200
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </span>
          ) : (
            'Kết nối Stripe'
          )}
        </button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center text-sm">
              {error}
            </p>
            <button
              onClick={() => {
                setError(null);
                handleCreateStripeAccount();
              }}
              className="mt-2 w-full py-2 px-4 text-indigo-600 text-sm font-medium rounded-lg 
                border border-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
            >
              Thử lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStripeAccountPage;
