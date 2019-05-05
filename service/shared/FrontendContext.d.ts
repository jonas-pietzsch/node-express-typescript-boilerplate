export interface FrontendConfig {
    welcomePhrases: string[]
}

export interface FrontendContext {
    cssFiles?: string[]
    config: FrontendConfig
}
