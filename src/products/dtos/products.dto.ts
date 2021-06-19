import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { CreateDescriptions } from './descriptions.dto';
import { CreateDates } from './Dates.dto';
import { CreateReviews } from './reviews.dto';

class CreateCost {
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @IsNotEmpty()
  @IsString()
  moneda: string;
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @ValidateNested()
  prices: Array<CreateCost>;

  @ValidateNested()
  descriptions: CreateDescriptions;

  @IsNotEmpty()
  @IsString()
  time_delivery: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsArray()
  from: Array<string>;

  @IsNotEmpty()
  @IsArray()
  kitchen: Array<string>;

  @IsNotEmpty()
  @IsArray()
  ingredients: Array<string>;

  @IsNotEmpty()
  @IsArray()
  diet_info: Array<string>;

  @IsNotEmpty()
  @IsArray()
  dietary_restricion: Array<string>;

  @IsNotEmpty()
  @IsNumber()
  itemSold: number;

  @ValidateNested()
  reviews: CreateReviews;

  @ValidateNested()
  dateItemAdded: CreateDates;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
