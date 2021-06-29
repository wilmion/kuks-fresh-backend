import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CreateDescriptions } from './descriptions.dto';
import { CreateDates } from '@core/dtos/Dates.dto';
import { CreateReviews } from './reviews.dto';
import { CreateCost } from './costs.dto';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Subtítulo del producto' })
  @IsString()
  readonly subtitle: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsUrl()
  readonly image: string;

  @IsNotEmpty()
  @ApiProperty({ type: Array(CreateCost) })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCost)
  readonly prices: Array<CreateCost>;

  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
  readonly descriptions: CreateDescriptions;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly time_delivery: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  @Type(() => String)
  readonly from: Array<string>;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  @Type(() => String)
  readonly kitchen: Array<string>;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  @Type(() => String)
  readonly ingredients: Array<string>;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  @Type(() => String)
  readonly diet_info: Array<string>;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  @Type(() => String)
  readonly dietary_restricion: Array<string>;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly itemSold: number;

  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
  readonly reviews: CreateReviews;

  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
  readonly dateItemAdded: CreateDates;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
