import { Module } from '@nestjs/common';
import { databaseProviders } from './helpers/database-providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class TypeormDatabaseModule {}
