/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { verifyOtpForgotPassword } from '@/api/authService';
import { statistical } from '@/api/statisticalService';
import AppButton from '@/components/button/AppButton';
import { PATH } from '@/configs';
import { useClientTranslation } from '@/i18n/client';
import { AppDispatch, useAppSelector } from '@/redux';
import { useRouter } from 'next/navigation';
import { createRef, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const ForgotPasswordOTP: React.FC = () => {
  const { t } = useClientTranslation('Common');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {loading} = useAppSelector((state) => state.auth);

  const [button, setButton] = useState(t('button.btn09'));
  const [submit, setSubmit] = useState(false);
  const [inputs, setInputs] = useState(Array(6).fill(''));

  const inputRefs = useRef(
    Array(6)
      .fill(0)
      .map(() => createRef<HTMLInputElement>()),
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index === 5 && !inputs[index]) {
      setInputs(Array(6).fill(''));
      inputRefs.current[0]?.current?.focus();
    } else if (e.key === 'Backspace' && index > 0 && !inputs[index]) {
      inputRefs.current[index - 1]?.current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    const pasteArray = pasteData.split('');
    setInputs(pasteArray);
    inputRefs.current[5]?.current?.focus();
    setSubmit(pasteArray.length === 6);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    const newInputs = [...inputs];
    newInputs[index] = numericValue.slice(0, 1);
    setInputs(newInputs);

    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.current?.focus();
    }

    setSubmit(newInputs.every((input) => input !== ''));
  };

  const handleForgotPasswordOTP = () => {
    const token = JSON.parse(sessionStorage.getItem('tokenForgot') as string);
    const code = inputs.join('');
    dispatch(verifyOtpForgotPassword({ token, otp: code })).then((result: any) => {
      if (result.payload.statusCode === 200) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem('tokenVerifyOTP', JSON.stringify(result.payload.data));
        }
        router.push(PATH.RESET_PASSWORD);
      } else {
        toast.error(result.payload.message);
        setInputs(Array(6).fill(''));
        setSubmit(false);
        setButton(t('button.btn09'));
      }
    });
  };

  useEffect(() => {
    dispatch(statistical())
      .then((result: any) => {
        if (result.payload.code !== 200) {
          toast.error(result.payload.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [dispatch]);

  return (
    <div className="p-6 w-[450px] min-h-[100px] text-center self-center rounded-lg bg-white shadow-md z-[999] mx-auto mt-48">
      <h1 className="text-4xl font-semibold">{t('verify-otp.heading')}</h1>
      <p className="mt-2 text-xl text-gray-500">{t('verify-otp.heading')}</p>

      <form
        className="flex flex-col items-center mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          setButton(t('button.btn10'));
        }}
      >
        <div className="flex justify-center gap-2">
          {inputs.map((value, index) => (
            <input
              key={index}
              ref={inputRefs.current[index]}
              value={value}
              onPaste={handlePaste}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              type="text"
              inputMode="numeric"
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          ))}
        </div>

        <div className={`mt-8 ${submit ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
          <AppButton 
            success
            auth
            disabled={!submit || loading}
            onClick={handleForgotPasswordOTP}
          >
            {button}
          </AppButton>
        </div>
      </form>

      <p className="mt-6 text-base">{t('verify-otp.desc01')}</p>
    </div>
  );
};

export default ForgotPasswordOTP;
