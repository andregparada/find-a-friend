import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface FetchPetsInCityUseCaseRequest {
  city: string
  page: number
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
  }: FetchPetsInCityUseCaseRequest): Promise<FetchPetsInCityUseCaseResponse> {
    const orgsInCity = await this.orgsRepository.findManyByCity(city)

    if (orgsInCity.length === 0) {
      throw new OrgNotFoundError()
    }

    const pets: Pet[] = []

    orgsInCity.map(async (org) => {
      const orgPets = await this.petsRepository.findManyByOrgId(org.id, page)

      orgPets.forEach((pet) => {
        pets.push(pet)
      })
    })

    return {
      pets,
    }
  }
}
