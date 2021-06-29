import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailBody {
  @ApiProperty()
  email: string;
}

export class ChangePasswordBody {
  @ApiProperty()
  password: string;
}
