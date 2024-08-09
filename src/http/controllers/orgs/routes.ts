import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { update } from './update'
import { deleteOrg } from './delete'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.put('/update', { onRequest: [verifyJWT] }, update)
  app.delete('/delete', { onRequest: [verifyJWT] }, deleteOrg)
}
