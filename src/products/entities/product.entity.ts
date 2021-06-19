import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Descriptions } from './descriptions.entity';
import { Review } from './reviews.entity';
import { Dates } from './dates.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, type: Array<{ cost: number; moneda: string }>() })
  prices: Array<{ cost: number; moneda: string }>;

  @Prop({ type: Descriptions })
  descriptions: Descriptions;

  @Prop({ required: true })
  time_delivery: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type: Array<string>() })
  from: Array<string>;

  @Prop({ required: true, type: Array<string>() })
  kitchen: Array<string>;

  @Prop({ required: true, type: Array<string>() })
  ingredients: Array<string>;

  @Prop({ required: true, type: Array<string>() })
  diet_info: Array<string>;

  @Prop({ required: true, type: Array<string>() })
  dietary_restricion: Array<string>;

  @Prop({ required: true, type: Number })
  itemSold: number;

  @Prop({ type: Review })
  reviews: Review;

  @Prop({ type: Dates })
  dateItemAdded: Dates;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
