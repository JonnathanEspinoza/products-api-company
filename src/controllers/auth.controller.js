import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import { json } from "express";

// registrarse en la aplicacion
export const signUp = async (req, res) => {

    const { username, email, password, roles } = req.body;
    
    // create a new user
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    // verifica si en el req recibio un rol, si no existe se asigna por defecto el rol "user"
    if (roles) {
        // obtengo todos los roles que coincidan
        const foundRoles = await Role.find({ name: { $in: roles } });
        // almaceno los id's de los roles en un array dentro del newUser
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        // obtengo el rol user
        const role = await Role.findOne({ name: "user" });
        // almaceno el rol user en un array dentro del newUser
        newUser.roles = [role._id];
    }

    // save the new user
    const saveUser = await newUser.save();

    // create token
    const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
        expiresIn: 86400 // esta en segundos = 24 hours
    });

    res.status(200).json({ token })
}


// ingresar a la aplicación
export const signin = async (req, res) => {
    // buscar el user
    // devuelve el objeto user y roles
    const userFound = await User.findOne({ email: req.body.email }).populate("roles");
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // validamos la contraseña
    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
    if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });

    // create a token
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400 // esta en segundos = 24 hours
    });

    res.json({ token });
}