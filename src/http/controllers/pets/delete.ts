import { makeDeletePetUseCase } from '@/use-cases/factories/make-delete-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = createPetParamSchema.parse(request.params)

  const deletePetUseCase = makeDeletePetUseCase()

  await deletePetUseCase.execute({
    petId,
  })

  return reply.status(204).send()
}
