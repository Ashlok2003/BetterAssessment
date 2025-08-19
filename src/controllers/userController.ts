import type { Request, Response } from 'express';
import * as userService from '../services/userService';
import { userInputSchema, userUpdateSchema, userIdSchema } from '../schemas/user.schema';
import type { User } from '../models/user';

export const getUsers = (_req: Request, res: Response) => {
  res.json(userService.getUsers());
};

export const getUserById = (req: Request, res: Response) => {
  const idParse = userIdSchema.safeParse({ id: req.params.id });

  if (!idParse.success)
    return res
      .status(400)
      .json({ message: idParse.error.issues?.[0]?.message ?? 'Invalid user id' });

  const user = userService.getUserById(idParse.data.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const createUser = (req: Request, res: Response) => {
  const parsed = userInputSchema.safeParse(req.body);

  if (!parsed.success)
    return res
      .status(400)
      .json({ message: parsed.error.issues?.[0]?.message ?? 'Invalid user data' });

  const user = userService.createUser(parsed.data);
  res.status(201).json(user);
};

export const updateUser = (req: Request, res: Response) => {
  const idParse = userIdSchema.safeParse({ id: req.params.id });
  if (!idParse.success)
    return res
      .status(400)
      .json({ message: idParse.error.issues?.[0]?.message ?? 'Invalid user id' });

  const parsed = userUpdateSchema.safeParse(req.body);

  if (!parsed.success)
    return res
      .status(400)
      .json({ message: parsed.error.issues?.[0]?.message ?? 'Invalid user data' });

  const user = userService.updateUser(idParse.data.id, parsed.data as Partial<User>);

  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const deleteUser = (req: Request, res: Response) => {
  const idParse = userIdSchema.safeParse({ id: req.params.id });
  if (!idParse.success)
    return res
      .status(400)
      .json({ message: idParse.error.issues?.[0]?.message ?? 'Invalid user id' });

  const success = userService.deleteUser(idParse.data.id);
  if (!success) return res.status(404).json({ message: 'User not found' });
  res.status(204).send();
};
