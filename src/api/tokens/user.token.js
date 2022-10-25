import jwt from 'jsonwebtoken';
import { key } from './confing.js';

export function generateAcessToken(id, roles) {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, key.secret, { expiresIn: '24h' });
}

