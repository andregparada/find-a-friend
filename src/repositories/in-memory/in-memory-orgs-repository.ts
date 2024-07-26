import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone_number: data.phone_number,
      created_at: new Date(),
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }

  async update(data: Prisma.OrgUpdateInput) {
    const org = this.items.find((item) => item.id === data.id)

    if (!org) {
      throw new Error()
    }

    if (!data.latitude || !data.longitude) {
      throw new Error()
    }

    const updatedOrg = {
      id: org.id,
      name: typeof data.name === 'string' ? data.name : org.name,
      email: typeof data.email === 'string' ? data.email : org.email,
      password_hash:
        typeof data.password_hash === 'string'
          ? data.password_hash
          : org.password_hash,
      phone_number:
        typeof data.phone_number === 'string'
          ? data.phone_number
          : org.phone_number,
      created_at: org.created_at,
      cep: typeof data.cep === 'string' ? data.cep : org.cep,
      state: typeof data.state === 'string' ? data.state : org.state,
      city: typeof data.city === 'string' ? data.city : org.city,
      neighborhood:
        typeof data.neighborhood === 'string'
          ? data.neighborhood
          : org.neighborhood,
      street: typeof data.street === 'string' ? data.street : org.street,
      latitude: new Prisma.Decimal(data.latitude.toString()) || org.latitude,
      longitude: new Prisma.Decimal(data.longitude.toString()) || org.longitude,
    }

    this.items.filter((item) => item.id === data.id)
    this.items.push(updatedOrg)

    return updatedOrg
  }

  async delete(id: string) {
    this.items.filter((item) => item.id === id)
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
