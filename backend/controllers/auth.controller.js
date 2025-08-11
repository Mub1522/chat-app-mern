import User from '../models/user.model.js';

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        /* Validations */
        if (!fullname || !username || !password || !confirmPassword || !gender) {
            return res.status(400).send('All fields are required');
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        if (password.length < 6) {
            return res.status(400).send('Password must be at least 6 characters long');
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).send('Username already exists');
        }

        /* TODO: Password HASH */

        const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password,
            gender,
            avatar: gender === "male" ? boyAvatar : girlAvatar,
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            avatar: newUser.avatar
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal Server Error');
    }
}
export const login = (req, res) => {
    res.send('Login endpoint');
}
export const logout = (req, res) => {
    res.send('logout endpoint');
}