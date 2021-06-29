import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDescriptions {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly product: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Portion description' })
  @IsString()
  readonly portion: string;
}
