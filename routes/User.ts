import { Request, Response, Express, Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { User, validateLoginUser, validateResgisterUser } from '../models/User'
import devenv from "../dev-env.config"

const userRoute = Router();


userRoute.post('/register', async (req: Request, res: Response) => {
    // First Validate The Request
    const { error } = validateResgisterUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        // user = new User({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password
        // });
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = jwt.sign({ _id: user._id }, devenv.token_key);
        res.send(_.pick(user, ['name', 'email']));
    }
});

userRoute.post('/login', async (req: Request, res: Response) => {
    // First Validate The HTTP Request
    
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send('User not found.');
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }   
    const token = jwt.sign({ _id: user._id }, devenv.token_key);
    
    var userdata = _.pick(user, ['name'], 'email')

    res.send({userdata, token});
})
export default userRoute