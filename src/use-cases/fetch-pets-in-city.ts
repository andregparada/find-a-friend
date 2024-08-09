import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

type Age = 'PUPPY' | 'ADULT' | 'SENIOR'
type Size = 'SMALL' | 'MEDIUM' | 'LARGE'
type EnergyLevel = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
type IndependenceLevel = 'LOW' | 'MEDIUM' | 'HIGH'

interface FetchPetsInCityUseCaseRequest {
  city: string
  page: number
  age?: Age | null
  size?: Size | null
  energy_level?: EnergyLevel | null
  independence_level?: IndependenceLevel | null
}

interface FetchPetsInCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsInCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    city,
    page,
    age,
    energy_level,
    size,
    independence_level,
  }: FetchPetsInCityUseCaseRequest): Promise<FetchPetsInCityUseCaseResponse> {
    const orgsInCity = await this.orgsRepository.findManyByCity(city)

    if (orgsInCity.length === 0) {
      throw new OrgNotFoundError()
    }

    let pets: Pet[] = []

    const allPets = await Promise.all(
      orgsInCity.map(async (org) => {
        return this.petsRepository.findManyByOrgId(org.id, page)
      }),
    )

    pets = allPets.flat()

    if (age) {
      pets = pets.filter((pet) => pet.age === age)
    }
    if (energy_level) {
      pets = pets.filter((pet) => pet.energy_level === energy_level)
    }
    if (size) {
      pets = pets.filter((pet) => pet.size === size)
    }
    if (independence_level) {
      pets = pets.filter((pet) => pet.independence_level === independence_level)
    }

    return {
      pets,
    }
  }
}
