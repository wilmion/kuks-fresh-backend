import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDates {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly year: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly month: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly date: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly day: string;
}
