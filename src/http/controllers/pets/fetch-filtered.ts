import { makeFetchPetsInCityUseCase } from '@/use-cases/factories/make-fetch-pets-in-city-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function fetchFiltered(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPetBodySchema = z.object({
    city: z.string(),
    page: z.coerce.number(),
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).nullable(),
    energy_level: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']).nullable(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).nullable(),
    independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).nullable(),
  })

  const { city, page, age, energy_level, size, independence_level } =
    createPetBodySchema.parse(request.body)

  const fetchPetsInCityUseCase = makeFetchPetsInCityUseCase()

  const { pets } = await fetchPetsInCityUseCase.execute({
    city,
    page,
    age,
    energy_level,
    size,
    independence_level,
  })

  return reply.status(200).send({
    pets,
  })
}
