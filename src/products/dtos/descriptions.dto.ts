import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDescriptions {
  @IsNotEmpty()
  @IsString()
  product: string;

  @IsNotEmpty()
  @IsString()
  portion: string;
}
