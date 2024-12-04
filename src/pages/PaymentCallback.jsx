import React from "react";
import { useLocation } from "react-router-dom";
import API_URL from "../constants/Constants";

const PaymentCallback = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const resp = queryParams.get("resp");
  const response = JSON.parse(resp);

  if (response.status === "success") {
    const tx_ref = response.data.txRef;
    fetch(`${API_URL}/payments/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        tx_ref,
      }),
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Success Message
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Injira kugira ngo ubone serivisi zacu
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback;
