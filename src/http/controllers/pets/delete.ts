import { makeDeletePetUseCase } from '@/use-cases/factories/make-delete-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = createPetParamSchema.parse(request.params)

  const deletePetUseCase = makeDeletePetUseCase()

  await deletePetUseCase.execute({
    id,
  })

  return reply.status(204).send()
}
