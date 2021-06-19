import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Descriptions extends Document {
  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  portion: string;
}

export const DescriptionsSchema = SchemaFactory.createForClass(Descriptions);
