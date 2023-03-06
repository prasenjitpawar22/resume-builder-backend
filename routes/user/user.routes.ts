import { Request, Response, Express, Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { PrismaClient } from '@prisma/client'


import { createUser, getAllUsers, getUserByEmail, removeAllUsers } from './user.service'
import auth from "../../middleware/auth";
const userRoute = Router();


userRoute.post('/register', async (req: Request, res: Response) => {
  // after validation
  try {
    let user = await getUserByEmail(req.body.email)

    if (user) {
      return res.status(400).send('That user already exisits!');
    } else {
      const user = req.body
      const newUser = await createUser(user)
      const token = jwt.sign({ id: newUser.email }, process.env.PRIVATE_KEY!);

      // const sendData = _.pick(newUser, )
      return res.send({ token, newUser });
    }
  } catch (error: any) {
    return res.status(501).send(error.message)
  }
});

userRoute.post('/login', async (req: Request, res: Response) => {
  // First Validate The HTTP Request

  // const { error } = validateLoginUser(req.body);
  // if (error) {
  //     return res.status(400).send(error.details[0].message);
  // }

  //  Now find the user by their email address
  let user = await getUserByEmail(req.body.email);

  if (!user) {
    return res.status(400).send('User not found.');
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Incorrect email or password.');
  }
  const token = jwt.sign({ id: user.email }, process.env.PRIVATE_KEY!);

  const { email, name } = _.pick(user, 'name', 'email')
  res.send({ email, name, token });
})

//verify token
userRoute.post('/', auth, async (req: Request, res: Response) => {
  const {userId} = req.body
  console.log(userId);
  
  try {
    if (userId) {
      const userFound = await getUserByEmail(userId)
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

//
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
