import jwt from 'jsonwebtoken';
import { key } from '../tokens/confing.js';
export default function authMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split('Bearer ')[1];
        if (!token) {
            throw new Error('not auth.... :(');
        }

        const decodeData = jwt.verify(token, key.secret);
        req.user = decodeData;
        next();
    } catch (e) {
        console.log(e);
        res.status(403).json({ message: 'not authorized' });
    }
}