import { GENDERS } from '../constants/genders.js';
import User from '../models/user.model.js';
import { validateForm } from "@mub22/validity";

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        /* Validations */
        const validations = validateForm(req.body, {
            fullname: "required|string",
            username: "required|string",
            password: "required|string|min:6",
            confirmPassword: "required|string|min:6",
        });

        if (!validations.valid) {
            return res.status(400).send(validations.errors);
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        let genderOptions = GENDERS;

        if (!genderOptions.includes(gender)) {
            return res.status(400).send('The gender must be male, female or other');
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