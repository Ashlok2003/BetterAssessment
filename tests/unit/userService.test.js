"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const userService = __importStar(require("../../src/services/userService"));
describe('User Service Unit Tests', () => {
    it('should create a user', () => {
        const input = { name: 'John', email: 'john@example.com' };
        const user = userService.createUser(input);
        expect(user).toEqual({ id: 1, ...input });
        expect(userService.getUsers()).toHaveLength(1);
    });
    it('should get a user by ID', () => {
        const input = { name: 'John', email: 'john@example.com' };
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
        const updates = { name: 'Jane' };
        const updated = userService.updateUser(1, updates);
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
//# sourceMappingURL=userService.test.js.map