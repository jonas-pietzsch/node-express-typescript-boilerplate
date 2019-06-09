import { Cat } from './Cat'

export class CatRepository {
    public getById(id: number): Cat | undefined {
        return catsById[id]
    }

    public getAll(): Cat[] {
        return cats
    }
}

const cats: Cat[] = [
    {
        id: 1,
        name: 'Tony Iommi',
        breed: 'British Shorthair',
        gender: 'male',
        age: 71
    },
    {
        id: 2,
        name: 'Ozzy Osbourne',
        breed: 'British Semi-longhair',
        gender: 'male',
        age: 70
    },
    {
        id: 3,
        name: 'Geezer Butler',
        breed: 'British Longhair',
        gender: 'male',
        age: 69
    },
    {
        id: 4,
        name: 'Bill Ward',
        breed: 'Burmilla',
        gender: 'male',
        age: 70
    },
    {
        id: 5,
        name: 'Sharon Osbourne',
        breed: 'Bambino',
        gender: 'female',
        age: 66
    }
]
type CatsById = { [id: number]: Cat }
const catsById: CatsById = cats.reduce((catzById: CatsById, currentCat) => {
    catzById[currentCat.id] = currentCat
    return catzById
}, {})
