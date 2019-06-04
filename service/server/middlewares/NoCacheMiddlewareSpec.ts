import { expect } from 'chai'
import * as sinon from 'sinon'
import { noCache } from './NoCacheMiddleware'

describe('NoCacheMiddleware', () => {
    const sandbox = sinon.createSandbox()
    let next: sinon.SinonSpy
    let requestMock: any
    let responseMock: any

    describe('noCache', () => {
        beforeEach(() => {
            requestMock = {}
            responseMock = {
                setHeader: sandbox.spy()
            }
            next = sandbox.spy()
        })

        it('should call "next"', () => {
            noCache(requestMock, responseMock, next)
            expect(next).to.have.been.calledOnce
        })

        it('should set all required headers', () => {
            noCache(requestMock, responseMock, next)
            expect(responseMock.setHeader).to.have.been.calledThrice

            sinon.assert.callOrder(
                responseMock.setHeader.withArgs('Expires', '0'),
                responseMock.setHeader.withArgs('Pragma', 'no-cache'),
                responseMock.setHeader.withArgs('Cache-Control', 'no-cache, no-store, must-revalidate')
            )
        })
    })
})
