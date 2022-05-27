import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { User } from "../../entities/user.entity";
import { IDvdBuy } from "../../interfaces/dvd";
import { Dvd } from "../../entities/dvd.entity";
import { Cart } from "../../entities/cart.entity";

const buyDvdService = async ({ quantity, userEmail, id }: IDvdBuy) => {
  const userRepository = AppDataSource.getRepository(User);
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const cartRepository = AppDataSource.getRepository(Cart);
  if (!quantity) {
    throw new AppError(400, "quantity is a required field");
  }

  const accont = await userRepository.findOne({
    where: {
      email: userEmail,
    },
  });
  const dvd = await dvdRepository.findOne({
    where: {
      id: id,
    },
  });

  const cart = await cartRepository.findOne({
    where: {
      paid: false,
      user: accont!,
    },
  });

  if (!dvd) {
    throw new AppError(404, "dvd not found");
  }
  if (dvd?.stock.quantity < quantity) {
    throw new AppError(
      404,
      `current stock: ${dvd.stock.quantity}, received demand ${quantity}`
    );
  }
  if (cart?.dvd.find((dvd) => dvd.id === id)) {
    throw new AppError(400, `dvd: ${dvd.name}, already in cart`);
  }
  if (cart) {
    dvd.userQuantity = quantity;
    const total = quantity * dvd.stock.price;
    cart.dvd = [...cart!.dvd, dvd];
    cart.total = cart.total + total;
    await dvdRepository.save(dvd);
    await cartRepository.save(cart);
    return cart;
  }
};

export default buyDvdService;
