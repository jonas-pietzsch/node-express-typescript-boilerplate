import { expect } from 'chai'
import { RequestHandler } from 'express'
import { addServicesToRequest } from './ServiceDependenciesMiddleware'

describe('addServicesToRequest', () => {
    const services: any = { myService: 'something' }
    let middleware: RequestHandler
    let requestMock: any
    let responseMock: any

    beforeEach(() => {
        requestMock = {}
        responseMock = {}
        middleware = addServicesToRequest(services)
    })

    it('should set "services" on request', done => {
        middleware(requestMock, responseMock, () => {
            expect(requestMock.services).to.deep.equal(services)
            done()
        })
    })

    it('should call next()', done => {
        middleware(requestMock, responseMock, error => {
            expect(error).to.be.undefined
            done()
        })
    })
})
