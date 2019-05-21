/* tslint:disable no-namespace */

declare module 'fflip-express' {
    import * as FFlip from 'fflip'
    import { CookieOptions, Handler } from 'express'

    class FFlipExpressIntegration {
        public middleware: Handler
        public manualRoute: Handler
        constructor(fflip: FFlip, options: FFlipExpressIntegration.Options)
    }

    namespace FFlipExpressIntegration {
        export interface Options {
            cookieName?: string
            cookieOptions?: CookieOptions
            manualRoutePath?: string
        }
    }

    export = FFlipExpressIntegration
}
