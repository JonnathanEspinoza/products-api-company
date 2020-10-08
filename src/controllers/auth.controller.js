import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const signUp = async (req, res) => {

    const { username, email, password, roles } = req.body;
    //const userFound = await User.find({email});

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
    }

    const saveUser = await newUser.save();
    console.log(saveUser);

    const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
        expiresIn: 86400 // 24 hours
    });

    res.status(200).json({ token })
}

export const signin = async (req, res) => {
    res.json('SignIn');
}