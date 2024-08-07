import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Update (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update org profile', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .put('/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        orgId: org.id,
        name: 'Jane Doe',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.updatedOrg).toEqual(
      expect.objectContaining({
        name: 'Jane Doe',
      }),
    )
  })
})
