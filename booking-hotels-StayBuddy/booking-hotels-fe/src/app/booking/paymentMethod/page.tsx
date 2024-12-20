import React, { Suspense } from "react";
import PaymentMethod from "./paymentMethod";

const PaymentMethodPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PaymentMethod />
  </Suspense>
);

export default PaymentMethodPage;
