import { Request, Response, Express, Router } from "express";

import {User, validateUser } from '../models/User'
const userRoute = Router();

userRoute.post('/register', async (req: Request, res: Response) => {
    // First Validate The Request
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.send(user);
    }
});

export default userRoute