import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

export const admVerify = async (token: string = "") => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  let adm = false;
  if (!token) {
    return adm;
  }

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return adm;
      }
      const accont = users.find((user: any) => user.email === decoded.email);
      if (accont) {
        return (adm = accont.isAdm);
      }
    }
  );
};
