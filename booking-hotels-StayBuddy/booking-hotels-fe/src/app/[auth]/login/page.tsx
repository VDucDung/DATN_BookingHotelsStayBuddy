/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useEffect, useMemo, useState, ChangeEvent } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Oval } from "@agney/react-loading";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { EmailIcon, GoogleIcon, PasswordIcon } from "@/assets/icons";
import { useAppSelector } from "@/redux/store";
import { PATH } from "@/configs";
import AppButton from "@/components/button/AppButton";
import { loginGoogle, loginUser } from "@/api/authService";
import { loginWithGoogle } from "@/api/loginWithGoogleService";
import { useRouter } from "next/navigation";
import { statistical } from "@/api/statisticalService";
import { useClientTranslation } from "@/i18n/client";
import { LoginForm } from "@/interfaces";

export default function Login() {
  const { t } = useClientTranslation('Common');
  const router = useRouter();
  const dispatch = useDispatch();
  const {loading, isLogin} = useAppSelector((state) => state.auth);
  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);
  const passwordRegex = useMemo(() => /^(?=.*[@-_]).{8,}$/, []);
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginForm>({ email: "", password: "" });
  const [submit, setSubmit] = useState(true);
  const [showPassword, setShowPassword] = useState("password");
  const checkSubmit = useCallback(() => {
    const isFormValid = emailRegex.test(loginForm.email) && passwordRegex.test(loginForm.password);
    setSubmit(!isFormValid || loginForm.email === "" || loginForm.password === "");
  }, [loginForm, emailRegex, passwordRegex]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    checkSubmit();
  };
  const validateFields = () => {
    const emailValid = emailRegex.test(loginForm.email);
    const passwordValid = passwordRegex.test(loginForm.password);
    if (!emailValid) {
      setErrors((prevErrors) => ({ ...prevErrors, email: t("errors.err02") }));
    }
    if (!passwordValid) {
      setErrors((prevErrors) => ({ ...prevErrors, password: t("errors.err04") }));
    }
    return emailValid && passwordValid;
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(!loginForm.email || !loginForm.password){
      toast.warning(t("login.notify05"));
      return;
    }

    if (!validateFields()) {
      toast.warning(t("login.notify04"));
      return;
    };
   
    const token = localStorage.getItem("accessToken");
    
    if (token && isLogin) {
        toast.warning(t("login.notify03"));
        router.push("/");
    }
    dispatch(loginUser(loginForm) as any).then((result: any) => {
      if (result.payload.statusCode === 200) {
        toast.success(t("login.notify01"));
        router.push("/");
      } else {
        toast.error(result.payload.message || t("system.error"));
      }
    });
  };
  const loginWithGoogleHandler = useGoogleLogin({
    onSuccess: async (response: any) => {
      const access_token = response.access_token;
      dispatch(loginWithGoogle({ access_token }) as any).then((result: any) => {
        if (result.payload.accessToken) {
          if(typeof window !== 'undefined'){
            const email = result.payload.data.email;
            const name = result.payload.data.name;
            const avatar = result.payload.data.picture;
            const providerId = result.payload.data.sub;
            dispatch(loginGoogle({ email, name, avatar, provider: "google", providerId  }) as any).then((result: any) => {
              if (result.payload.statusCode === 200) {
                toast.success(t("login.notify01"));
                window.location.href = "/";
              }else{
                toast.error(result.payload.message || t("system.error"));
              }
            });
          }
        } else {
          toast.error(result.payload.statusText || t("system.error"));
        }
      });
    },
  });
  useEffect(() => {
    checkSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginForm.email, loginForm.password]);
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
    <div className="p-5 w-[450px] min-h-[100px] text-center self-center rounded-[12px] bg-white shadow-lg z-10 container mx-auto my-[200px]">
      <h1 className="text-[2.5rem] font-bold">{t("login.heading")}</h1>
      <p className="mt-2 text-[1.5rem] font-medium text-gray-600">{t("login.desc01")}</p>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className={`relative flex items-center ${errors.email ? "border border-red-500" : ""}`}>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              readOnly={loading}
              onChange={handleChange}
              placeholder={t("form.tp01")}
              className="w-full p-4 text-base border rounded-lg focus:outline-none"
            />
            <EmailIcon className={`absolute right-4 ${errors.email ? "text-red-500" : ""}`} />
          </div>
          <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
        </div>
        <div className="mb-6">
          <div className={`relative flex items-center ${errors.password ? "border border-red-500" : ""}`}>
            <input
              type={showPassword}
              name="password"
              value={loginForm.password}
              readOnly={loading}
              onChange={handleChange}
              placeholder={t("form.tp02")}
              className="w-full p-4 text-base border rounded-lg focus:outline-none"
            />
            <PasswordIcon className={`absolute right-4 fill-white text-[#94a3b8] ${errors.password ? "text-red-500" : ""}`} />
          </div>
          <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" onChange={() => setShowPassword(showPassword === "password" ? "text" : "password")} />
            <span>{t("form.lb01")}</span>
          </label>
          <Link className="text-[#00ba51]" href={PATH.FORGOT_PASSWORD}>
            {t("forgot-password.heading")}
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <AppButton success auth disabled={submit || loading} leftIcon={loading && <Oval width="20" color="#fff" />} className="py-3 rounded-full">
            {t("button.btn04")}
          </AppButton>
        </div>
      </form>
      <div className="flex flex-col gap-4 mt-3">
      <AppButton onClick={() => loginWithGoogleHandler()} authGoogle leftIcon={<GoogleIcon className={"w-6 h-6"} />} className="py-3 rounded-full flex justify-center">
          {t("button.btn05")}
      </AppButton>
      </div>
      <p className="mt-6">
        {t("login.desc02")}{" "}
        <Link className="text-[#00ba51]" href={PATH.REGISTER}>
          {t("button.btn06")}
        </Link>
      </p>
    </div>
  );
}
