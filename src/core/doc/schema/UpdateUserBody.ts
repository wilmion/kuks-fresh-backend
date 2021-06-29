import { ApiProperty } from '@nestjs/swagger';
import { CreateSchedulesUsers } from '@root/users/dtos/schedulesUsers.dto';
import { UpdateUsersDto } from '@root/users/dtos/users.dto';
import { SchedulesUsersEntity } from '@root/users/entity/SchedulesUsers.entity';

export class UpdateUserBody extends UpdateUsersDto {
  @ApiProperty({ type: CreateSchedulesUsers, isArray: true })
  shedules: Array<SchedulesUsersEntity>;
}
