import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    const createPetResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
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

    expect(createPetResponse.statusCode).toEqual(201)
  })
})
