import { AppDataSource } from "../../data-source";
import { IDvdCreate } from "../../interfaces/dvd";
import { Dvd } from "../../entities/dvd.entity";
import { Stock } from "../../entities/stock.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const createDvdService = async ({
  name,
  duration,
  price,
  quantity,
  userEmail,
}: IDvdCreate) => {
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const stockRepository = AppDataSource.getRepository(Stock);
  const userRepository = AppDataSource.getRepository(User);
  const error = [];

  const user = await userRepository.findOne({
    where: {
      email: userEmail,
    },
  });

  const dvds = await dvdRepository.findOne({
    where: {
      name: name,
    },
  });

  if (!user.isAdm) {
    throw new AppError(400, "missing admin permision");
  }

  if (!name) {
    error.push("name is a required field");
  }
  if (!duration) {
    error.push("duration is a required field");
  }
  if (!price) {
    error.push("price is a required field");
  }
  if (!quantity) {
    error.push("quantity is a required field");
  }
  if (error.length > 0) {
    throw new AppError(400, error);
  }
  if (dvds) {
    throw new AppError(409, `dvd: '${name}' already exists`);
  }
  const stock = new Stock();
  stock.price = price;
  stock.quantity = quantity;
  stockRepository.create(stock);
  await stockRepository.save(stock);

  const dvd = new Dvd();
  dvd.name = name;
  dvd.duration = duration;
  dvd.stock = stock;

  dvdRepository.create(dvd);
  await dvdRepository.save(dvd);
  return dvd;
};

export default createDvdService;
