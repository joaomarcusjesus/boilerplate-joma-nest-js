import { CreateAuditRepository } from '@/use-cases/contracts/repository/audit/create-audit-repository';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AuditCreatedListener {
  constructor(private readonly repository: CreateAuditRepository) {}

  @OnEvent('audit-created')
  async handleAuditCreatedEvent(event: CreateAuditRepository.Input) {
    await this.repository.create(event);
  }
}
