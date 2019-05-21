// tslint:disable no-implicit-dependencies

import 'express-serve-static-core'

declare module 'express-serve-static-core' {
    interface Request {
        fflip: {
            features: { [s: string]: boolean }
            setForUser(user: any): void
            has(featureName: string): boolean
        }
        user?: any
    }
}
