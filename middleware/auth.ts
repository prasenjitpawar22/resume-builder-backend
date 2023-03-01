import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import devEnvConfig from '../dev-env.config';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {

    const header = req.headers.authorization
    const token = header?.split(' ')[1]

    console.log(token);
    if (token) {
      const decodedToken = jwt.verify(token, devEnvConfig.token_key) as JwtPayload;
      const userId = decodedToken.sub;
      console.log("userid: sub: ", userId);

      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
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