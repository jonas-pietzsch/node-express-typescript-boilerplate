import { DatadogStatsdConfig } from './middlewares/DatadogStatsdMiddleware'

export class Environment {
    public static isLocal(): boolean {
        return Environment.getStage() === 'local'
    }

    public static isStaging(): boolean {
        return Environment.getStage() === 'staging'
    }

    public static isProd(): boolean {
        return Environment.getStage() === 'prod'
    }

    public static getStage(): string {
        return process.env.STAGE || 'local'
    }

    public static getPort(): number {
        return (process.env.PORT as any) || 8000
    }

    public static getVerticalName() {
        return process.env.VERTICAL_NAME || 'cats'
    }

    public static getServiceName() {
        return process.env.SERVICE_NAME || 'cats-provider'
    }

    public static getDatadogOptions(): DatadogStatsdConfig {
        return {
            targetHost: process.env.DATADOG_HOST || 'https://datadog.mycompany.com',
            enableTelemetry: process.env.ENABLE_DATADOG_TELEMETRY === 'true' || false,
            tags: [`team:${Environment.getVerticalName()}`, `product:${Environment.getServiceName()}`]
        }
    }
}
