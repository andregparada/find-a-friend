import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsInCityUseCase } from '../fetch-pets-in-city'

export function makeFetchPetsInCityUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsInCityUseCase(petsRepository, orgsRepository)

  return useCase
}
