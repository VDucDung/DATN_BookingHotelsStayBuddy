"use client";

import { useClientTranslation } from "@/i18n/client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ContactFormData {
  fullname: string;
  phone: string;
}

interface FormErrors {
  fullname?: string;
  phone?: string;
}

const ContactForm = () => {
  const { t } = useClientTranslation("Common");
  const [formData, setFormData] = useState<ContactFormData>({
    fullname: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = t("reqquired.err01");
    }

    if (!formData.phone.trim() || !/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(formData.phone)) {
      newErrors.phone = t("errors.phoneNumber.err02");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("contactFormData", JSON.stringify(formData));
      }
      router.push("password"); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-[155px] p-6">
      <h1 className="text-2xl font-semibold mb-4">{t("partnership.contact.title01")}</h1>
      
      <p className="text-gray-600 mb-6">{t("partnership.contact.title02")}</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm mb-2">{t("partnership.contact.title03")}</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.fullname ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder=""
          />
          {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
        </div>

        <div>
          <label className="block text-sm mb-2">{t("partnership.contact.title05")}</label>
          <div className="flex">
            <div className="relative">
              <button className="h-full px-3 border border-gray-300 rounded-l-md flex items-center space-x-2 hover:bg-gray-50" type="button">
                <Image 
                  src="/images/vi.png"
                  alt="Vietnam flag"
                  className="w-6 h-4 object-cover"
                  width={24}
                  height={24}
                />
                <span className="text-gray-600">+84</span>
              </button>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`flex-1 px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder=""
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <p className="text-sm text-gray-600">{t("partnership.contact.title06")}</p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {t("partnership.contact.title07")}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
