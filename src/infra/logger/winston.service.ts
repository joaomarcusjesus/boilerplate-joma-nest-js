import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, Logger } from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import { env } from 'process';

@Injectable()
export class WinstonService implements LoggerService {
  logger: Logger;
  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'isoDateTime' }),
        format.json(),
      ),
      transports: [
        new WinstonCloudWatch({
          name: 'API LOG',
          awsAccessKeyId: env.AWS_ACCESS_KEY_ID,
          awsSecretKey: env.AWS_SECRET_ACCESS_KEY,
          awsRegion: env.AWS_CLOUDWATCH_REGION,
          logGroupName: env.AWS_CLOUDWATCH_LOG_GROUP_NAME,
          logStreamName: 'api-tasks-services',
          messageFormatter: ({ level, message, additionalInfo }) =>
            this.messageFormatter({ level, message, additionalInfo }),
        }),
      ],
    });
  }

  log({ level = 'info', message = 'No message.', additionalInfo = null }) {
    this.logger.log(level, message, { additionalInfo });
  }

  error(message: any, trace?: string) {
    this.log({ level: 'error', message, additionalInfo: trace });
  }

  warn(message: any) {
    this.log({ level: 'warn', message });
  }

  messageFormatter({ level, message, additionalInfo }) {
    if (additionalInfo) {
      const stringifyJSON = JSON.stringify(additionalInfo);
      return `[${level}]: ${message}.\n Additional Info: ${this.verifyAdditionalInfoLength(
        stringifyJSON,
      )} \n`;
    }
    return `[${level}]: ${message}`;
  }

  verifyAdditionalInfoLength(additionalInfo: string) {
    if (additionalInfo.length > 200000) {
      return `${additionalInfo.slice(0, 100000)} ... ${additionalInfo.slice(
        -100000,
      )}`;
    } else {
      return additionalInfo;
    }
  }
}
