import { getRepository } from 'typeorm';
import {
  NextFunction,
  Request,
  Response
} from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../entity/User';
import config from '../config/config';
import { validate } from 'class-validator';

export default class AuthController {
  static async login(request: Request, response: Response, next: NextFunction) {
    let { username, password } = request.body;
    if (!(username && password)) {
      response.status(400).send();
    }

    const userRepository = getRepository(User);

    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      response.status(401).send();
      return;
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      response.status(401).send();
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    return response.send(token);
  }

  static async changePassword(request: Request, response: Response, next: NextFunction) {
    //Get ID from JWT
    const id = response.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = request.body;
    if (!(oldPassword && newPassword)) {
      response.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      response.status(401).send();
    }

    //Check if old password matches
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      response.status(401).send();
      return;
    }

    //Validate
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      response.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    await userRepository.save(user);

    response.status(204).send();
  };
}
