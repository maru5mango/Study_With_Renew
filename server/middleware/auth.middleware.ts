import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { IUserMethods } from '../models/User.interface';

export let auth = (req:Request, res:Response, next: NextFunction) => {
    let token: string = req.cookies.U_auth;
    User.findByToken(token, (err: Error, user: IUserMethods) => {
        if(err) throw err;
        if(!user)
            return res.json({
                isAuth: false,
                error: true
            });
        req.token = token;
        req.user = user;
        next();
    });
}