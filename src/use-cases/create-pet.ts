import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  species: string
  race: string
  sex: string
  color: string[]
  caracteristics: string
  age: string
  size: string
  energy_level: string
  independence_level: string
  environment_needs: string
  adoption_requirements: string[]
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    species,
    race,
    sex,
    color,
    caracteristics,
    age,
    size,
    energy_level,
    independence_level,
    environment_needs,
    adoption_requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      species,
      race,
      sex,
      color,
      caracteristics,
      age,
      size,
      energy_level,
      independence_level,
      environment_needs,
      adoption_requirements,
    })

    return { pet }
  }
}
