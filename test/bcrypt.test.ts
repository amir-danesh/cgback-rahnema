import *as bcrypt from 'bcrypt';
import { UserService } from '../src/modules/user/user.service';
import {AppDataSource} from "../src/utility/data-source";
import {UserEntity} from "../src/modules/user/entity/user.entity";
import {UserRepository} from "../src/modules/user/user.repository";
describe.skip('bcrypt', () => {
    describe('compare plan password with has password',() => {
        it('should be passed if password is same',async () => {
            const userRepo = new UserRepository(await AppDataSource.initialize());

            const userService = new UserService(userRepo);
            const password = '123';
            const hashPassword = bcrypt.hashSync(password, 10);
            const result =userService.comparePassword(password, hashPassword);
            expect(result).toBeTruthy();
        });
        it.skip('should be failed if password is not same',async () => {
            const userRepo = new UserRepository(await AppDataSource.initialize());

            const userService = new UserService(userRepo);
            const password = '123';
            const hashPassword = bcrypt.hashSync(password, 10);
            const result =userService.comparePassword('1234', hashPassword);
            expect(result).toBeFalsy();
        }
        );
    })
})