import { Request, Response } from "express";
import { AppError, handleError } from "../../errors";
import { IDvdCreate } from "../../interfaces/dvd";
import createDvdService from "../../services/dvd/createDvd.service";

const createDvdController = async (req: Request, res: Response) => {
  try {
    const { dvds, userEmail } = req.body;
    const allDvds = [];

    await dvds.map(async (dvd: IDvdCreate) =>
      allDvds.push(
        await createDvdService({
          name: dvd.name,
          duration: dvd.duration,
          price: dvd.price,
          quantity: dvd.quantity,
          userEmail,
        })
      )
    );

    return res.status(201).send(allDvds);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default createDvdController;
