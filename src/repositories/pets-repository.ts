import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  delete(petId: string): void
  findById(id: string): Promise<Pet | null>
  findManyByOrgId(orgId: string, page: number): Promise<Pet[]>
}
