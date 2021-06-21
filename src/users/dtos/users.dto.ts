import { IsNotEmpty, IsArray, IsBoolean, IsString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

class CreateUsers {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly job: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly admin: boolean;

  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsArray()
  readonly shedules: Array<string>; //schedules

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly dni: string;

  @IsNotEmpty()
  @IsString()
  readonly direction: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly houseNumber: string;
}

export class UpdateUsersDto extends PartialType(
  OmitType(CreateUsers, ['shedules']),
) {}
