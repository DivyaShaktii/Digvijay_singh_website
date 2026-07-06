import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Disable default Vercel body parser to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Helper function to read raw body
async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const body = JSON.parse(rawBody);
    const event = body.event;
    
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentData = body.payload.payment.entity;
      
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
