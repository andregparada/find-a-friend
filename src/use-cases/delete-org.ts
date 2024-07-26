import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgNotFoundError } from './errors/org-already-exists-error copy'

interface DeleteOrgUseCaseRequest {
  orgId: string
}

export class DeleteOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ orgId }: DeleteOrgUseCaseRequest) {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    await this.orgsRepository.delete(orgId)
  }
}