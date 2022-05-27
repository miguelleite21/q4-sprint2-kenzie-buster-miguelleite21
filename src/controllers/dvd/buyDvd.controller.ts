import { Request, Response } from "express";
import { AppError, handleError } from "../../errors";
import buyDvdService from "../../services/dvd/buyDvd.service";

const buyDvdController = async (req: Request, res: Response) => {
  try {
    const { userEmail, quantity } = req.body;
    const { id } = req.params;
    const cart = await buyDvdService({
      userEmail,
      quantity,
      id,
    });

    return res.status(200).send(cart);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default buyDvdController;
