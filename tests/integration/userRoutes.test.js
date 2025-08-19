"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("../../src/routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/users', userRoutes_1.default);
describe('User API Integration Tests', () => {
    describe('GET /users', () => {
        it('should return empty array initially', async () => {
            const res = await (0, supertest_1.default)(app).get('/users');
            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });
        it('should return all users', async () => {
            await (0, supertest_1.default)(app).post('/users').send({ name: 'John', email: 'john@example.com' });
            const res = await (0, supertest_1.default)(app).get('/users');
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0]).toHaveProperty('id', 1);
        });
    });
    describe('GET /users/:id', () => {
        it('should return a user by ID', async () => {
            await (0, supertest_1.default)(app).post('/users').send({ name: 'John', email: 'john@example.com' });
            const res = await (0, supertest_1.default)(app).get('/users/1');
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('John');
        });
        it('should return 404 for non-existent user', async () => {
            const res = await (0, supertest_1.default)(app).get('/users/999');
            expect(res.status).toBe(404);
            expect(res.body.message).toBe('User not found');
        });
        it('should return 400 for invalid ID', async () => {
            const res = await (0, supertest_1.default)(app).get('/users/invalid');
            expect(res.status).toBe(400);
            expect(res.body.message).toContain('Invalid input: expected number, received NaN');
        });
    });
    describe('POST /users', () => {
        it('should create a user', async () => {
            const res = await (0, supertest_1.default)(app)
                .post('/users')
                .send({ name: 'John', email: 'john@example.com' });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id', 1);
            expect(res.body.name).toBe('John');
        });
        it('should return 400 for invalid input (missing name)', async () => {
            const res = await (0, supertest_1.default)(app).post('/users').send({ email: 'john@example.com' });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Invalid input: expected string, received undefined');
        });
        it('should return 400 for invalid email', async () => {
            const res = await (0, supertest_1.default)(app).post('/users').send({ name: 'John', email: 'invalid' });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Invalid email format');
        });
    });
    describe('PUT /users/:id', () => {
        it('should update a user', async () => {
            await (0, supertest_1.default)(app).post('/users').send({ name: 'John', email: 'john@example.com' });
            const res = await (0, supertest_1.default)(app).put('/users/1').send({ name: 'Jane' });
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Jane');
            expect(res.body.email).toBe('john@example.com');
        });
        it('should return 404 for non-existent user', async () => {
            const res = await (0, supertest_1.default)(app).put('/users/999').send({ name: 'Jane' });
            expect(res.status).toBe(404);
        });
        it('should return 400 for invalid input', async () => {
            await (0, supertest_1.default)(app).post('/users').send({ name: 'John', email: 'john@example.com' });
            const res = await (0, supertest_1.default)(app).put('/users/1').send({ email: 'invalid' });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Invalid email format');
        });
        it('should return 400 for invalid ID', async () => {
            const res = await (0, supertest_1.default)(app).put('/users/invalid').send({ name: 'Jane' });
            expect(res.status).toBe(400);
            expect(res.body.message).toContain('Invalid input: expected number, received NaN');
        });
    });
    describe('DELETE /users/:id', () => {
        it('should delete a user', async () => {
            await (0, supertest_1.default)(app).post('/users').send({ name: 'John', email: 'john@example.com' });
            const res = await (0, supertest_1.default)(app).delete('/users/1');
            expect(res.status).toBe(204);
            const getRes = await (0, supertest_1.default)(app).get('/users/1');
            expect(getRes.status).toBe(404);
        });
        it('should return 404 for non-existent user', async () => {
            const res = await (0, supertest_1.default)(app).delete('/users/999');
            expect(res.status).toBe(404);
        });
        it('should return 400 for invalid ID', async () => {
            const res = await (0, supertest_1.default)(app).delete('/users/invalid');
            expect(res.status).toBe(400);
            expect(res.body.message).toContain('Invalid input: expected number, received NaN');
        });
    });
});
//# sourceMappingURL=userRoutes.test.js.map