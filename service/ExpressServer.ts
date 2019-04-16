import * as express from 'express'
import { Express } from 'express'
import { Server } from 'http'

/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer {
    private server?: Express
    private httpServer?: Server

    public async setup(port: number) {
        const server = express()
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
}
