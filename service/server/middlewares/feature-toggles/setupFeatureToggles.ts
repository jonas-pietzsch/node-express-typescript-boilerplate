import { Express, NextFunction, Response, Request } from 'express'
import * as fflip from 'fflip'
import * as FFlipExpressIntegration from 'fflip-express'
import { criteria } from './criteria'
import { features } from './features'

export const applyFeatureToggles = (server: Express) => {
    fflip.config({ criteria, features })
    const fflipExpressIntegration = new FFlipExpressIntegration(fflip, {
        cookieName: 'fflip',
        manualRoutePath: '/api/toggles/local/:name/:action'
    })

    server.use(fflipExpressIntegration.middleware)
    server.use((req: Request, _: Response, next: NextFunction) => {
        try {
            req.fflip.setForUser(req.user)
        } catch (err) {
            console.error('Error while binding feature toggles to req.user')
        }
        next()
    })
}
