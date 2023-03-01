import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import devEnvConfig from '../dev-env.config';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization
    const token = header?.split(' ')[1]
    let validUserId;
    
    if (token) {
      const decodedToken = jwt.verify(token, devEnvConfig.token_key) as JwtPayload;
      // console.log('decoded token', decodedToken._id);
      validUserId = decodedToken._id
      if (req.body.userId && req.body.userId !== validUserId) {
        throw 'Invalid user ID';
      } else {
        req.body.validUserId = validUserId
        next();
      }
    }
    else {
      res.status(403).send('Authorization token not provided!')
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

export default auth