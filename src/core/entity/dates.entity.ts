import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Dates extends Document {
  @Prop({ required: true, type: Number })
  readonly year: number;
  @Prop({ required: true, type: String })
  readonly month: string;
  @Prop({ required: true, type: Number })
  readonly date: number;
  @Prop({ required: true, type: String })
  readonly day: string;
}

export const DatesSchema = SchemaFactory.createForClass(Dates);
