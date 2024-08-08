import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const color: string[] = Array.isArray(data.color)
      ? data.color
      : data.color && 'set' in data.color
        ? data.color.set
        : []

    const pet = {
      id: randomUUID(),
      species: data.species,
      race: data.race,
      sex: data.sex,
      color,
      name: data.name,
      characteristics: data.characteristics,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment_needs: data.environment_needs,
      adoption_requirements: Array.isArray(data.adoption_requirements)
        ? data.adoption_requirements
        : [],
      org_id: data.org_id,
    }

    if (
      !data.energy_level ||
      !data.independence_level ||
      !data.size ||
      !data.sex ||
      !data.environment_needs ||
      !data.age ||
      !data.color ||
      !data.adoption_requirements
    ) {
      throw new Error()
    }
    this.items.push(pet)

    return pet
  }

  async delete(petId: string) {
    this.items = this.items.filter((item) => item.id !== petId)
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByOrgId(id: string) {
    const pets = this.items.filter((item) => item.org_id === id)

    return pets
  }

  async findManyByOrgId(orgId: string, page: number) {
    return this.items
      .filter((item) => item.org_id === orgId)
      .slice((page - 1) * 20, page * 20)
  }
}
