import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  
  try {
    // Razorpay sends the signature in this header
    const signature = req.headers['x-razorpay-signature'];
    
    // We need to hash the raw body with our secret to verify
    // In Vercel serverless functions, req.body is already parsed as JSON if it's JSON.
    // However, for crypto validation, we need the raw body string.
    // If it's already parsed, we stringify it.
    const bodyString = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(bodyString)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = req.body.event;
    
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentData = req.body.payload.payment.entity;
      
      // Get the notes we attached during checkout (user_id and course_id)
      const userId = paymentData.notes?.user_id;
      const courseId = paymentData.notes?.course_id;

      if (userId && courseId) {
        // Securely add the enrollment to Supabase
        const { error } = await supabase
          .from('enrollments')
          .insert([{ 
            user_id: userId, 
            course_id: courseId,
            payment_id: paymentData.id 
          }]);

        if (error && !error.message?.includes('unique_enrollment')) {
          console.error('Supabase Error:', error);
          return res.status(500).json({ error: 'Database error' });
        }
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}
