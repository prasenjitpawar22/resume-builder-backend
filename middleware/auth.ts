import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { config } from 'dotenv';
import axios from 'axios'

config();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  //get token from request 
  const token = header?.split(' ')[1]

  if (!token) {
    console.log('no token from request');

    return next()
  }

  try {

    const decoded = jwt.decode(token)

    if (!decoded) return next()
    const exp = (decoded as JwtPayload).exp

    if (exp && Date.now() >= exp * 1000) {
      console.log('token expired');
      return next()
    }

    req.body.userId = decoded.sub
    return next()

  } catch (error) {
    // console.log(error);
    return next()
  }



};

export default auth