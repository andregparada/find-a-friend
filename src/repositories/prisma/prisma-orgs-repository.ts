import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async update(data: Prisma.OrgUpdateInput): Promise<Org> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): void {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<Org | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string): Promise<Org | null> {
    throw new Error('Method not implemented.')
  }

  async findManyByCity(city: string): Promise<Org[]> {
    throw new Error('Method not implemented.')
  }
}
