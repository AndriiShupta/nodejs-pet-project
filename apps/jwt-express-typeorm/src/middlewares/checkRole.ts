import {
  NextFunction,
  Request,
  Response
} from 'express';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

export function checkRole(roles: string[]) {
  return async function (request: Request, response: Response, next: NextFunction) {
    const id = response.locals.jwtPayload.userId;

    //Get user role from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      response.status(401).send();
    }

    if (roles.indexOf(user.role) > -1) {
      next();
    } else {
      response.status(401).send();
    }
  };
}
