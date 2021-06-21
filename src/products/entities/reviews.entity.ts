import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ required: true, type: Number })
  readonly five_start: number;

  @Prop({ required: true, type: Number })
  readonly for_start: number;

  @Prop({ required: true, type: Number })
  readonly three_start: number;

  @Prop({ required: true, type: Number })
  readonly two_start: number;

  @Prop({ required: true, type: Number })
  readonly one_start: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
