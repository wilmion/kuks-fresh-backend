import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAuthDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
