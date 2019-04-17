import { NextFunction, Request, Response } from 'express'
import * as HttpStatus from 'http-status-codes'

export class CatEndpoints {
    public getCatDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // usually we will contact some service here and do some logic
            const catId = req.params.catId

            if (catId >= 90) {
                res.json({ catId, name: 'Some lovely Kitty' })
            } else {
                res.sendStatus(HttpStatus.NOT_FOUND)
            }
        } catch (err) {
            // something could fail unexpectedly...
            // at some point the middleware chain should handle errors
            next(err)
        }
    }
}
