import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    species: z.string(),
    sex: z.enum(['MALE', 'FEMALE']),
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    energy_level: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']),
    independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment_needs: z.enum(['SMALL', 'MEDIUM', 'SPACIOUS']),
    race: z.string(),
    color: z.array(z.string()),
    characteristics: z.string(),
    adoption_requirements: z.array(z.string()),
  })

  const {
    name,
    species,
    race,
    sex,
    color,
    characteristics,
    age,
    size,
    energy_level,
    independence_level,
    environment_needs,
    adoption_requirements,
  } = registerBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      orgId: request.user.sub,
      name,
      species,
      race,
      sex,
      color,
      characteristics,
      age,
      size,
      energy_level,
      independence_level,
      environment_needs,
      adoption_requirements,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
