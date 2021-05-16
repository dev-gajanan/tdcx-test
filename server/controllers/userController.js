const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/User');

const addUser = async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(422).send(error.details[0].message);
    }
    let user = await User.findOne({email: req.body.email}, 'email').exec();
    if(user) {
        return res.status(400).send('Email id already exists');
    }

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    
    const salt = await bcrypt.genSalt(11);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
}

module.exports = { addUser }