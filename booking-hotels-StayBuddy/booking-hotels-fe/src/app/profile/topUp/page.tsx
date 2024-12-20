/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import { callApi } from "@/api/apiUtils";
import TransactionHistory from "@/components/wallet/TransactionHistory";
import { useQuery } from "@tanstack/react-query";
import { walletApi } from "@/api/walletService";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const PaymentInterface = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number | ''>('');

  const handleStripeCheckout = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Vui lòng nhập số tiền hợp lệ.");
      return;
    }

    try {
      setLoading(true);
      const customHeaders = {
        "accept-language": `${Cookies.get("lang") || "vi"}`,
      };
      const res = await callApi(
        "POST",
        "/stripe/create-checkout-session",
        null,
        { amount },
        customHeaders
      );
      const { sessionId } = res.data;

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe initialization failed");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        toast.error(`Stripe Checkout Error: ${error.message}`);
        console.error("Stripe Checkout Error:", error.message);
      }
    } catch (err: any) {
      console.error("Error during Stripe Checkout:", err.message);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const { data: balance, isLoading } = useQuery({
    queryKey: ["balance"],
    queryFn: () => walletApi.getWalletInfo(),
    staleTime: 60000,
  });

  if (isLoading) {
    return <div className="container mx-auto">Đang tải...</div>;
  }

  return (
    <div className="mx-auto p-4 bg-gray-50 rounded-lg">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center">
          <h3 className="text-gray-500 text-sm mb-1">Số dư hiện tại</h3>
          <div className="text-3xl font-bold text-green-600">
            {balance?.data?.balance?.toLocaleString("vi-VN") || 0} coin
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium text-green-800 mb-4">Nạp tiền</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nhập số tiền cần nạp (VND)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Nhập số tiền"
          className="w-full p-2 border border-green-500 rounded-lg"
          min="0"
        />
      </div>

      <button
        onClick={handleStripeCheckout}
        className={`w-full py-2 px-4 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } transition duration-200`}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Nạp tiền"}
      </button>

      <TransactionHistory />
    </div>
  );
};

export default PaymentInterface;
