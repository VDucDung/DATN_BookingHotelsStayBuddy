"use client";
import AppButton from '@/components/button/AppButton';
import React from 'react';

const CheckEmail = () => {
  return (
    <div className="max-w-md mx-auto mt-[155px] p-6">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Kiểm tra hộp thư của bạn
        </h1>
        
        <p className="text-sm text-gray-700 text-center">
          Chúng tôi đã gửi bạn hướng dẫn và đường link cài lại mật khẩu đến{' '}
          <span className="font-medium">v*********@g*****.com</span>.
          {' '}Email này có thể mất vài phút để đến hộp thư.
        </p>

        <AppButton 
          className="w-full bg-[#00ba51] text-white hover:bg-green-50"
        >
          Quay lại bước đăng nhập
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

export default CheckEmail;
