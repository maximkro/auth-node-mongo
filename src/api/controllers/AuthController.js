import Role from '../models/Role.js';
import User from '../models/User.js';
import Bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { generateAcessToken } from '../tokens/user.token.js';
class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "error occured during the Registration...", errors })

            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json("user alrady exist...");
            }

            const hashPassword = Bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'USER' });
            const user = new User({ username, password: hashPassword, roles: [userRole.value] });
            await user.save();
            return res.json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: ' Registration Error...' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                res.status(400).json({ message: `user '${username} not found...` });
            }



            const match = await Bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({ message: `incorrect password...` });
            }

            const token = generateAcessToken(user._id, user.roles);
            return res.json({ token });

        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login Error...' });
        }
    }

    async getUsers(req, res) {
        try {

            const userRole = new Role();
            const adminRole = new Role({ value: 'ADMIN' });
            await userRole.save();
            await adminRole.save();
            res.json('server works');
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Error' });
        }
    }
}

export default new AuthController();