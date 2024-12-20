"use client";

import { useClientTranslation } from "@/i18n/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupForm = () => {
  const { t } = useClientTranslation("Common");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail()) {
      setIsValidEmail(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem('userEmail', email);
      }
      router.push("signup/contact");
    } else {
      setIsValidEmail(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-[155px] p-6 ">
      <h1 className="text-2xl font-semibold mb-2">{t("partnership.signup.title01")}</h1>
      <p className="text-gray-600 mb-6">{t("partnership.signup.title02")}</p>

      <div className="space-y-8">
        <div>
          <label className="block text-sm mb-3">{t("partnership.signup.title03")}</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {!isValidEmail && (
            <p className="text-red-500 text-sm mt-2">{t("partnership.signup.invalidEmail")}</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="w-full mt-3 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            {t("partnership.signup.title04")}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          {t("partnership.signup.title05")}{' '}
          <a href="#" className="text-green-500 hover:underline">
            {t("partnership.signup.title06")}
          </a>{' '}
          {t("partnership.signup.title07")}
        </div>

        <Link href="signin">
          <button className="w-full mt-3 border border-green-500 text-green-500 py-2 rounded-md hover:bg-green-50 transition-colors">
            {t("partnership.signup.title08")}
          </button>
        </Link>

        <p className="text-sm text-gray-600 text-center">
          {t("partnership.signup.title09")}{' '}
          <a href="#" className="text-green-500 hover:underline">
            {t("partnership.signup.title10")}
          </a>{' '}
          {t("partnership.signup.title11")}{' '}
          <a href="#" className="text-green-500 hover:underline">
            {t("partnership.signup.title12")}
          </a>{' '}
          {t("partnership.signup.title13")}
        </p>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>{t("partnership.signup.title14")}</p>
          <p>{t("partnership.signup.title15")}</p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
