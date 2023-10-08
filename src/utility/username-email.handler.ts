
export const usernameEmailHandler = (username:string):boolean => {
    const emailRegex = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    return emailRegex.test(username);
}
export const usernameIsValidate = (username:string):boolean => {
    const usernameRegex = new RegExp(/^(?![\d@])[^-\s]{2,62}$/);
    return usernameRegex.test(username);
}