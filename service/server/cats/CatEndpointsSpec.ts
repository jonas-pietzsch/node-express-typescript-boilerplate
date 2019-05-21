import * as sinon from 'sinon'
import { expect } from 'chai'
import * as HttpStatus from 'http-status-codes'
import ExpressMocks, { Mocks } from 'expressmocks'
import { CatEndpoints } from './CatEndpoints'
import { exampleCats } from './exampleCats'

describe('CatEndpoints', () => {
    const sandbox = sinon.createSandbox()
    let sampleRequest: any
    let catService: any
    let endpoints: CatEndpoints

    beforeEach(() => {
        endpoints = new CatEndpoints()
        catService = {
            getCat: sandbox.stub(),
            getAllCats: sandbox.stub().returns(exampleCats),
            getCatsStatistics: sandbox.stub().returns({ amount: 30, averageAge: 50 })
        }
        sampleRequest = {
            services: { catService },
            params: { catId: 1 },
            fflip: {
                has: sandbox.stub().returns(true)
            }
        }
    })

    describe('getCatDetails', () => {
        it('should ask the underlying service for the cat', () => {
            return ExpressMocks.create(sampleRequest)
                .test(endpoints.getCatDetails)
                .then(() => expect(catService.getCat).to.have.been.calledWith(1))
        })

        it('should return the cat as JSON response if it could be found by the service', () => {
            catService.getCat.withArgs(1).returns({ id: 1, name: 'Sample Cat' })

            return ExpressMocks.create(sampleRequest)
                .test(endpoints.getCatDetails)
                .expectJson({ id: 1, name: 'Sample Cat' })
        })

        it('should send only the 404 status if the cat could not be found', () => {
            catService.getCat.withArgs(1).returns(undefined)

            return ExpressMocks.create(sampleRequest)
                .test(endpoints.getCatDetails)
                .expectSendStatus(HttpStatus.NOT_FOUND)
        })

        it('should handle thrown errors by passing them to NextFunction', () => {
            const thrownError = new Error('Some problem with accessing the data')
            catService.getCat.throws(thrownError)

            return ExpressMocks.create(sampleRequest)
                .test(endpoints.getCatDetails)
                .expectNext(thrownError)
        })
    })

    describe('getAllCats', () => {
        it('should return all cats as JSON response', () => {
            return ExpressMocks.create(sampleRequest)
                .test(endpoints.getAllCats)
                .expectJson(exampleCats)
        })

        it('should handle thrown errors by passing them to NextFunction', () => {
            const thrownError = new Error('Some problem with accessing the data')
            catService.getAllCats.throws(thrownError)

            return ExpressMocks.create(sampleRequest)
                .test(endpoints.getAllCats)
                .expectNext(thrownError)
        })
    })

    describe('getCatsStatistics', () => {
        it('should return the statistics as JSON response', () => {
            return ExpressMocks.create(sampleRequest)
                .test(endpoints.getCatsStatistics)
                .expectJson({ amount: 30, averageAge: 50 })
        })

        it('should send status 404 if the feature toggle is deactivated', () => {
            sampleRequest.fflip.has.returns(false)

            return ExpressMocks.create(sampleRequest)
                .test(endpoints.getCatsStatistics)
                .expectSendStatus(HttpStatus.NOT_FOUND)
        })

        it('should handle thrown errors by passing them to NextFunction', () => {
            const thrownError = new Error('Some problem with accessing the data')
            catService.getCatsStatistics.throws(thrownError)

            return ExpressMocks.create(sampleRequest)
                .test(endpoints.getCatsStatistics)
                .expectNext(thrownError)
        })
    })
})
