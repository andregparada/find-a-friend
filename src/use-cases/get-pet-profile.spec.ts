import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetProfileUseCase } from './get-pet-profile'

let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetProfileUseCase(petsRepository)
  })

  it('should be able to get pet profile', async () => {
    const createdPet = await petsRepository.create({
      org_id: 'organization-id',
      name: 'Pet John Doe',
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

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Pet John Doe')
  })

  it('should not be able to get pet profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
