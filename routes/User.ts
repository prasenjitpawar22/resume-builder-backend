import express, { Router } from 'express'
import { User } from '../model.js'

const userRoute = Router()

userRoute.post("/add_user", async (request, response) => {
    const user = new User(request.body);
    try {
        await user.save();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

// ...
userRoute.get("/users", async (request, response) => {
    const users = await User.find({});

    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

export default userRoute