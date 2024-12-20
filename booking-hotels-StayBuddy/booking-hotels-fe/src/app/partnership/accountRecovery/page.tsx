"use client";
import AppButton from '@/components/button/AppButton';
import { Input } from 'antd';
import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="max-w-md mx-auto mt-[155px] p-6">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Quên mật khẩu?
        </h1>
        
        <p className="text-sm text-gray-700">
          Vui lòng xác nhận tên đăng nhập và chúng tôi sẽ gửi bạn đường dẫn để cài lại mật khẩu.
        </p>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tên đăng nhập <span className="text-red-500">*</span>
          </label>
          <Input 
            type="email"
            defaultValue="vuducdung24022003@gmail.com"
            className="w-full"
          />
        </div>

        <AppButton href='accountRecovery/confirmation' className="w-full bg-[#00ba51] hover:bg-green-700 text-white">
          Gửi link tạo lại mật khẩu
        </AppButton>

        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>
            Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">Điều khoản và Điều kiện</a>
            {' '}cũng như{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">Chính sách An toàn và Bảo mật</a>
            {' '}của chúng tôi
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
