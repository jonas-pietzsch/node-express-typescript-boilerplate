/* tslint:disable no-namespace */
declare module 'fflip' {

    class FFlip { }

    namespace FFlip {
        type GetFeaturesSync = () => Feature[]
        type GetFeaturesAsync = (callback: (features: Feature[]) => void) => void
        type CriteriaConfig = StringMap | StringMap[]

        export interface Config {
            criteria: Criteria[]
            features: Feature[] | GetFeaturesSync | GetFeaturesAsync
            reload?: number
        }

        export interface Criteria {
            id: string
            check(user: any, config: any): boolean
        }

        export interface Feature {
            id: string
            criteria?: CriteriaConfig
            enabled?: boolean
            [s: string]: any
        }

        export interface Features {
            [featureName: string]: boolean
        }

        export interface StringMap {
            $veto?: boolean
            [s: string]: any
        }

        export function config(config: Config): void
        export function isFeatureEnabledForUser(featureName: string, user: any): boolean
        export function getFeaturesForUser(user: any): Features
        export function reload(): void
    }

    export = FFlip
}
