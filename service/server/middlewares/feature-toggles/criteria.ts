import * as fflip from 'fflip'

export const criteria: fflip.Criteria[] = [
    {
        id: 'isPaidUser',
        check: (user: any, needsToBePaid: boolean) => user && user.isPaid === needsToBePaid
    },
    {
        id: 'shareOfUsers',
        check: (user: any, share: number) => user && user.id % 100 < share * 100
    }
]
