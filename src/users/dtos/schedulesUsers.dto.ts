import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsString,
} from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

import { CreateDates } from '@core/dtos/Dates.dto';

class CreateLocation {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly country: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly direction: string;
}

export class CreateSchedulesUsers {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly from: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly to: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly deliveryOff: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly hourlyRate: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly repeatWeekly: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  readonly available: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  readonly finished: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly totalHours: number;

  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
  readonly date: CreateDates;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly total: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  readonly pendding: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
  readonly location: CreateLocation;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  readonly products: Array<string>;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly identifiquerShop: string;
}

export class UpdateSchedulesUsersDto extends PartialType(
  OmitType(CreateSchedulesUsers, ['products']),
) {}
