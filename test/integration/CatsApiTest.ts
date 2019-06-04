import * as request from 'supertest'
import { expect } from 'chai'
import * as HttpStatus from 'http-status-codes'
import TestEnv from './TestEnv'

const { baseUrl } = TestEnv

describe('Cats API', () => {
    describe('Cat details', () => {
        it('should respond with a positive status code if the cat is known', () => {
            return request(baseUrl)
                .get('/api/cat/1')
                .expect(HttpStatus.OK)
        })

        it('should respond with 404 status code if the cat is not known', () => {
            return request(baseUrl)
                .get('/api/cat/666')
                .expect(HttpStatus.NOT_FOUND)
        })

        it('should respond with cat details data if the cat is known', () => {
            return request(baseUrl)
                .get('/api/cat/1')
                .expect((res: Response) => {
                    expect(res.body).to.deep.equal({
                        id: 1,
                        name: 'Tony Iommi',
                        breed: 'British Shorthair',
                        gender: 'male',
                        age: 71
                    })
                })
        })
    })

    describe('All cats', () => {
        it('should respond with a positive status code', () => {
            return request(baseUrl)
                .get('/api/cat')
                .expect(HttpStatus.OK)
        })

        it('should return a reasonable amount of cats entries', () => {
            return request(baseUrl)
                .get('/api/cat')
                .expect((res: Response) => {
                    expect((res.body as any).length).to.eq(5)
                })
        })
    })

    describe('Cat statistics', () => {
        it('should respond with a positive status code', () => {
            return request(baseUrl)
                .get('/api/statistics/cat')
                .expect(HttpStatus.OK)
        })

        it('should deliver a reasonable statistics response', () => {
            return request(baseUrl)
                .get('/api/statistics/cat')
                .expect((res: Response) => {
                    expect(res.body).to.deep.eq({
                        amount: 5,
                        averageAge: 69.2
                    })
                })
        })
    })
})
