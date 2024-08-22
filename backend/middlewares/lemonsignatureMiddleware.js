import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const LEMON_SQUEEZY_SIGNING_SECRET = process.env.LEMON_SECRET;

const signatureMiddleware=(req,res,next)=>{
    try {
        const signature = req.headers['x-signature'];
        const payload = JSON.stringify(req.body);
        const hmac = crypto.createHmac('sha256', LEMON_SQUEEZY_SIGNING_SECRET);
        const digest = hmac.update(payload).digest('hex');
        if(crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))){
            next();
        }
        return res.status(400).json({message:"request failed"});

    } catch (error) {
        return res.status(404).json({message:'failure'});
    }
   

};

export default signatureMiddleware;
