/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useClientTranslation } from "@/i18n/client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux";
import { toast } from "react-toastify";
import { loginUser } from "@/api/authService";
import Loading from "@/components/loading";

const PasswordForm = () => {
  const { t } = useClientTranslation("Common");
  const [email, setEmail] = useState<string | null>(null);
  

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string }>({});
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("loginEmail");
    setEmail(storedEmail);
  }, []);

  if (!email) {
    return <Loading className="container mx-auto"></Loading>; 
  }

  const validateForm = (): boolean => {
    const newErrors: { password?: string } = {};

    if (!password.trim()) {
      newErrors.password = t("errors.err03"); 
    } else if (password.length < 10) {
      newErrors.password = t("errors.err04"); 
    } else if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
      newErrors.password = t("errors.err04");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (email) {
        try {
          const result: any = await dispatch(
            loginUser({ email, password }) as any
          );
          if (result.payload.statusCode === 200) {
            toast.success(t("login.notify01")); 
            router.push("/dashboard");
          } else {
            toast.error(result.payload.message || t("errors.unknownError"));
          }
        } catch (error: any) {
          toast.error(t("errors.serverError")); 
          console.log(error);
        }
      } else {
        toast.error(t("errors.emailNotFound"));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-[155px] p-6">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("partnership.signin.password.title01")}
        </h1>

        <div className="space-y-1">
          <p className="text-sm text-gray-700">
            {t("partnership.signin.password.title02")}
          </p>
          <p className="text-sm font-semibold text-gray-900">{email}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-2">
              {t("partnership.password.title03")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${
                  errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
                } pr-10`}
                placeholder={t("partnership.password.title04")}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateForm();
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={
                  showPassword
                    ? t("partnership.password.hidePassword")
                    : t("partnership.password.showPassword")
                }
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#00ba51] hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {t("partnership.signin.password.title05")}
          </button>
        </form>

        <div className="text-center">
          <Link
            href="accountRecovery"
            className="text-[#00ba51] hover:text-green-700 text-sm"
          >
            {t("partnership.signin.password.title06")}
          </Link>
        </div>

        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>{t("partnership.signin.password.title07")}</p>
          <p>
            <a
              href="#"
              className="text-green-600 hover:text-green-700"
            >
              {t("partnership.signin.password.title08")}
            </a>{" "}
            {t("partnership.signin.password.title09")}{" "}
            <a
              href="#"
              className="text-green-600 hover:text-green-700"
            >
              {t("partnership.signin.password.title10")}
            </a>{" "}
            {t("partnership.signin.password.title11")}
          </p>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>{t("partnership.signin.password.title12")}</p>
          <p>{t("partnership.signin.password.title13")}</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
