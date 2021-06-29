import { IsNotEmpty, IsArray, IsBoolean, IsString } from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class CreateUsers {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly job: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  readonly admin: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  readonly shedules: Array<string>; //schedules

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly dni: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly direction: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly country: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly houseNumber: string;
}

export class UpdateUsersDto extends PartialType(
  OmitType(CreateUsers, ['shedules']),
) {}
