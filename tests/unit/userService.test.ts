import * as userService from '../../src/services/userService';
import { UserInput, UserUpdateInput } from '../../src/schemas/user.schema';
import { User } from '../../src/models/user';

describe('User Service Unit Tests', () => {
  it('should create a user', () => {
    const input: UserInput = { name: 'John', email: 'john@example.com' };
    const user = userService.createUser(input);
    expect(user).toEqual({ id: 1, ...input });
    expect(userService.getUsers()).toHaveLength(1);
  });

  it('should get a user by ID', () => {
    const input: UserInput = { name: 'John', email: 'john@example.com' };
    userService.createUser(input);
    const user = userService.getUserById(1);
    expect(user).toEqual({ id: 1, ...input });
  });

  it('should return undefined for non-existent user', () => {
    const user = userService.getUserById(999);
    expect(user).toBeUndefined();
  });

  it('should update a user', () => {
    userService.createUser({ name: 'John', email: 'john@example.com' });
    const updates: UserUpdateInput = { name: 'Jane' };
    const updated = userService.updateUser(1, updates as Partial<User>);
    expect(updated?.name).toBe('Jane');
    expect(updated?.email).toBe('john@example.com');
  });

  it('should return null on update non-existent user', () => {
    const updated = userService.updateUser(999, { name: 'Jane' });
    expect(updated).toBeNull();
  });

  it('should delete a user', () => {
    userService.createUser({ name: 'John', email: 'john@example.com' });
    const success = userService.deleteUser(1);
    expect(success).toBe(true);
    expect(userService.getUsers()).toHaveLength(0);
  });

  it('should return false on delete non-existent user', () => {
    const success = userService.deleteUser(999);
    expect(success).toBe(false);
  });

  it('should return empty array when no users', () => {
    expect(userService.getUsers()).toEqual([]);
  });
});
