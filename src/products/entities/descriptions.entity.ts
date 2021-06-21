import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Descriptions extends Document {
  @Prop({ required: true, type: String })
  readonly product: string;

  @Prop({ required: true, type: String })
  readonly portion: string;
}

export const DescriptionsSchema = SchemaFactory.createForClass(Descriptions);
