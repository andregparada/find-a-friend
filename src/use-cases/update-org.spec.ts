import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { UpdateOrgUseCase } from './update-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: UpdateOrgUseCase

describe('Update Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new UpdateOrgUseCase(orgsRepository)
  })

  it('should be able to update an organization', async () => {
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

    const { updatedOrg } = await sut.execute({
      orgId: org.id,
      name: 'Jane Doe',
    })

    expect(updatedOrg.id).toEqual(expect.any(String))
    expect(updatedOrg).toEqual(
      expect.objectContaining({
        name: 'Jane Doe',
        email: 'johndoe@example.com',
      }),
    )
  })

  it('should not be able to update email to a existing one', async () => {
    const email = 'johndoe@example.com'

    await orgsRepository.create({
      name: 'John Doe',
      email,
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

    const org = await orgsRepository.create({
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

    await expect(() =>
      sut.execute({
        orgId: org.id,
        email,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
