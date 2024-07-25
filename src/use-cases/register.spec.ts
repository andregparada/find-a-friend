import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { RegisterUseCase } from './register'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register an organization', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone_number: '21987654321',
      cep: '20200200',
      state: 'EX',
      city: 'Example City',
      neighborhood: 'Example Neighborhood',
      street: 'Example Street',
      latitude: -7.9437058,
      longitude: -14.3607169,
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
