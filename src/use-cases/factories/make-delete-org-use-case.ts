import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { DeleteOrgUseCase } from '../delete-org'

export function makeDeleteOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new DeleteOrgUseCase(orgsRepository)

  return useCase
}
