import { key } from "../tokens/confing";

export function roleMiddleware(roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split('Bearer ')[1];
            if (!token) {
                throw new Error('not auth.... :(');
            }
            const { roles: userRoles } = jwt.verify(token, key.secret);
            let hasRole = false;
            userRoles.array.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });

            if (!hasRole) {
                return res.status(403).json({ message: 'user not authorized' });
            }
            next();
        } catch (e) {
            console.log(e);
            res.status(403).json({ message: 'not authorized' });
        }
    }
}