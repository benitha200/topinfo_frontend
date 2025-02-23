import API_URL from "../constants/Constants";

const API_BASE_URL = 
  typeof window !== 'undefined' 
    ? (window.ENV?.NEXT_PUBLIC_API_URL || `${API_URL}`)
    : (process.env.NEXT_PUBLIC_API_URL || `${API_URL}`);

export const paymentService = {
  async initiatePayment(paymentData) {

    if (parseFloat(paymentData.amount) < 100) {
      throw new Error('The total amount to be paid should not be less than 100 RWF, This is my catch');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/payments/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Payment initiation failed: ${error.message}`);
    }
  },

  async checkPaymentStatus(transactionId, requestTransactionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          transactionId,
          requestTransactionId
        })
      });

      if (!response.ok) {
        throw new Error('Status check failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Status check failed: ${error.message}`);
    }
  }
};