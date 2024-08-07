import { makeUpdateOrgUseCase } from '@/use-cases/factories/make-update-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    phone_number: z.string().optional(),
    cep: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    neighborhood: z.string().optional(),
    street: z.string().optional(),
    latitude: z.coerce
      .number()
      .refine((value) => {
        return Math.abs(value) <= 90
      })
      .optional(),
    longitude: z.coerce
      .number()
      .refine((value) => {
        return Math.abs(value) <= 180
      })
      .optional(),
  })

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
  } = updateBodySchema.parse(request.body)

  const updateOrgUseCase = makeUpdateOrgUseCase()

  await updateOrgUseCase.execute({
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

  return reply.status(200).send()
}
