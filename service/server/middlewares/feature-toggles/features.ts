import * as fflip from 'fflip'

export const FeatureToggles: { [ key: string ]: string } = {
    CLOSED_BETA: 'CLOSED_BETA',
    WITH_CAT_STATISTICS: 'WITH_CAT_STATISTICS'
}

export const features: fflip.Feature[] = [
    {
        id: FeatureToggles.CLOSED_BETA,
        criteria: { isPaidUser: true, shareOfUsers: 0.5 }
    },
    {
        id: FeatureToggles.WITH_CAT_STATISTICS,
        enabled: true
    }
]
