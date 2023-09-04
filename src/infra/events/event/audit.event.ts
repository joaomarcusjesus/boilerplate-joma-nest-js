import { ActionEnum } from '@/domain/models/audit';
import { IEventEmitterNew } from '@/use-cases/contracts/events/event-emitter';
import { Injectable } from '@nestjs/common';

export type AuditEventInput = {
  action: ActionEnum;
  customer_id: string;
};

@Injectable()
export class AuditEvent {
  constructor(private readonly eventEmitter: IEventEmitterNew) {}

  public async emit(data: AuditEventInput): Promise<void> {
    this.eventEmitter.emit('audit-created', data);
  }
}
