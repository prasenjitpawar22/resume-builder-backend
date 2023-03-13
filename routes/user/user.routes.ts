import { Request, Response, Express, Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { PrismaClient, User } from '@prisma/client'


import { createUser, getAllUsers, getUserByEmail, getUserById, removeAllUsers } from './user.service'
import auth from "../../middleware/auth";
import { LoginRequestValidator, RegisterRequestValidator } from "./validator";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
const userRoute = Router();


userRoute.post('/register', async (req: Request, res: Response) => {
  const { error } = RegisterRequestValidator(req.body)
  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.details[0].message })
  }

  try {
    let user = await getUserByEmail(req.body.email)

    if (user) {
      return res.status(400).json({ message: 'That user already exisits!' });
    } else {
      const {email, fullname, password} = req.body
      const newUser = await createUser(email, fullname, password)
      const token = jwt.sign({ id: newUser.id }, process.env.PRIVATE_KEY!, {
        expiresIn: '20min'
      });

      return res.status(200).json({ token, email: newUser.email, name: newUser.name });
    }
  } catch (error: any) {
    return res.status(501).json({ message: 'server error' })
  }
});


/* 1. It is creating a route for the user to login.
2. It is using the async/await syntax to get the user by email.
3. It is using the bcrypt library to compare the password.
4. It is using the jwt library to sign the token.
5. It is using the lodash library to pick the email and name from the user object.
6. It is sending the email, name, and token back to the user. */
userRoute.post('/login', async (req: Request, res: Response) => {

  const { error } = LoginRequestValidator(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  let user = await getUserByEmail(req.body.email);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY!, {
    expiresIn: '20min'
  });

  const { email, name } = _.pick(user, 'name', 'email')
  // console.log(token, email, name);

  res.send({ email, name, token });
})

//verify token
userRoute.post('/', auth, async (req: Request, res: Response) => {
  const { userId } = req.body
  // console.log(userId);

  try {
    if (userId) {
      const userFound = await getUserById(userId)
      if (userFound) {
        return res.status(200).send(userFound)
      }
      else {
        return res.status(401).send('user not valid')
      }
    }
    else {
      return res.status(401).send('userid not found')
    }
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
})

//get all user
userRoute.get('/all-users', async (req: Request, res: Response) => {
  const users = await getAllUsers()
  // console.log(users);

  return res.send(users)
})

// remove all users
userRoute.post('/remove-all-users', async (req: Request, res: Response) => {
  try {
    await removeAllUsers()
    return res.send('done')

  } catch (error: any) {
    return res.status(500).send(error.message)
  }
})


export default userRoute
