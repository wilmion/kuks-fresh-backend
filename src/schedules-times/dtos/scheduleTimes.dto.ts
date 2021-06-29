import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { DaysT } from '../entities/schedule-times.entity';

export class CreateScheduleTimeDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly day: DaysT;

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
}

export class UpdateScheduleTimeDto extends PartialType(CreateScheduleTimeDto) {}
