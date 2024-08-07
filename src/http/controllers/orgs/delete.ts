import { makeDeleteOrgUseCase } from '@/use-cases/factories/make-delete-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function deleteOrg(request: FastifyRequest, reply: FastifyReply) {
  const deleteOrg = makeDeleteOrgUseCase()

  await deleteOrg.execute({
    orgId: request.user.sub,
  })

  return reply.status(204).send()
}
