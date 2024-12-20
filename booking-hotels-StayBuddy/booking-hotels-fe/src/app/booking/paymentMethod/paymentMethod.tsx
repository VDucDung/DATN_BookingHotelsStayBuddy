/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppSelector } from "@/redux";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "antd";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent, processBookingPayment } from "@/api/paymentService";
import { getTicket } from "@/api/ticketService";
import { TransactionType } from "@/interfaces/ticket";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const PaymentMethodContent = () => {
  const param = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handlePaymentChange = (method: any) => {
    setPaymentMethod(method);
  };

  const { data: ticketData, error } = useQuery({
    queryKey: ["room", param.get("id")],
    queryFn: () => getTicket(param.get("id") as string),
  });

  if (error) {
    return <div className="container mx-auto">No ticket information.</div>;
  }

  const handlePayment = async () => {
    if (!paymentMethod || !ticketData) {
      alert("Please select a payment method");
      return;
    }

    try {
      switch (paymentMethod) {
        case "system":
          await handleSystemPayment();
          break;
        case "direct":
          await handleDirectCardPayment();
          break;
        default:
          alert("Invalid payment method");
      }
    } catch (error: any) {
      console.error("Payment error", error);
      alert(`Payment failed: ${error.message}`);
    }
  };

  const handleSystemPayment = async () => {
    if (ticketData && ticketData.id && ticketData.room.partner.id && ticketData.amount) {
      const response = await processBookingPayment({
        ticketId: `${ticketData.id}`,
        hotelOwnerId: +ticketData?.room?.partner?.id,
        paymentMethod: paymentMethod === "direct" ? TransactionType.BANK_CARD : TransactionType.WALLET,
      })

      if(response.statusCode === 201){
        toast.success(response.message)
        router.push("/booking/payment/success");
      }else{
        toast.error(response.message)
        router.push("/booking/payment/cancel");
      }
      
    }

  };

  const handleDirectCardPayment = async () => {
    if (!stripe || !elements) {
      throw new Error("Stripe not initialized");
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      throw new Error("Please enter card details");
    }

    try {
      if (ticketData && ticketData.id && ticketData.room.partner.id && ticketData.amount) {
        const { client_secret } = await createPaymentIntent({
          ticketId: `${ticketData.id}`,
          hotelOwnerId: +ticketData?.room?.partner?.id,
          amount: +ticketData.amount,
          paymentMethod: paymentMethod === "direct" ? TransactionType.BANK_CARD : TransactionType.WALLET,
        });

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.fullname || "Guest",
              email: user?.email || "",
            },
          },
        });

        if (paymentResult.error) {
          throw new Error(paymentResult.error.message);
        }

        if (paymentResult.paymentIntent?.status === "succeeded") {
          alert("Payment successful!");
          router.push("/booking/payment/success");
        } else {
          router.push("/booking/payment/cancel");
        }
      }
    } catch (error: any) {
      console.error("Payment error", error);
      alert(`Payment failed: ${error.message}`);
      router.push("/booking/payment/cancel");
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-7xl container mx-auto bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 gap-6">
        <div className="space-y-6 ">
          <div>
            <p className="text-4xl font-bold">₫{new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(ticketData?.amount || 0)}</p>
            <div className="flex justify-between border-b py-2 items-center">
              <div className="flex items-center justify-center space-x-2">
                <Image
                  src={(ticketData?.room.images[0]) ?? `/images/email-bg.jpg`}
                  alt="Product"
                  className="h-[60px] w-[60px] object-contain"
                  width={60}
                  height={60}
                />
                <div className="flex flex-col">
                  <span>{ticketData?.room?.roomName ?? "Name"}</span>
                  <span className="text-gray-500 text-sm">{ticketData?.room?.description ?? "Decriptions"}</span>
                </div>
              </div>
              <span>₫{new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(ticketData?.amount || 0)}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>Subtotal</span>
              <span>₫{new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(ticketData?.amount || 0)}</span>
            </div>

            <div className="flex justify-between border-b py-2 items-center">
              <span className="flex place-items-center" >
                <span>Tax</span>
                <span className="text-sm text-gray-500 ml-1 ">
                  <Tooltip title="Tax is determined by billing information"  >
                    <CircleAlert className="w-[13px] h-[13px]" />
                  </Tooltip>
                </span>
              </span>
              <span>₫0</span>
            </div>
            <div className="flex justify-between border-t py-2">
              <span className="font-bold">Total due</span>
              <span className="font-bold">₫{new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(ticketData?.amount || 0)}</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Payment Methods</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="system"
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 cursor-pointer"
                onChange={() => handlePaymentChange("system")}
              />
              <span className="text-sm">Pay with system balance</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="direct"
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 cursor-pointer"
                onChange={() => handlePaymentChange("direct")}
              />
              <span className="text-sm">Pay directly</span>
            </label>
          </div>

          {paymentMethod === "system" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm">Your system balance:</p>
              <p className="text-lg font-bold text-green-600">₫{new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(user?.balance || 0)}</p>
            </div>
          )}

          {paymentMethod === "direct" && (
            <div className="space-y-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          )}


          <button
            onClick={handlePayment}
            disabled={!paymentMethod}
            className="w-full bg-blue-500 text-white font-semibold rounded-md p-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Pay
          </button>
        </div>
      </div>
    </section>
  );
};


const PaymentMethod = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentMethodContent />
    </Elements>
  );
};

export default PaymentMethod;
