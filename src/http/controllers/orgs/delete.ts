import { makeUpdateOrgUseCase } from '@/use-cases/factories/make-update-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const deleteBodySchema = z.object({ orgId: z.string() })

  const {
    name,
    email,
    password,
    phone_number,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  } = registerBodySchema.parse(request.body)

  const updateOrg = makeUpdateOrgUseCase()

  const { updatedOrg } = await updateOrg.execute({
    orgId: request.user.sub,
    name,
    email,
    password,
    phone_number,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  })

  return reply.status(200).send({
    updatedOrg,
  })
}
