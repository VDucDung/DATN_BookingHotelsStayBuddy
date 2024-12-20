"use client";

import { Suspense, useEffect } from "react";
import {  useRouter } from "next/navigation";

function PaymentSuccessContent() {
  const router = useRouter();

  useEffect(() => {
      const timeout = setTimeout(() => {
        router.push("/profile/booking");
      }, 3000);
      return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="container mx-auto py-16 text-center mt-[115px]">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Thanh toán thành công!
      </h1>
      <p>Bạn sẽ được chuyển về booking trong giây lát...</p>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
