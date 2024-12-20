/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Oval } from '@agney/react-loading';
import { useRouter } from "next/navigation";
import { statistical } from '@/api/statisticalService';
import { EmailIcon, PasswordIcon, UserIcon } from '@/assets/icons';
import AppButton from '@/components/button/AppButton';
import { useClientTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/redux';
import { registerUser } from '@/api/authService';
export default function Register() {
  const { t } = useClientTranslation('Common');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector((state: any) => state.auth.loading);
  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);
  const passwordRegex = useMemo(() => /^(?=.*[@-_]).{8,}$/, []);
  const [fullname, setfullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<'text' | 'password'>('password');
  const [errors, setErrors] = useState<{ fullname: string; email: string; password: string }>({
    fullname: '',
    email: '',
    password: '',
  });
  const checkSubmit = useCallback(() => {
    setSubmit(!emailRegex.test(email) || !passwordRegex.test(password) || fullname === '' || email === '' || password === '');
  }, [emailRegex, passwordRegex, fullname, email, password]);
  const handleCheckfullname = useCallback(() => {
    if (!fullname || !fullname.trim()) {
      setErrors((prev) => ({ ...prev, fullname: t('errors.err05') }));
    } else {
      setErrors((prev) => ({ ...prev, fullname: '' }));
    }
  }, [fullname, t]);
  const handleChangeEmail = useCallback(() => {
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: t('errors.err02') }));
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: t('errors.err01') }));
    }
    if (emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
    checkSubmit();
  }, [email, checkSubmit, emailRegex, t]);
  const handleChangePassword = useCallback(() => {
    if (!passwordRegex.test(password)) {
      setErrors((prev) => ({ ...prev, password: t('errors.err04') }));
    }
    if (passwordRegex.test(password)) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: t('errors.err03') }));
    }
    checkSubmit();
  }, [password, checkSubmit, passwordRegex, t]);
  const handleShowPassword = () => {
    setShowPassword((prev) => (prev === 'password' ? 'text' : 'password'));
  };
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!fullname|| !email|| !password){
      toast.error('Vui lòng nhập đầy đủ thống tin');
      return;
    }
    dispatch(registerUser({ fullname, email, password }) as any).then((result: any) => {
      if (result.payload.statusCode === 201) {
        setTimeout(() => {
          router.push('/auth/login');
        }, 3500);
        toast.success(t('register.notify'));
      } else {
        toast.info(result.payload.message);
      }
    });
  };
  useEffect(() => {
    if (passwordRegex.test(password) && emailRegex.test(email) && fullname !== '') {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
    if (passwordRegex.test(password)) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  }, [password, passwordRegex, email, emailRegex, fullname]);
  useEffect(() => {
    dispatch(statistical() as any)
      .then((result: any) => {
        if (result.payload.code !== 200) {
          toast.error(result.payload.message);
        }
      })
      .catch((err:any) => {
        toast.error(err);
      });
  }, [dispatch]);
  return (
<div className="bg-white p-5 rounded-xl shadow-lg w-[450px] min-h-[100px] text-center mx-auto my-[200px]">
  <h1 className="text-4xl font-semibold mb-4">{t('register.heading')}</h1>
  <p className="text-xl text-gray-600">{t('register.desc01')}</p>
  <form onSubmit={handleRegister} className="mt-4">
    <div className="mb-4">
      <div className={`relative flex items-center border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} rounded-lg`}>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setfullname(e.target.value)}
          onBlur={handleCheckfullname}
          placeholder={t('form.tp03')}
          className="w-full p-4 border-none outline-none border rounded-lg"
          readOnly={loading}
        />
        <UserIcon className="absolute right-4 w-6 h-6" />
      </div>
      <p className="text-red-500 text-sm mt-1 text-start">{errors.fullname}</p>
    </div>
    <div className="mb-4">
      <div className={`relative border flex items-center ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleChangeEmail}
          placeholder={t('form.tp01')}
          className="w-full p-4 border-none outline-none rounded-lg"
          readOnly={loading}
        />
        <EmailIcon className="absolute right-4 w-6 h-6" />
      </div>
      <p className="text-red-500 text-sm mt-1 text-start">{errors.email}</p>
    </div>
    <div className="mb-4">
      <div className={`relative border flex items-center ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg`}>
        <input
          type={showPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleChangePassword}
          placeholder={t('form.tp02')}
          className="w-full p-4 border-none outline-none rounded-lg"
          readOnly={loading}
        />
        <PasswordIcon className="absolute right-4 w-6 h-6 text-slate-400" />
      </div>
      <p className="text-red-500 text-sm mt-1 text-start">{errors.password}</p>
    </div>
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id="show-password"
        className="mr-2"
        onChange={handleShowPassword}
      />
      <label htmlFor="show-password" className="text-gray-700">
        {t('form.lb01')}
      </label>
    </div>
    <AppButton
      className={`w-full bg-green-600 text-white py-3 rounded-lg ${submit || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
      disabled={submit || loading}
      leftIcon={loading && <Oval width="20" color="#fff" />}
    >
      {t('button.btn06')}
    </AppButton>
  </form>
  <p className="mt-4 text-gray-700">
    {t('register.desc02')}{' '}
    <Link href="/auth/login" className="text-green-600 hover:underline">
      {t('button.btn04')}
    </Link>
  </p>
</div>
  );
}
