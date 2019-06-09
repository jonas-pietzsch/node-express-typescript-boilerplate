import { NextFunction, Request, Response } from 'express'
import * as HttpStatus from 'http-status-codes'

export class CatEndpoints {
    public getCatDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const catId = req.params.catId
            const cat = req.services.catService.getCat(catId)

            if (cat) {
                res.json(cat)
            } else {
                res.sendStatus(HttpStatus.NOT_FOUND)
            }
        } catch (err) {
            // something could fail unexpectedly...
            // at some point the middleware chain should handle errors
            next(err)
        }
    }

    public getAllCats = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(req.services.catService.getAllCats())
        } catch (err) {
            next(err)
        }
    }

    public getCatStatistics = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(req.services.catService.getCatsStatistics())
        } catch (err) {
            next(err)
        }
    }
}
