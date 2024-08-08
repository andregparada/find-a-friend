import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'

interface DeleteOrgUseCaseRequest {
  petId: string
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ petId }: DeleteOrgUseCaseRequest) {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    await this.petsRepository.delete(petId)
  }
}
