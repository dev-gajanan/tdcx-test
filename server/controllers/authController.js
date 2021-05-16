const bcrypt = require('bcrypt');
const Joi = require('joi');

const {User} = require('../models/User');

const login = async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) {
        return res.send({
            status: false,
            message: error.details[0].message
        });
    }
    const user = await User.findOne({email: req.body.email}).exec();
    if(!user) {
        return res.send({
            status: false,
            message: "Invalid Email ID"
        });
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) {
        return res.send({
            status: false,
            message: "Invalid Password"
        });
    }

    const token = user.generateAuthToken();
    res.send({
        token: {
            name: user.name,
            token
        },
        image: ""
    });
}   

const validate = (req) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(req);
}

module.exports = { login }
