const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

userSchema.methods.generateAuthToken = () => {
    const userData = {
        _id: this._id,
        name: this.name
    }
    return jwt.sign(userData, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;