import { Express } from 'express'
import * as StatsD from 'hot-shots'
import * as connectDatadog from 'connect-datadog'

export interface DatadogStatsdConfig {
    targetHost: string
    enableTelemetry: boolean
    tags: string[]
}

export default class DatadogStatsdMiddleware {
    public static applyTo(server: Express, config: DatadogStatsdConfig) {
        const statsdClient = DatadogStatsdMiddleware.createStatsdClient({
            host: config.targetHost,
            mock: !config.enableTelemetry
        })

        const datadogStatsdMiddleware = connectDatadog({
            dogstatsd: statsdClient,
            tags: config.tags,
            path: false,
            method: true,
            response_code: false
        })

        server.use(datadogStatsdMiddleware)
    }

    private static createStatsdClient(options?: StatsD.ClientOptions) {
        const statsdClient = new StatsD(options)
        statsdClient.socket.on('error', (err: any) => {
            console.error('Error sending datadog stats', err)
        })
        return statsdClient
    }
}
