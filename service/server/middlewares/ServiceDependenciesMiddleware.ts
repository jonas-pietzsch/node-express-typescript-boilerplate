import { Request, Response, NextFunction, RequestHandler } from 'express'
import { RequestServices } from '../types/CustomRequest'

export const addServicesToRequest = (services: RequestServices): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
    (req as any).services = services
    next()
}
