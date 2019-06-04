import * as sinon from 'sinon'
import { expect } from 'chai'
import { CatService } from './CatService'
import { exampleCats } from './exampleCats'

describe('CatService', () => {
    const sandbox = sinon.createSandbox()
    let catService: CatService
    let catRepository: any
    
    beforeEach(() => {
        catRepository = { getAll: sandbox.stub().returns(exampleCats) }
        catService = new CatService(catRepository)
    })

    describe('getCatsStatistics', () => {
        it('should reflect the total amount of cats', () => {
            expect(catService.getCatsStatistics().amount).to.eq(5)
        })

        it('should calculate the average age of all cats', () => {
            expect(catService.getCatsStatistics().averageAge).to.eq(69.2)
        })

        it('should calculate an average age of zero if the amount of cats is zero', () => {
            catRepository.getAll.returns([])
            expect(catService.getCatsStatistics()).to.deep.equal({
                amount: 0,
                averageAge: 0
            })
        })
    })
})