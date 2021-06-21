import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviews {
  @IsNotEmpty()
  @IsNumber()
  readonly five_start: number;

  @IsNotEmpty()
  @IsNumber()
  readonly for_start: number;

  @IsNotEmpty()
  @IsNumber()
  readonly three_start: number;

  @IsNotEmpty()
  @IsNumber()
  readonly two_start: number;

  @IsNotEmpty()
  @IsNumber()
  readonly one_start: number;
}
