import { Request, Response, Express, Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { PrismaClient } from '@prisma/client'


import { createUser, getAllUsers, getUserByEmail, getUserById, removeAllUsers } from './user.service'
import auth from "../../middleware/auth";
const userRoute = Router();


userRoute.post('/register', async (req: Request, res: Response) => {
  try {
    let user = await getUserByEmail(req.body.email)

    if (user) {
      return res.status(400).send('That user already exisits!');
    } else {
      const user = req.body
      const newUser = await createUser(user)
      const token = jwt.sign({ id: newUser.id }, process.env.PRIVATE_KEY!);

      return res.send({ token, newUser });
    }
  } catch (error: any) {
    return res.status(501).send(error.message)
  }
});


/* 1. It is creating a route for the user to login.
2. It is using the async/await syntax to get the user by email.
3. It is using the bcrypt library to compare the password.
4. It is using the jwt library to sign the token.
5. It is using the lodash library to pick the email and name from the user object.
6. It is sending the email, name, and token back to the user. */
userRoute.post('/login', async (req: Request, res: Response) => {
 
  let user = await getUserByEmail(req.body.email);

  if (!user) {
    return res.status(400).send('User not found.');
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Incorrect email or password.');
  }
  const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY!);

  const { email, name } = _.pick(user, 'name', 'email')
  res.send({ email, name, token });
})

//verify token
userRoute.post('/', auth, async (req: Request, res: Response) => {
  const {userId} = req.body
  console.log(userId);
  
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
userRoute.get('/all-users',async (req:Request, res:Response) => {
  const users = await getAllUsers()
  console.log(users);
  
  return res.send(users)
})

// remove all users
userRoute.post('/remove-all-users',async (req:Request, res:Response) => {
  try {
    await removeAllUsers()
    return res.send('done')
    
  } catch (error:any) {
    return res.status(500).send(error.message)
  }
})


export default userRoute
