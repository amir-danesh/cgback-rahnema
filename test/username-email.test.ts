import {usernameEmailHandler, usernameIsValidate} from "../src/utility/username-email.handler";


describe('Username and Email', () => {
    it('should be passed if username is valid', () => {
        const username = 'admin';
        const result = usernameIsValidate(username);
        expect(result).toBeTruthy();
    });
    it('should be failed if username is not valid', () => {
        const username = '123admin';
        const result = usernameIsValidate(username);
        expect(result).toBeFalsy();
    });
    it('should be passed if email is valid', () => {
        const email = 'm@m.com';
        const result = usernameEmailHandler(email);
        expect(result).toBeTruthy();
    });
}
)
