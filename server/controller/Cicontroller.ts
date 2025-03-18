import { Request, Response } from 'express';
import Ci from '../model/Ci_model';

interface cirequest extends Request {
    body: {
        user: {
            _id: string;
            username: string;
            phone: string;
            email: string;
        };
        Customer_info: {
            Customer_name: string;
            Customer_address: string;
            Customer_phone: string;
            Customer_email: string;
        };
        Old_Meter_info: {
            Meter_id: string;
            Meter_type: string;
            Meter_kwh: string;
            Meter_kvah: string;
            Meter_status: string;
        };
        request_status: "pending" | "completed";
    };
  };
  

export const cirequestcontroller = async (req: cirequest, res: Response): Promise<void> => {
    try {
        const { user, Customer_info, Old_Meter_info } = req.body;
        const newCi = new Ci({
            user,
            Customer_info,
            Old_Meter_info,
            request_status: 'pending'
        });
        await newCi.save();
        res.status(201).json({ message: 'CI request created successfully' });

    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


