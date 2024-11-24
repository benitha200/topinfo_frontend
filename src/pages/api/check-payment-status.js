export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { transactionId, requestTransactionId } = req.body;
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
  
    const username = process.env.NEXT_PUBLIC_INTOUCH_USERNAME || 'testa';
    const password = process.env.NEXT_PUBLIC_INTOUCH_PASSWORD || 'e5d96a680907dac57b36e0d5e74c528733d5a6f61a8c4bfaf23f04505d8572c4';
    const timestamp = process.env.NEXT_PUBLIC_INTOUCH_TIMESTAMP || '20220314173905';
  
    const intouchPayload = {
      transactionid: transactionId,
      username: username,
      password: password,
      requesttransactionid: requestTransactionId,
      timestamp: timestamp
    };
  
    try {
      const intouchResponse = await fetch('https://www.intouchpay.co.rw/api/gettransactionstatus/', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(intouchPayload)
      });
  
      if (!intouchResponse.ok) {
        return res.status(intouchResponse.status).json({ message: 'Failed to fetch from Intouch' });
      }
  
      const data = await intouchResponse.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching payment status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  