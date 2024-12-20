/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useClientTranslation } from '@/i18n/client';
import { registerPartner } from '@/api/authService';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/redux';

const PasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const router = useRouter();
  const { t } = useClientTranslation("Common");
  const dispatch = useAppDispatch();


  const validateForm = (): boolean => {

    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password.trim()) {
      newErrors.password = `${t("errors.err03")}`;
    } else if (password.length < 6) {
      newErrors.password = `${t("errors.err04")}`;
    } else if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
      newErrors.password = `${t("errors.err04")}`;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = `${t("errors.err07")}`;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = `${t("errors.err12")}`;;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const email = sessionStorage.getItem("userEmail");
      const contactForm = sessionStorage.getItem("contactFormData");
      if(contactForm && email){
        const {fullname, phone} = JSON.parse(contactForm);

        dispatch(registerPartner({ fullname, phone,  email, password }) as any).then((result: any) => {
          if (result.payload.statusCode === 201) {
            setTimeout(() => {
              router.push('verify'); 
            }, 3500);
            toast.success(t('register.notify'));
          } else {
            toast.info(result.payload.message);
          }
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-[155px] p-6">
      <h1 className="text-2xl font-semibold mb-2">{t("partnership.password.title01")}</h1>

      <p className="text-gray-600 mb-6">
      {t("partnership.password.title02")}
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm mb-2">
          {t("partnership.password.title03")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full px-3 py-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'
              } pr-10`}
              placeholder={t("partnership.password.title04")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm mb-2">
          {t("partnership.password.title05")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full px-3 py-2 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-blue-500'
              } pr-10`}
              placeholder={t("partnership.password.title06")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors mt-6"
        >
         {t("partnership.password.title07")}
        </button>

        <p className="text-sm text-gray-600 text-center">
        {t("partnership.password.title08")}{' '}
          <a href="#" className="text-blue-500 hover:underline">
          {t("partnership.password.title09")}
          </a>{' '}
          {t("partnership.password.title10")}{' '}
          <a href="#" className="text-blue-500 hover:underline">
          {t("partnership.password.title11")}
          </a>{' '}
          {t("partnership.password.title12")}
        </p>

      </form>
    </div>
  );
};

export default PasswordForm;
