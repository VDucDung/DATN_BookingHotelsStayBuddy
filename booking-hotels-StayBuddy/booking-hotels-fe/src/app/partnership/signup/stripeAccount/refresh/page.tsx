"use client";

import React from 'react';

const RefreshPage: React.FC = () => {
  const handleRetry = () => {
    window.location.href = '/stripeAccount'; 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-yellow-500 mx-auto mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m0-4h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Cần làm mới kết nối!
        </h1>
        <p className="text-gray-600 mb-6">
          Có vẻ như có sự cố khi kết nối tài khoản Stripe. Vui lòng thử lại để hoàn tất quy trình.
        </p>
        <button
          onClick={handleRetry}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
};

export default RefreshPage;
