import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found-error'

type Sex = 'MALE' | 'FEMALE'
type Age = 'PUPPY' | 'ADULT' | 'SENIOR'
type Size = 'SMALL' | 'MEDIUM' | 'LARGE'
type EnergyLevel = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
type IndependenceLevel = 'LOW' | 'MEDIUM' | 'HIGH'
type Environment = 'SMALL' | 'MEDIUM' | 'SPACIOUS'

interface CreatePetUseCaseRequest {
  orgId: string
  name: string
  species: string
  sex: Sex
  age: Age
  size: Size
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  environment_needs: Environment
  race: string
  color: string[]
  characteristics: string
  adoption_requirements: string[]
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    orgId,
    name,
    species,
    race,
    sex,
    color,
    characteristics,
    age,
    size,
    energy_level,
    independence_level,
    environment_needs,
    adoption_requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      species,
      race,
      sex,
      color,
      characteristics,
      age,
      size,
      energy_level,
      independence_level,
      environment_needs,
      adoption_requirements,
      org_id: orgId,
    })

    return { pet }
  }
}
