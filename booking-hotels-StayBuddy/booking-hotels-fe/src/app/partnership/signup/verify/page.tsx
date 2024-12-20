"use client"
import Loading from "@/components/loading";
import { useClientTranslation } from "@/i18n/client";
import { useEffect, useState } from "react";

const AccountVerification = () => {
  const { t } = useClientTranslation("Common");
  const [email, setEmail] = useState<string | null>(null);
  
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  if (!email) {
    return <Loading className="container mx-auto"></Loading>; 
  }


  return (
    <div className="min-h-screen bg-gray-50 z-50">
      <div className="container mx-auto">
      <div className="max-w-2xl pt-[165px]">
        <h1 className="text-2xl font-semibold mb-8">{t("partnership.verify.title01")}</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <p className="text-gray-600">
          {t("partnership.verify.title02")}{' '}
            <span className="font-medium text-gray-900">{email}</span>.
          </p>
          <p className="text-gray-600">
          {t("partnership.verify.title03")}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AccountVerification;
