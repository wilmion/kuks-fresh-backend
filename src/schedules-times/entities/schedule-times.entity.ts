import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DaysT =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thrusday'
  | 'Friday'
  | 'Saturday';

@Schema()
export class ScheduleTimes extends Document {
  @Prop({ required: true, type: String, unique: true })
  readonly day: DaysT;

  @Prop({ required: true, type: Number })
  readonly from: number;

  @Prop({ required: true, type: Number })
  readonly to: number;

  @Prop({ required: true, type: Number })
  readonly deliveryOff: number;

  @Prop({ required: true, type: Number })
  readonly hourlyRate: number;

  @Prop({ required: true, type: Number })
  readonly repeatWeekly: number;
}

export const ScheduleTimeSchema = SchemaFactory.createForClass(ScheduleTimes);
