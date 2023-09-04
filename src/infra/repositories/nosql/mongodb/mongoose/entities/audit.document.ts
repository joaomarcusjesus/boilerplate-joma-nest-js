import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuditDocument = HydratedDocument<Audit>;

@Schema()
export class Audit {
  @Prop()
  action: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now, index: true })
  updated_at: Date;

  @Prop()
  customer_id: number;
}

export const AuditDocumentSchema = SchemaFactory.createForClass(Audit);
