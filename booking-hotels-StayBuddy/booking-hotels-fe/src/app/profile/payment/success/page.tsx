"use client";

import { Suspense, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { walletApi } from "@/api/walletService";
import { useSearchParams, useRouter } from "next/navigation";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const session_id = searchParams.get("session_id");

  const { refetch: refetchWallet } = useQuery({
    queryKey: ["wallet_success"],
    queryFn: () => walletApi.getWalletInfo(),
    enabled: false, 
  });

  useEffect(() => {
    if (session_id) {
      refetchWallet();
      const timeout = setTimeout(() => {
        router.push("/profile/topUp");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [session_id, refetchWallet, router]);

  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Thanh toán thành công!
      </h1>
      <p>Bạn sẽ được chuyển về trang ví trong giây lát...</p>
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
