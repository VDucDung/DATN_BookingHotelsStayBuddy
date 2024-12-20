"use client";

import React from 'react';
import { BankOutlined } from '@ant-design/icons';
import { callApi } from '@/api/apiUtils';

const StripeConnect: React.FC = () => {
  const handleConnect = async () => {
    try {
      const response = await callApi('GET', `/stripe/get-dashboard-link`);
      const data = await response.data;
      window.open(data, '_blank');
    } catch (error) {
      console.error('Error connecting to Stripe:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center space-y-6 w-full">
          <div className="rounded-full bg-blue-50 p-4">
            <BankOutlined className="text-4xl text-blue-500" />
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 m-0">
            Connect with Stripe Dashboard
          </h3>
          
          <p className="text-gray-500 text-base text-center">
            {`Access your payment information, transactions, and account settings directly through Stripe's dashboard`}
          </p>
          
          <button 
            onClick={handleConnect}
            className="w-full bg-blue-500 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Open Stripe Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default StripeConnect;
