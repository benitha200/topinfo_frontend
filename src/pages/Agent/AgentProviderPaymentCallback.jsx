import React from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import API_URL from "../../constants/Constants";
import AgentLayout from "./AgentLayout";

const AgentProviderPaymentCallback = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const resp = queryParams.get("resp");
  const response = JSON.parse(resp);

  if (response.status === "success") {
    const tx_ref = response.data.txRef;
    fetch(`${API_URL}/payments/provider-callback`, {
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
    <AgentLayout>
    <div className="flex items-center justify-center bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-6">
        <CheckCircle 
          size={80} 
          className="mx-auto text-green-500 mb-4"
          strokeWidth={1.5}
        />
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Byagenze Neza!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Murakoze gukoresha TopInfo. Kwishyura Byagenze Neza!
          </p>
    
          
          <div className="border-t pt-6 text-sm text-gray-500">
            <p>
             Ukeneye Ubufasha? Twandikira kuri:{" "}
              <a 
                href="tel:+250785283910" 
                className="text-slate-600 hover:underline"
              >
                +250 785 025 495
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </AgentLayout>
  );

};

export default AgentProviderPaymentCallback;
