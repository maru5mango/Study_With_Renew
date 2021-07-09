export {};

import 'express';

declare global{
    namespace Express{
        export interface Request extends Express.Request{
            user?: import("../server/models/User.interface").IUserMethods;
            token?: String,
        }
    }
}