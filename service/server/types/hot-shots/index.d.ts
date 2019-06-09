declare module 'hot-shots' {
    namespace StatsD {
        export interface ClientOptions {
            host?: string
            port?: number
            prefix?: string
            suffix?: string
            globalize?: boolean
            cacheDns?: boolean
            mock?: boolean
            globalTags?: string[]
            maxBufferSize?: number
            bufferFlushInterval?: number
            telegraf?: boolean
            sampleRate?: number
            errorHandler?: (err: Error) => void
        }

        export interface CheckOptions {
            date_happened?: Date
            hostname?: string
            message?: string
        }

        export interface DatadogChecks {
            OK: 0
            WARNING: 1
            CRITICAL: 2
            UNKNOWN: 3
        }

        type unionFromInterfaceValues4<
            T,
            K1 extends keyof T,
            K2 extends keyof T,
            K3 extends keyof T,
            K4 extends keyof T
            > = T[K1] | T[K2] | T[K3] | T[K4]

        export type DatadogChecksValues = unionFromInterfaceValues4<DatadogChecks, 'OK', 'WARNING', 'CRITICAL', 'UNKNOWN'>

        export interface EventOptions {
            aggregation_key?: string
            alert_type?: 'info' | 'warning' | 'success' | 'error'
            date_happened?: Date
            hostname?: string
            priority?: 'low' | 'normal'
            source_type_name?: string
        }

        export type StatsCb = (error: Error | undefined, bytes: any) => void
        export type StatsCall = (stat: string | string[], value: number, sampleRate?: number, tags?: string[], callback?: StatsCb) => void
    }

    // tslint:disable-next-line:no-shadowed-variable
    class StatsD {
        public CHECKS: StatsD.DatadogChecks
        public socket: NodeJS.Socket

        constructor(options?: StatsD.ClientOptions)
        public increment(stat: string): void
        public increment(stat: string | string[], value: number, sampleRate?: number, tags?: string[], callback?: StatsD.StatsCb): void

        public decrement(stat: string): void
        public decrement(stat: string | string[], value: number, sampleRate?: number, tags?: string[], callback?: StatsD.StatsCb): void

        public timing(stat: string | string[], value: number, sampleRate?: number, tags?: string[], callback?: StatsD.StatsCb): void
        public histogram(stat: string | string[], value: number, sampleRate?: number, tags?: string[], callback?: StatsD.StatsCb): void
        public gauge(stat: string | string[], value: number, sampleRate?: number, tags?: string[], callback?: StatsD.StatsCb): void
        public set(stat: string | string[], value: number, sampleRate?: number, tags?: string[], callback?: StatsD.StatsCb): void
        public unique(stat: string | string[], value: number, sampleRate?: number, tags?: string[], callback?: StatsD.StatsCb): void

        public close(callback: () => void): void

        public event(title: string, text?: string, options?: StatsD.EventOptions, tags?: string[], callback?: StatsD.StatsCb): void
        public check(name: string, status: StatsD.DatadogChecksValues, options?: StatsD.CheckOptions, tags?: string[], callback?: StatsD.StatsCb): void
    }

    export = StatsD
}
