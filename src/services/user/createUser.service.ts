import { IUserCreate } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { User } from "../../entities/user.entity";
import { Cart } from "../../entities/cart.entity";
import bcrypt from "bcrypt";

const createUserService = async ({
  name,
  email,
  password,
  isAdm = false,
  userEmail,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);
  const error = [];

  if (!name) {
    error.push("name is a required field");
  }
  if (!email) {
    error.push("email is a required field");
  }
  if (!password) {
    error.push("password is a required field");
  }
  if (error.length > 0) {
    throw new AppError(400, error);
  }
  if (emailAlreadyExists) {
    throw new AppError(409, `Key (email)=(${email}) already exists.`);
  }

  if (isAdm !== false) {
    const userAdm = users.find((user) => user.email === userEmail);
    if (!userAdm.isAdm) {
      throw new AppError(401, "missing admin permision");
    }
  }

  const cart = new Cart();
  cart.total = 0;
  cart.paid = false;
  cart.dvd = [];
  cartRepository.create(cart);
  await cartRepository.save(cart);

  const user = new User();
  user.name = name;
  user.email = email.toLowerCase();
  user.password = bcrypt.hashSync(password, 10);
  user.isAdm = isAdm;
  user.carts = [cart];

  userRepository.create(user);
  await userRepository.save(user);
  user.password = "";
  return user;
};

export default createUserService;
