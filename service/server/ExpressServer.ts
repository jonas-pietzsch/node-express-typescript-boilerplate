import * as express from 'express'
import { Express, NextFunction, Response, Request } from 'express'
import { Server } from 'http'
import * as fse from 'fs-extra'
import * as compress from 'compression'
import * as helmet from 'helmet'
import * as hpp from 'hpp'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as RateLimit from 'express-rate-limit'

import { noCache } from './middlewares/NoCacheMiddleware'
import DatadogStatsdMiddleware from './middlewares/DatadogStatsdMiddleware'
import { CatEndpoints } from './cats/CatEndpoints'
import { RequestServices } from './types/CustomRequest'
import { addServicesToRequest } from './middlewares/ServiceDependenciesMiddleware'
import { Environment } from './Environment'
import { FrontendContext } from '../shared/FrontendContext'
import { applyFeatureToggles } from './middlewares/feature-toggles/setupFeatureToggles'

/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer {
    private server?: Express
    private cssFiles?: string[]
    private httpServer?: Server

    constructor(private catEndpoints: CatEndpoints, private requestServices: RequestServices) {}

    public async setup(port: number) {
        const server = express()
        this.setupStandardMiddlewares(server)
        this.setupSecurityMiddlewares(server)
        this.setupFeatureToggles(server)
        this.applyWebpackDevMiddleware(server)
        this.setupTelemetry(server)
        this.setupServiceDependencies(server)
        this.configureEjsTemplates(server)
        this.configureFrontendPages(server)
        this.configureApiEndpoints(server)
        this.configureFrontendEndpoints(server)

        this.httpServer = this.listen(server, port)
        this.server = server
        return this.server
    }

    public listen(server: Express, port: number) {
        console.info(`Starting server on port ${port}`)
        return server.listen(port)
    }

    public kill() {
        if (this.httpServer) this.httpServer.close()
    }

    private setupSecurityMiddlewares(server: Express) {
        server.use(hpp())
        server.use(helmet())
        server.use(helmet.referrerPolicy({ policy: 'same-origin' }))
        server.use(helmet.noCache())
        server.use(
            helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'unsafe-inline'"],
                    scriptSrc: ["'unsafe-inline'", "'self'"]
                }
            })
        )
    }

    private setupStandardMiddlewares(server: Express) {
        server.use(bodyParser.json())
        server.use(cookieParser())
        server.use(compress())

        const baseRateLimitingOptions = {
            windowMs: 15 * 60 * 1000, // 15 min in ms
            max: 1000,
            message: 'Our API is rate limited to a maximum of 1000 requests per 15 minutes, please lower your request rate'
        }
        server.use('/api/', new RateLimit(baseRateLimitingOptions))
    }

    private setupFeatureToggles(server: Express) {
        applyFeatureToggles(server)
    }

    private configureEjsTemplates(server: Express) {
        server.set('views', ['resources/views'])
        server.set('view engine', 'ejs')
    }

    private setupTelemetry(server: Express) {
        DatadogStatsdMiddleware.applyTo(server, Environment.getDatadogOptions())
    }

    private setupServiceDependencies(server: Express) {
        const servicesMiddleware = addServicesToRequest(this.requestServices)
        server.use(servicesMiddleware)
    }

    private configureFrontendPages(server: Express) {
        this.prepareAssets()
        this.configureStaticAssets(server)

        const context: FrontendContext = {
            cssFiles: this.cssFiles,
            config: {
                welcomePhrases: ['Bienvenue', 'Welcome', 'Willkommen', 'Welkom', 'Hoş geldin', 'Benvenuta', 'Bienvenido']
            }
        }
        const renderPage = (template: string) => async (req: Request, res: Response, _: NextFunction) => {
            res.type('text/html').render(template, context)
        }

        server.get('/', noCache, renderPage('index'))
    }

    private configureStaticAssets(server: Express) {
        if (Environment.isProd()) {
            server.use([/(.*)\.js\.map$/, '/'], express.static('www/'))
        } else {
            server.use('/', express.static('www/'))
        }

        server.use('/', express.static('resources/img/'))
    }

    private applyWebpackDevMiddleware(server: Express) {
        if (Environment.isLocal()) {
            const config = require('../../webpack.config.js')
            const compiler = require('webpack')(config)

            const webpackDevMiddleware = require('webpack-dev-middleware')
            server.use(
                webpackDevMiddleware(compiler, {
                    hot: true,
                    publicPath: config.output.publicPath,
                    compress: true,
                    host: 'localhost',
                    port: Environment.getPort()
                })
            )

            const webpackHotMiddleware = require('webpack-hot-middleware')
            server.use(webpackHotMiddleware(compiler))
        }
    }

    private async prepareAssets() {
        if (Environment.isLocal()) {
            this.cssFiles = []
        } else {
            const isomorphicAssets: any = JSON.parse(await fse.readFile('www/static/media/isomorphic-assets.json', 'utf-8'))
            this.cssFiles = isomorphicAssets.chunks.app.filter((path: string) => path.endsWith('.css'))
        }
    }

    private configureApiEndpoints(server: Express) {
        const strictRateLimit = new RateLimit({
            windowMs: 15 * 60 * 1000, // 15 min in ms
            max: 200,
            message: 'This endpoint has a stricter rate limiting of a maximum of 200 requests per 15 minutes window, please lower your request rate'
        })

        server.get('/api/cat', noCache, this.catEndpoints.getAllCats)
        server.get('/api/statistics/cat', noCache, strictRateLimit, this.catEndpoints.getCatsStatistics)
        server.get('/api/cat/:catId', noCache, this.catEndpoints.getCatDetails)
    }

    private configureFrontendEndpoints(server: Express) {
        const forbidExternalFrontends = cors({ origin: false })

        server.get('/internal/cat', forbidExternalFrontends, noCache, this.catEndpoints.getAllCats)
    }
}
