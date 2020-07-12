import {
  NextFunction,
  Request,
  Response
} from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export function checkJwt(request: Request, response: Response, next: NextFunction) {
  const token = request.header('auth');
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);
    response.locals.jwtPayload = jwtPayload;
  } catch (e) {
    response.send(401).send();
    return;
  }

  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: '1h'
  });
  response.setHeader('token', newToken);

  next();
}
