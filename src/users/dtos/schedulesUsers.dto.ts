import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsString,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateDates } from '@core/dtos/Dates.dto';

class CreateLocation {
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @IsNotEmpty()
  @IsString()
  readonly direction: string;
}

export class CreateSchedulesUsers {
  @IsNotEmpty()
  @IsNumber()
  readonly from: number;

  @IsNotEmpty()
  @IsNumber()
  readonly to: number;

  @IsNotEmpty()
  @IsNumber()
  readonly deliveryOff: number;

  @IsNotEmpty()
  @IsNumber()
  readonly hourlyRate: number;

  @IsNotEmpty()
  @IsNumber()
  readonly repeatWeekly: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly available: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly finished: boolean;

  @IsNotEmpty()
  @IsNumber()
  readonly totalHours: number;

  @IsNotEmpty()
  @ValidateNested()
  readonly date: CreateDates;

  @IsNotEmpty()
  @IsNumber()
  readonly total: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly pendding: boolean;

  @IsNotEmpty()
  @ValidateNested()
  readonly location: CreateLocation;

  @IsNotEmpty()
  @IsArray()
  readonly products: Array<string>;
}

export class UpdateSchedulesUsersDto extends PartialType(
  OmitType(CreateSchedulesUsers, ['products']),
) {}
