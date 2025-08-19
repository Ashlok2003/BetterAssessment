import { type User } from '../models/user';

let users: User[] = [];
let idCounter = 1;

export const reset = () => {
  users = [];
  idCounter = 1;
};

export const getUsers = (): User[] => users;

export const getUserById = (id: number): User | undefined => users.find((u) => u.id === id);

export const createUser = (user: Omit<User, 'id'>): User => {
  const newUser = { id: idCounter++, ...user };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: number, updates: Partial<User>): User | null => {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  Object.assign(user, updates);
  return user;
};

export const deleteUser = (id: number): boolean => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};
