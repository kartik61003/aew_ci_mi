import { Request, Response } from 'express';
import Ci from '../model/Ci_model';



export const getmirequestcontroller = async (req: Request, res: Response): Promise<void> => {
    try {
      const cirequest = await Ci.find().populate("user", "username phone email").lean();

      res.status(200).json(cirequest);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };