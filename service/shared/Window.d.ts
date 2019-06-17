import { FrontendConfig } from './FrontendContext'

declare global {
    interface Window {
        config: FrontendConfig
    }
}
