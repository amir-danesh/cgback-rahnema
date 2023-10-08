import { makeApp } from "./api";
import { AppDataSource } from "./data-source";
import { User } from "./modules/user/model/user";
import { seedData } from "./utility/seedData";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

AppDataSource.initialize()
  .then(() => {
    const app = makeApp(AppDataSource);
    app.listen(process.env.PORT, () => {
      console.log("listening on port : " + process.env.PORT);
    });
  });
