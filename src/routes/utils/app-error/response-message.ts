export const response_signup = {
    SUCCESSFUL_MESSAGE: "user added successfully",
    EMAIL_EXIST_MESSAGE: "email already signed up",
    USERNAME_EXIST_MESSAGE: "username is used by another user",
};

export const response_login = {
    SUCCESSFUL_MESSAGE: "user logged in successfully",
    INCORRECT_INPUT: "loginIdentifier or password is not correct",
};

export const response_change_password = {
    SUCCESSFUL_MESSAGE: "user password changed successfully",
    USER_NOT_FOUND: "user not found",
};

export const response_user_info = {
    SUCCESSFUL_MESSAGE: "user information received successfully",
    USER_NOT_FOUND: "user not found",
};

export const response_check_password = {
    SERVER_MESSAGE: "cannot compare passwords",
};

export const response_reset_password = {
    EMAIL_NOT_FOUND: "email not found",
    SUCCESSFUL_MESSAGE: "password changed successfully",
}

export const serverErrors = {
    FAILED_TO_HASH_PASSWORD: "failed to hash password",
    FAILED_TO_CREATE_USER: "something went wrong while creating user",
    FAILED_TO_COMPARE_PASSWORDS: "cannot compare passwords",
    FAILED_TO_CHANGE_PASSWORD: "something went wrong with changing password",
    FAILED_TO_ACCESS_TKOEN: "something went wrong with changing password",
}

export const authenticationError = {
    TOKEN_NOT_FOUND: "token not specified",
    AUTHENTICATION_ERROR: "User is not authorized to access",
}

export const resetPasswordEmailAuthenticationError = {
    TOKEN_NOT_FOUND: "there is some problem with email service token",
    AUTHENTICATION_ERROR: "User is not authorized to access",
}