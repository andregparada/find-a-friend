import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { OrgNotFoundError } from './errors/org-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(orgsRepository, petsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone_number: '21987654321',
      cep: '20200200',
      state: 'EX',
      city: 'Example City',
      neighborhood: 'Example Neighborhood',
      street: 'Example Street',
      latitude: -7.9437058,
      longitude: -14.3607169,
    })

    const { pet } = await sut.execute({
      orgId: org.id,
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
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should throw an error if the organization does not exist', async () => {
    await expect(
      sut.execute({
        orgId: 'invalid-org-id',
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
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
