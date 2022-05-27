import { Request, Response } from "express";
import createUserService from "../../services/user/createUser.service";
import { AppError, handleError } from "../../errors";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm, adm } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const newUser = await createUserService({
      name,
      email,
      password,
      isAdm,
      adm,
      token,
    });
    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default createUserController;
