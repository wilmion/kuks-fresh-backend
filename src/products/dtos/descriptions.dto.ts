import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDescriptions {
  @IsNotEmpty()
  @IsString()
  readonly product: string;

  @IsNotEmpty()
  @IsString()
  readonly portion: string;
}
