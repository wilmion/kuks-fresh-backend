import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviews {
  @IsNotEmpty()
  @IsNumber()
  five_start: number;

  @IsNotEmpty()
  @IsNumber()
  for_start: number;

  @IsNotEmpty()
  @IsNumber()
  three_start: number;

  @IsNotEmpty()
  @IsNumber()
  two_start: number;

  @IsNotEmpty()
  @IsNumber()
  one_start: number;
}
