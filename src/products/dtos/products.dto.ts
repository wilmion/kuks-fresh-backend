import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

import { CreateDescriptions } from './descriptions.dto';
import { CreateDates } from '@core/dtos/Dates.dto';
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
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly subtitle: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCost)
  readonly prices: Array<CreateCost>;

  @ValidateNested()
  readonly descriptions: CreateDescriptions;

  @IsNotEmpty()
  @IsString()
  readonly time_delivery: string;

  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  readonly from: Array<string>;

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  readonly kitchen: Array<string>;

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  readonly ingredients: Array<string>;

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  readonly diet_info: Array<string>;

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  readonly dietary_restricion: Array<string>;

  @IsNotEmpty()
  @IsNumber()
  readonly itemSold: number;

  @IsNotEmpty()
  @ValidateNested()
  readonly reviews: CreateReviews;

  @IsNotEmpty()
  @ValidateNested()
  readonly dateItemAdded: CreateDates;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
