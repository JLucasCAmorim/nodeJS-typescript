import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '~/repositories/UsersRepository';
import CreateUserService from '~/services/CreateUserService';

const userRouter = Router();

userRouter.get('/', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.find();
  return response.json(users);
});

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return user;
  } catch (error) {
    return response.status(400).json({ erro: error.message });
  }
});

export default userRouter;
