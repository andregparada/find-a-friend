import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { DeleteOrgUseCase } from './delete-org'

let orgsRepository: InMemoryOrgsRepository
let sut: DeleteOrgUseCase

describe('Delete Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new DeleteOrgUseCase(orgsRepository)
  })

  it('should be able to delete an organization', async () => {
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

    await sut.execute({ orgId: org.id })

    const deletedOrg = await orgsRepository.findById(org.id)

    await expect(deletedOrg).toBeNull()
  })
})
