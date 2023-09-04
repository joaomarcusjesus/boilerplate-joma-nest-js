import { Module } from '@nestjs/common';
import { MongooseModule as MongooseModuleNestJs } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModuleNestJs.forRoot('mongodb://root:password@localhost:27017'),
  ],
})
export class MongooseModule {}
