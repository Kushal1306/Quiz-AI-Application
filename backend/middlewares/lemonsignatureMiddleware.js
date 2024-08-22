import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const LEMON_SQUEEZY_SIGNING_SECRET = process.env.LEMON_SECRET;

const getRawBody = (req) => {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk.toString();
    });
    req.on('end', () => {
      resolve(data);
    });
    req.on('error', reject);
  });
};

const signatureMiddleware = async (req, res, next) => {
    try {
        const signature = req.headers['x-signature'];
        
        if (!LEMON_SQUEEZY_SIGNING_SECRET) {
            console.error('LEMON_SECRET is not set in environment variables');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        if (!signature) {
            console.error('x-signature header is missing');
            return res.status(400).json({ message: 'Missing signature' });
        }

        const rawBody = await getRawBody(req);
        
        const hmac = crypto.createHmac('sha256', LEMON_SQUEEZY_SIGNING_SECRET);
        const digest = hmac.update(rawBody).digest('hex');
        
        if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
            req.rawBody = rawBody;
            req.body = JSON.parse(rawBody);
            next();
        } else {
            console.error('Signature verification failed');
            return res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error in signature middleware:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export default signatureMiddleware;