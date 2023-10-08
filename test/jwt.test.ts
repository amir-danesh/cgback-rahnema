import request from 'supertest';
import {Express} from 'express';
import {makeApp} from "../src/api";
import {AppDataSource} from "../src/data-source";

describe('JWT', () => {
    let app: Express;
    // const userRepository = AppDataSource.getRepository(UserEntity);
    beforeAll(async () => {
        app = makeApp(await AppDataSource.initialize());
    })
    afterAll(async () => {
        await AppDataSource.destroy();
    })

    it('should get jwt access token if user password is valid', async () => {
        const jwtToken = await request(app).post('/login').send({username: 'admin', password: '123'}).expect(200);
        expect(jwtToken.header.authorization).toBeDefined();
    });
    it('should be failed if user password not valid', () => {
        return request(app).post('/login').send({username: 'admin', password: '1234'}).expect(401);
    });
    it('should get new access token if token is valid', async () => {
        const token =await request(app).post('/login').send({username: 'admin', password: '123'}).expect(200);
        return request(app).post('/refresh').set('Authorization', token.header.authorization).expect(200);
    });


})