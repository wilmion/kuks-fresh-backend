import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Descriptions, DescriptionsSchema } from './descriptions.entity';
import { Review, ReviewSchema } from './reviews.entity';
import { Dates, DatesSchema } from './dates.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  readonly title: string;

  @Prop({ required: true })
  readonly subtitle: string;

  @Prop({ required: true })
  readonly image: string;

  @Prop({
    required: true,
    type: [
      {
        cost: { required: true, type: Number },
        moneda: { required: true, type: String },
      },
    ],
    minlength: 1,
  })
  prices: Array<{ cost: number; moneda: string }>;

  @Prop({ required: true, type: DescriptionsSchema })
  readonly descriptions: Descriptions;

  @Prop({ required: true })
  readonly time_delivery: string;

  @Prop({ required: true })
  readonly type: string;

  @Prop({ required: true, type: [String] })
  readonly from: Array<string>;

  @Prop({ required: true, type: [String] })
  readonly kitchen: Array<string>;

  @Prop({ required: true, type: [String] })
  readonly ingredients: Array<string>;

  @Prop({ required: true, type: [String] })
  readonly diet_info: Array<string>;

  @Prop({ required: true, type: [String] })
  readonly dietary_restricion: Array<string>;

  @Prop({ required: true, type: Number })
  readonly itemSold: number;

  @Prop({ required: true, type: ReviewSchema })
  readonly reviews: Review;

  @Prop({ required: true, type: DatesSchema })
  readonly dateItemAdded: Dates;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
