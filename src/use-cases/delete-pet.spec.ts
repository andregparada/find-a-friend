import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { DeletePetUseCase } from './delete-pet'

let petsRepository: InMemoryPetsRepository
let sut: DeletePetUseCase

describe('Delete Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new DeletePetUseCase(petsRepository)
  })

  it('should be able to delete a pet', async () => {
    const pet = await petsRepository.create({
      org_id: 'org-id',
      name: 'Pet Name',
      species: 'Cat',
      race: 'Mutt',
      sex: 'MALE',
      color: ['Orange'],
      characteristics: 'Fun',
      age: 'PUPPY',
      size: 'SMALL',
      energy_level: 'ONE',
      independence_level: 'LOW',
      environment_needs: 'SMALL',
      adoption_requirements: ['None'],
    })

    await sut.execute({ id: pet.id })

    const deletedPet = await petsRepository.findById(pet.id)

    await expect(deletedPet).toBeNull()
  })
})
