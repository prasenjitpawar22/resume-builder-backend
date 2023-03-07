import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { config } from 'dotenv';

config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization
    const token = header?.split(' ')[1]
    
    let userId;
    // console.log(process.env.PRIVATE_KEY);

    if (token) {
      const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY!) as JwtPayload;
      // console.log('decoded token', decodedToken);
      userId = decodedToken.id
      if (req.body.userId && req.body.userId !== userId) {
        return res.status(403).send('Invalid token user')
      } else {
        req.body.userId = userId
        next();
      }
    }
    else {
      return res.status(403).send('Authorization token not provided!')
    }
  } catch {
    return res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

export default auth