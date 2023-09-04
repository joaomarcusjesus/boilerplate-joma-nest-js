export abstract class IEventEmitterNew {
  abstract emit(event: string, ...args: any[]): void;
}
