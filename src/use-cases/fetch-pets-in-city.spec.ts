import { expect, describe, it, beforeEach } from 'vitest'
import { FetchPetsInCityUseCase } from './fetch-pets-in-city'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsInCityUseCase

describe('Fetch Pets In City Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsInCityUseCase(petsRepository, orgsRepository)
  })

  it.only('should be able to fetch pets in the city', async () => {
    const orgOneId = await orgsRepository.create({
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

    const orgTwoId = await orgsRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
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

    await petsRepository.create({
      org_id: orgOneId.id,
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

    await petsRepository.create({
      org_id: orgTwoId.id,
      name: 'Pet Jane Doe',
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

    const { pets } = await sut.execute({ city: 'Example City', page: 1 })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Pet John Doe' }),
      expect.objectContaining({ name: 'Pet Jane Doe' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
