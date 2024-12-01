import User from '../model/user.model.js'
import bcrypt from 'bcryptjs'

const signup = async (req, res) => {
    const { user, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json('User created successfully!');
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export {
    signup
}