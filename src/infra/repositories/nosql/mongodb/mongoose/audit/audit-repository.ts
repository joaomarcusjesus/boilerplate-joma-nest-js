import { CreateAuditRepository } from '@/use-cases/contracts/repository/audit/create-audit-repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Audit } from '../entities/audit.document';
import { Model } from 'mongoose';

@Injectable()
export class MongoAuditRepository implements CreateAuditRepository {
  constructor(@InjectModel(Audit.name) private repository: Model<Audit>) {}

  async create(
    input: CreateAuditRepository.Input,
  ): Promise<CreateAuditRepository.Output> {
    const entity = new this.repository(input);
    await entity.save();
  }
}
