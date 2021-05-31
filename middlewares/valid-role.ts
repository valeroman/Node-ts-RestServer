import { Request, Response } from "express";


export const isAdminRole = (req: Request, res: Response, next: any) => {

    if (!req.user) {
        return res.status(401).json({
            msg: 'You want to verify the role without validating the token first'
        });
    } 

    const { name, role } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ name } not an administrator - can't do this`
        });
    }

    next();
}

export const tieneRole = ([...roles]) => {

    return (req: Request, res: Response, next: any) => {

        if (!req.user) {
            return res.status(401).json({
                msg: 'You want to verify the role without validating the token first'
            });
        } 

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `The service requires one of these roles ${ roles }`
            });
        }

        next();
    }

    
}