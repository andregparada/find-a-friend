import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Delete Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete org profile', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .delete('/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({
        orgId: org.id,
      })

    expect(response.statusCode).toEqual(204)
  })
})
