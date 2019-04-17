import * as express from 'express'
import { Express } from 'express'
import { Server } from 'http'
import * as compress from 'compression'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

import { noCache } from './middlewares/NoCacheMiddleware'
import DatadogStatsdMiddleware from './middlewares/DatadogStatsdMiddleware'
import { CatEndpoints } from './cats/CatEndpoints'

/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer {
    private server?: Express
    private httpServer?: Server

    constructor(private catEndpoints: CatEndpoints) {}

    public async setup(port: number) {
        const server = express()
        this.setupStandardMiddlewares(server)
        this.setupTelemetry(server)
        this.configureApiEndpoints(server)

        this.httpServer = this.listen(server, port)
        this.server = server
        return this.server
    }

    public listen(server: Express, port: number) {
        return server.listen(port)
    }

    public kill() {
        if (this.httpServer) this.httpServer.close()
    }

    private setupStandardMiddlewares(server: Express) {
        server.use(bodyParser.json())
        server.use(cookieParser())
        server.use(compress())
    }

    private setupTelemetry(server: Express) {
        DatadogStatsdMiddleware.applyTo(server, {
            targetHost: 'https://datadog.mycompany.com',
            enableTelemetry: false,
            tags: ['team:cats', 'product:cats-provider']
        })
    }

    private configureApiEndpoints(server: Express) {
        server.get('/api/cat/:catId', noCache, this.catEndpoints.getCatDetails)
    }
}
