import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'

interface DeleteOrgUseCaseRequest {
  id: string
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: DeleteOrgUseCaseRequest) {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    await this.petsRepository.delete(id)
  }
}
