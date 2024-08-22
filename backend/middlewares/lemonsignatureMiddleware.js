import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const LEMON_SQUEEZY_SIGNING_SECRET = process.env.LEMON_SECRET;

const signatureMiddleware = (req, res, next) => {
    try {
        const signature = req.headers['x-signature'];
        const payload = req.rawBody;
        
        if (!LEMON_SQUEEZY_SIGNING_SECRET) {
            console.error('LEMON_SECRET is not set in environment variables');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        if (!signature) {
            console.error('x-signature header is missing');
            return res.status(400).json({ message: 'Missing signature' });
        }

        const hmac = crypto.createHmac('sha256', LEMON_SQUEEZY_SIGNING_SECRET);
        const digest = hmac.update(payload).digest('hex');
        
        if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
            req.body = JSON.parse(payload);
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

export const handleLemonSqueezyWebhook = async (req, res, next) => {
    if (req.headers['content-type'] === 'application/json' && req.headers['x-signature']) {
      req.rawBody = await buffer(req);
      req.body = JSON.parse(req.rawBody);
    }
    next();
  };

export default signatureMiddleware;