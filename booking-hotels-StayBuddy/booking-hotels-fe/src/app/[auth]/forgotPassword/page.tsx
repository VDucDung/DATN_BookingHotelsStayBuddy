/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from 'next/link';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { EmailIcon } from "@/assets/icons";
import AppButton from "@/components/button/AppButton";
import { PATH } from "@/configs";
import { forgotPassword } from "@/api/authService";
import { useRouter } from "next/navigation";
import { useClientTranslation } from "@/i18n/client";
import { AppDispatch } from "@/redux";
function ForgotPassword() {
  const { t } = useClientTranslation('Common');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);
  const [email, setEmail] = useState("");
  const [button, setButton] = useState(t("button.btn07"));
  const [submit, setSubmit] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [errors, setErrors] = useState({ email: ""});

  const handleForgotPassword = () => {
    if(!email || submit){
      toast.warning('Vui lòng nhập email');
      return;
    }
    
    dispatch(forgotPassword(email) as any)
      .then((result: any) => {
        setSubmit(false);
        setButton(t("button.btn07"));

        if (result.payload.statusCode === 200) {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("tokenForgot", JSON.stringify(result.payload.data));
          }

          router.push(PATH.FORGOT_PASSWORD_OTP);
        } else if (result.payload.statusCode === 400) {
          toast.error(result.payload.message);
        }
      }) 
      .catch(() => {
        setSubmit(false);
        setButton(t("button.btn07"));
      });
  };

  useEffect(() => {
    setSubmit(!emailRegex.test(email) || email === "");
  }, [emailRegex, email]);

  useEffect(() => {
    if (touchedEmail) {
      if (!emailRegex.test(email)) {
        setErrors((prev) => ({ ...prev, email: t("errors.err02") }));
      }
      if (email === "") {
        setErrors((prev) => ({ ...prev, email: t("errors.err01") }));
      }
      if (emailRegex.test(email)) {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, touchedEmail]);

  return (
    <div className="flex flex-col items-center justify-center p-5 w-full max-w-md mx-auto bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-lg z-50 my-48">
      <h1 className="text-4xl font-semibold leading-snug md:text-3xl text-center">{t("forgot-password.heading")}</h1>
      <p className="mt-2 text-lg font-medium text-gray-500 md:text-base text-center">{t("forgot-password.desc01")}</p>

      <form
        className="w-full mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleForgotPassword();
          setButton(t("button.btn08"));
        }}
      >
        <div className="mb-4">
          <div className={`relative p-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setTouchedEmail(true);
              }}
              onBlur={() => setTouchedEmail(true)}
              placeholder={t("form.tp01")}
              className="w-full pl-2 py-2 border-none focus:outline-none focus:ring-0"
            />
            <EmailIcon className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${errors.email ? "text-red-500" : "text-gray-400"}`} />
          </div>
          {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className={`mt-6 ${submit ? "cursor-not-allowed" : ""}`}>
          <AppButton success auth disabled={submit} className="w-full">
            {button}
          </AppButton>
        </div>
      </form>

      <p className="mt-8 text-base font-normal text-gray-600">
        {t("forgot-password.desc02")}
        <Link className="ml-2 text-blue-500 hover:underline" href={PATH.LOGIN}>
          {t("button.btn04")}
        </Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
