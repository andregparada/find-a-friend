import { makeGetPetProfileUseCase } from '@/use-cases/factories/make-get-pet-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPetParamSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = createPetParamSchema.parse(request.params)

  const getPetProfileUseCase = makeGetPetProfileUseCase()

  const { pet } = await getPetProfileUseCase.execute({
    petId,
  })

  return reply.status(200).send({
    pet,
  })
}
