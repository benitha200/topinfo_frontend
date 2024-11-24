const API_BASE_URL = 
  typeof window !== 'undefined' 
    ? (window.ENV?.NEXT_PUBLIC_API_URL || 'http://localhost:3050/api')
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050/api');

export const paymentService = {
  async initiatePayment(paymentData) {
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