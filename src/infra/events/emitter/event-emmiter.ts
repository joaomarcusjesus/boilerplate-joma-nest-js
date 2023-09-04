import { EventEmitter2 } from 'eventemitter2';
import { Injectable } from '@nestjs/common';
import { IEventEmitterNew } from '@/use-cases/contracts/events/event-emitter';

@Injectable()
export class EventEmitterNew implements IEventEmitterNew {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public emit(event: string, ...args: any[]): void {
    this.eventEmitter.emit(event, ...args);
  }
}
