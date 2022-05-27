import { ILogin } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUserService = async ({ email, password }: ILogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const user = users.find((user) => user.email === email);
  const error = [];

  if (!email) {
    error.push("email is a required field");
  }
  if (!password) {
    error.push("password is a required field");
  }
  if (error.length > 0) {
    throw new AppError(400, error);
  }
  if (!user) {
    throw new AppError(404, `User not found`);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError(401, "Wrong email/password");
  }

  const token = jwt.sign({ email: email }, String(process.env.JWT_SECRET), {
    expiresIn: "1d",
  });

  return token;
};

export default loginUserService;
