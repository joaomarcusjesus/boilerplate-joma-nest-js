import { Logger } from '@nestjs/common';
import { Logger as AbstractLogger } from '@/presentation/contracts/logger';
import { WinstonService } from './winston.service';

export class LoggerService implements AbstractLogger {
  constructor(private readonly logOnWinston: WinstonService) {}

  error(message: string): void {
    Logger.error(message);
    this.logOnWinston.error('Error', message);
  }

  log(message: any) {
    Logger.log(message);
    this.logOnWinston.log(message);
  }

  warn(message: any) {
    Logger.warn(message);
    this.logOnWinston.warn(message);
  }

  info(text: any, params?: any): void {
    Logger.verbose(text);
    this.logOnWinston.log({
      message: text,
      additionalInfo: params,
    });
  }

  debug(text: any): void {
    Logger.debug(text);
    this.logOnWinston.log(text);
  }
}
