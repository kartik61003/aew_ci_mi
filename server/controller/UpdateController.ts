import { Request, Response } from 'express';
import Ci from '../model/Ci_model';

export const markdonecontroller = async (req: Request, res: Response): Promise<void> => {
    try {
        // Ensure correct extraction of requestId
        const requestId = req.body._id;

        if (!requestId) {
             res.status(400).json({ message: "requestId is required" });
        }

        const updatedCi = await Ci.findByIdAndUpdate(
            requestId, 
            { ...req.body }, 
            { new: true } // Ensures we get the updated document
        );

        if (!updatedCi) {
            res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json({ message: 'Request marked as done', data: updatedCi });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
