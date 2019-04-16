import * as express from 'express'
import { Express} from 'express'
import { Server } from 'http'

export class ExpressServer {
    private server?: Express
    private httpServer?: Server

    public async setup(port: number) {
        const server = express()
        this.httpServer = this.listen(server, port)
        this.server = server
        return this.server
    }

    public  listen(server: Express, port: number) {
        return server.listen(port)
    }

    public kill() {
        if (this.httpServer) this.httpServer.close()
    }
}