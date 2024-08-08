import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Get Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the pet details', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    const pet = await prisma.pet.create({
      data: {
        org_id: org.id,
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
      },
    })

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Pet John Doe',
      }),
    )
  })
})
