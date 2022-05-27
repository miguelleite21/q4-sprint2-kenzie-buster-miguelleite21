import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Cart } from "../../entities/cart.entity";
import { Dvd } from "../../entities/dvd.entity";
import { Stock } from "../../entities/stock.entity";

const payCartService = async (userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const stockRepository = AppDataSource.getRepository(Stock);

  const accont = await userRepository.findOne({
    where: {
      email: userEmail,
    },
  });
  const cart = await cartRepository.findOne({
    where: {
      paid: false,
      user: accont!,
    },
  });

  const newCart = new Cart();
  newCart.total = 0;
  newCart.paid = false;
  newCart.dvd = [];
  cartRepository.create(newCart);
  await cartRepository.save(newCart);

  if (accont) {
    accont.carts = [...accont.carts, newCart];
    await userRepository.save(accont);
  }
  if (cart) {
    cart.dvd.map(async (dvd) => {
      dvd.stock.quantity -= dvd.userQuantity;
      await stockRepository.save(dvd.stock);
    });
    cart.paid = true;
    await dvdRepository.save(cart.dvd);
    await cartRepository.save(cart);
  }

  return cart;
};

export default payCartService;
