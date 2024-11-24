export default async function handler(req, res) {
    try {
      console.log(req.method)
      console.log(req.headers)
  
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Bypass certificate verification
      const response = await fetch('https://www.intouchpay.co.rw/api/requestpayment/', {
        method: req.method,
        headers: {
          ...req.headers,
        },
        body: req.method === 'GET' ? null : JSON.stringify(req.body),
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }