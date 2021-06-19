import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDates {
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsNotEmpty()
  @IsNumber()
  month: string;
  @IsNotEmpty()
  @IsNumber()
  date: number;
  @IsNotEmpty()
  @IsNumber()
  day: string;
}
