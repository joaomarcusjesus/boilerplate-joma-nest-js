import {
  Audit,
  AuditDocumentSchema,
} from '@/infra/repositories/nosql/mongodb/mongoose/entities/audit.document';
import { MongooseModule } from '@/infra/repositories/nosql/mongodb/mongoose/mongoose.module';
import { CreateAuditRepository } from '@/use-cases/contracts/repository/audit/create-audit-repository';
import { Module } from '@nestjs/common';
import { MongooseModule as MongooseModuleNestJs } from '@nestjs/mongoose';
import { MongoAuditRepository } from '@/infra/repositories/nosql/mongodb/mongoose/audit/audit-repository';

@Module({
  imports: [
    MongooseModule,
    MongooseModuleNestJs.forFeature([
      { name: Audit.name, schema: AuditDocumentSchema },
    ]),
  ],
  providers: [
    MongoAuditRepository,
    {
      provide: CreateAuditRepository,
      useClass: MongoAuditRepository,
    },
  ],
  exports: [CreateAuditRepository],
})
export class AuditEventModule {}
