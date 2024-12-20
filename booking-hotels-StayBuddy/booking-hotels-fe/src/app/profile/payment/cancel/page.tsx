"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentCancelPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/porfile/topUp');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Thanh toán không thành công!
      </h1>
      <p>Giao dịch của bạn đã bị hủy. Bạn sẽ được chuyển về trang chủ trong giây lát...</p>
    </div>
  );
}
