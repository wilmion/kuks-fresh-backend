import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Dates extends Document {
  @Prop({ required: true, type: Number })
  year: number;
  @Prop({ required: true, type: String })
  month: string;
  @Prop({ required: true, type: Number })
  date: number;
  @Prop({ required: true, type: String })
  day: string;
}

export const DatesSchema = SchemaFactory.createForClass(Dates);
