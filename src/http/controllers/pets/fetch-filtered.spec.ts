import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Fetch Filtered Pets Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch many pets with filters', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    await prisma.pet.createMany({
      data: [
        {
          org_id: org.id,
          name: 'Pet 1',
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
        {
          org_id: org.id,
          name: 'Pet 2',
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
      ],
    })

    const response = await request(app.server)
      .get('/pets/filter')
      .set('Authorization', `Bearer ${token}`)
      .send({
        city: 'Example City',
        page: 1,
        age: 'PUPPY',
        energy_level: 'ONE',
        size: 'SMALL',
        independence_level: 'LOW',
      })

    return console.log(response.body)

    expect(response.statusCode).toEqual(200)
    // expect(response.body.pets).toEqual(
    //   expect.objectContaining({
    //     name: 'Pet John Doe',
    //   }),
    // )
  })
})
