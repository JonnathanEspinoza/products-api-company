import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

// encriptacion de contraseña
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// compara dos contraseñas
// return true or false
userSchema.statics.comparePassword = async (password, recivedPassword) => {
    return await bcrypt.compare(password, recivedPassword);
}

userSchema.plugin(mongoosePaginate);

export default model('User', userSchema);