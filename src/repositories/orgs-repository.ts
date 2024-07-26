import { Prisma, Org } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  update(data: Prisma.OrgUpdateInput): Promise<Org>
  delete(id: string): void
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
}
