import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { deletePet } from './delete'
import { getPetDetails } from './get-pet-details'
import { fetchFiltered } from './fetch-filtered'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', create)
  app.delete('/pets/:petId', deletePet)
  app.get('/pets/:petId', getPetDetails)
  app.get('/pets/filter', fetchFiltered)
}
