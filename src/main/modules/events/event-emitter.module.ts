import { EventEmitterNew } from '@/infra/events/emitter/event-emmiter';
import { IEventEmitterNew } from '@/use-cases/contracts/events/event-emitter';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [
    EventEmitterNew,
    {
      provide: IEventEmitterNew,
      useClass: EventEmitterNew,
    },
  ],
  exports: [IEventEmitterNew],
})
export class EventEmitterNewModule {}
