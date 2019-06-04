import { expect } from 'chai'
import { CatRepository } from './CatRepository'
import { exampleCats } from './exampleCats'

describe('CatRepository', () => {
    const repository = new CatRepository()

    describe('getById', () => {
        it('should find an existing cat in the storage by ID', () => {
            const cat = repository.getById(1)
            expect(cat).to.deep.equal({
                id: 1,
                name: 'Tony Iommi',
                breed: 'British Shorthair',
                gender: 'male',
                age: 71
            })
        })

        it('should return undefined if a cat is not in storage', () => {
            expect(repository.getById(999)).to.be.undefined
        })
    })

    describe('getAll', () => {
        it('should find all cats', () => {
            expect(repository.getAll()).to.deep.equal(exampleCats)
        })
    })
})
