"use client";

import React from 'react';

const SuccessPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500 mx-auto mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m0 0a9 9 0 11-4 4 9 9 0 01-4-4z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Tài khoản Stripe đã được kết nối thành công!
        </h1>
        <p className="text-gray-600 mb-6">
          Bạn đã hoàn tất việc kết nối tài khoản Stripe. Giờ đây, bạn có thể nhận thanh toán từ hệ thống một cách dễ dàng.
        </p>
        <a
          href="/dashboard"
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Trở về trang quản lý
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
