import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDates {
  @IsNotEmpty()
  @IsNumber()
  readonly year: number;
  @IsNotEmpty()
  @IsNumber()
  readonly month: string;
  @IsNotEmpty()
  @IsNumber()
  readonly date: number;
  @IsNotEmpty()
  @IsNumber()
  readonly day: string;
}
