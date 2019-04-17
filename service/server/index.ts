import { Application } from './Application'

/**
 * Entrypoint for bootstrapping and starting the application.
 * Might configure aspects like logging, telemetry, memory leak observation or even orchestration before.
 * This is about to come later!
 */

Application.createApplication().then(() => {
    console.info('The application was started! Kill it using Ctrl + C')
})
