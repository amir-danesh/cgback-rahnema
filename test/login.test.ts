import request from 'supertest';
import {Express} from 'express';
import {makeApp} from "../src/api";
import {UserEntity} from "../src/modules/user/entity/user.entity";
import {AppDataSource} from "../src/data-source";

describe('Login', () => {
        let app: Express;

        async function seedUser() {
            const user = {
                username: 'admin',
                email: 'm@m.com',
                password: '$2b$10$/pvBasCyEm3xglDlCb9Itu1fgXQ2SNw139hD/EvQygehqu71PfD6q', ///123
                firstName: 'admin',
                lastName: 'admin',
                isPrivate: false,
                status: true,
                profilePicture: '',
                bio: '',
                createdAt: new Date(),
                updatedAt: new Date(),

            }
            const userRepository = AppDataSource.getRepository(UserEntity);
            const userCount = await userRepository.count();
            if (userCount === 0) {
                await userRepository.save(user);
            }
        }

        beforeAll(async () => {
            app = makeApp(await AppDataSource.initialize());
            await seedUser();
        })
        afterAll(async () => {
            await AppDataSource.destroy();
        })
        it('should success if user and pass valid', async () => {
            await request(app).post('/login').send({username: 'admin', password: '123'}).expect(200);
        })
        it('should failed if user and pass not valid ', () => {
            return request(app).post('/login').send({username: 'admin', password: '1234'}).expect(401);
        });
        it('should failed if username not found ', () => {
            return request(app).post('/login').send({username: 'admin1', password: '123'}).expect(401);
        });
        it('should failed if username is not like valid email ', () => {
            return request(app).post('/login').send({username: 'm@@m.com', password: '123'}).expect(401);
        })
        it('should success if username like valid email', () => {
            return request(app).post('/login').send({username: 'm@m.com', password: '123'}).expect(200);
        });
        it('should failed id username start with number', () => {
            return request(app).post('/login').send({username: '1admin', password: '123'}).expect(401);
        });


    }
)