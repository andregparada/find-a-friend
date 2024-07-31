import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface FetchPetsInCityUseCaseRequest {
  city: string
}

interface FetchPetsInCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsInCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsInCityUseCaseRequest): Promise<FetchPetsInCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity({
      city,
    })

    return {
      pets,
    }
  }
}
