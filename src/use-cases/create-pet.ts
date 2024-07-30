import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found-error'

enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

enum Age {
  PUPPY = 'PUPPY',
  ADULT = 'ADULT',
  SENIOR = 'SENIOR',
}

enum Size {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

enum EnergyLevel {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
}

enum IndependenceLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

enum Environment {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  SPACIOUS = 'SPACIOUS',
}

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
  caracteristics: string
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
    caracteristics,
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
      caracteristics,
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
