import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async update(data: Prisma.OrgUpdateInput) {
    if (!data.id) {
      throw new ResourceNotFoundError()
    }

    const id = data.id.toString()

    const org = await prisma.org.update({
      where: {
        id,
      },
      data,
    })

    return org
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
