import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  findByEmail(email: string): Promise<Org | null> {
    throw new Error('Method not implemented.')
  }

  create(data: Prisma.OrgCreateInput): Promise<Org> {
    throw new Error('Method not implemented.')
  }
}
