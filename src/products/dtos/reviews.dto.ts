import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviews {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly five_start: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly for_start: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly three_start: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly two_start: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly one_start: number;
}
