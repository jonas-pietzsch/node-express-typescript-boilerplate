import { NextFunction, Request, Response } from 'express'
import * as HttpStatus from 'http-status-codes'
import { FeatureToggles } from '../middlewares/feature-toggles/features'

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

    public getCatsStatistics = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.fflip.has(FeatureToggles.WITH_CAT_STATISTICS)) {
                res.json(req.services.catService.getCatsStatistics())
            } else {
                res.sendStatus(HttpStatus.NOT_FOUND)
            }
        } catch (err) {
            next(err)
        }
    }
}
