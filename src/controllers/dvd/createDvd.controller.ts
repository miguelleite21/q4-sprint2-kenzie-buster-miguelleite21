import { Request, Response } from "express";
import { AppError, handleError } from "../../errors";
import createDvdService from "../../services/dvd/createDvd.service";

const createDvdController = async (req: Request, res: Response) => {
  console.log(1);
  try {
    const { name, duration, price, quantity } = req.body;
    const token = req.headers.authorization;
    const newDvd = await createDvdService({
      name,
      duration,
      price,
      quantity,
      token,
    });
    console.log(3);
    return res.status(201).send(newDvd);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default createDvdController;
