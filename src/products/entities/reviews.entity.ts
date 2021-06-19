import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ required: true, type: Number })
  five_start: number;

  @Prop({ required: true, type: Number })
  for_start: number;

  @Prop({ required: true, type: Number })
  three_start: number;

  @Prop({ required: true, type: Number })
  two_start: number;

  @Prop({ required: true, type: Number })
  one_start: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
