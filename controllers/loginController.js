const User = require('../models/User')
const jwt = require('jsonwebtoken')

class LoginController {

    getUsers(req, res) {
        User.find()
            .then(User => {
                res.json(User)
            })
    }

    async createUser(req, res) {
        try {
            const { name, password, email } = req.body;
            const checkEmail = await User.findOne({ email });
            if (checkEmail) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const newUser = await User.create({
                name,
                password,
                email,
            });

            res.json(newUser);

        } catch (error) {
            console.error('lỗi:', error);
            res.status(500).json({ error: 'lỗi' });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            console.log(email)

            const user = await User.findOne({
                email,
                password
            });
            if (user) {
                const token = jwt.sign({ email: user.email }, 'mk')
                console.log(user.email)
                res.json({
                    token: token,
                    user: user
                })
            } else {
                res.json('đăng nhập thất bại')
            }
        } catch (error) {
            console.error('lỗi:', error);
            res.status(500).json({ 'lỗi:': error });
        }
    }



}

module.exports = new LoginController