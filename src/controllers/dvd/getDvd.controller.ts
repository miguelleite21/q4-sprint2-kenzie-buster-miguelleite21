import { Request, Response } from "express";
import getDvdService from "../../services/dvd/getDvd.service";

const getDvdController = async (req: Request, res: Response) => {
  const dvds = await getDvdService();

  return res.status(200).send(dvds);
};
export default getDvdController;
