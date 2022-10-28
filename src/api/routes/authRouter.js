import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import { check } from 'express-validator';
import authMiddleware from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
const router = new Router();


router.post(
    '/registration',
    [
        check('username', 'username already exist...').notEmpty(),
        check('password', 'invalid Password...').isLength({ min: 4, max: 10 })
    ],
    AuthController.registration
);


router.post('/login', AuthController.login);
router.get('/users', roleMiddleware(['ADMIN']), AuthController.getUsers);

export default router;