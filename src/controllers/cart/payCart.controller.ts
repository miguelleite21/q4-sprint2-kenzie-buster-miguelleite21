import { Request, Response } from "express";
import payCartService from "../../services/cart/payCart.seervice";

const payCartController = async (req: Request, res: Response) => {
  const { userEmail } = req.body;
  const cart = await payCartService(userEmail);

  return res.status(200).send(cart);
};
export default payCartController;
