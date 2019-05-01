export class Environment {
    public static isLocal(): boolean {
        return Environment.getStage() === 'local'
    }

    public static isProd(): boolean {
        return Environment.getStage() === 'prod'
    }

    public static getStage(): string {
        return process.env.STAGE || 'local'
    }

    public static getPort(): number {
        return process.env.PORT as any || 8000
    }
}