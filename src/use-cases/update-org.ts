import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { OrgNotFoundError } from './errors/org-already-exists-error copy'

interface UpdateOrgUseCaseRequest {
  orgId: string
  name?: string
  email?: string
  password?: string
  phone_number?: string
  cep?: string
  state?: string
  city?: string
  neighborhood?: string
  street?: string
  latitude?: number
  longitude?: number
}

interface UpdateOrgUseCaseResponse {
  updatedOrg: Org
}

export class UpdateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
    name,
    email,
    password,
    phone_number,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: UpdateOrgUseCaseRequest): Promise<UpdateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const password_hash = password ? await hash(password, 6) : org.password_hash

    if (email) {
      const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

      if (orgWithSameEmail) {
        throw new OrgAlreadyExistsError()
      }
    }

    const updatedOrg = await this.orgsRepository.update({
      name: name || org.name,
      email: email || org.email,
      password_hash: password_hash || org.password_hash,
      phone_number: phone_number || org.phone_number,
      cep: cep || org.cep,
      state: state || org.state,
      city: city || org.city,
      neighborhood: neighborhood || org.neighborhood,
      street: street || org.street,
      latitude: latitude || org.latitude,
      longitude: longitude || org.longitude,
    })

    return {
      updatedOrg,
    }
  }
}
