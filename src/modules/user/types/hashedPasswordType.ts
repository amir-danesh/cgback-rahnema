// import { ServerInternalError } from "../../../services/app-error/errors";
// import { serverErrors } from "../../../services/app-error/response-message";
// import { Password } from "./passwordType";
// import bcrypt from "bcrypt";

// export type HashedPassword = string & { __brand: "HashedPassword" };
// export module HashedPassword {
//   export const mk = async (password: Password): Promise<HashedPassword> => {
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     if (!hashedPassword)
//       throw new ServerInternalError(serverErrors.FAILED_TO_HASH_PASSWORD);
//     return hashedPassword as HashedPassword;
//   };
// }
