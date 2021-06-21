import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Dates, DatesSchema } from '@core/entity/dates.entity';
import { Product } from '@root/products/entities/product.entity';

@Schema()
export class SchedulesUsersEntity extends Document {
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

  @Prop({ required: true, type: Boolean })
  readonly available: boolean;

  @Prop({ required: true, type: Boolean })
  readonly finished: boolean;

  @Prop({ required: true, type: Number })
  readonly totalHours: number;

  @Prop({ required: true, type: DatesSchema })
  readonly date: Dates;

  @Prop({ required: true, type: Number })
  readonly total: number;

  @Prop({ required: true, type: Boolean })
  readonly pendding: boolean;

  @Prop({
    required: true,
    type: {
      city: { required: true, type: String },
      country: { required: true, type: String },
      direction: { required: true, type: String },
    },
  })
  readonly location: {
    city: string;
    country: string;
    direction: string;
  };

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: Product.name }] })
  readonly products: Array<Product | Types.ObjectId>; //products
}

export const SchedulesUsersSchema =
  SchemaFactory.createForClass(SchedulesUsersEntity);
