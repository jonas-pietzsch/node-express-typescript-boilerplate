import { CatRepository } from './CatRepository'
import { CatsStatistics, Cat } from './Cat'

export class CatService {
    constructor(private catRepository: CatRepository) {
    }

    public getCat(id: number): Cat | undefined {
        return this.catRepository.getById(id)
    }

    public getAllCats(): Cat[] {
        return this.catRepository.getAll()
    }

    public getCatsStatistics(): CatsStatistics {
        const allCats = this.catRepository.getAll()
        const catsAgeSum = allCats.map(cat => cat.age).reduce((sum: number, nextAge: number) => sum + nextAge, 0)

        return {
            amount: allCats.length,
            averageAge: catsAgeSum / allCats.length
        }
    }
}