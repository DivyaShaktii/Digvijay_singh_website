import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, notes } = req.body;

    const razorpay = new Razorpay({
      key_id: process.env.VITE_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount, // amount in the smallest currency unit
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
      notes: notes,
    };

    const order = await razorpay.orders.create(options);
    
    res.status(200).json(order);
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
}
