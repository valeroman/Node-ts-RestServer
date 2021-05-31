import { Request, Response } from "express";
import { validationResult } from "express-validator";

const validField = (req: Request, res: Response, next: any) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();

}

export default validField;