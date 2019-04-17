/* tslint:disable no-namespace */
import 'express'
import { CatService } from '../cats/CatService'

export interface RequestServices {
    catService: CatService
}

declare global {
    namespace Express {
        interface Request {
            services: RequestServices
        }
    }
}
