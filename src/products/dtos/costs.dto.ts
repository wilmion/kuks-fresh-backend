import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCost {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Costo del producto' })
  readonly cost: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'Moneda del precio' })
  @IsString()
  readonly moneda: string;
}
