import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { DaysT } from '../entities/schedule-times.entity';

export class CreateScheduleTimeDto {
  @IsNotEmpty()
  @IsString()
  readonly day: DaysT;

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
}

export class UpdateScheduleTimeDto extends PartialType(CreateScheduleTimeDto) {}
