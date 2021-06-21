import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { SchedulesUsersEntity } from './SchedulesUsers.entity';

@Schema()
export class UsersEntity extends Document {
  @Prop({ required: true, type: String })
  readonly name: string;

  @Prop({ required: true, type: String })
  readonly email: string;

  @Prop({ required: true, type: String })
  readonly job: string;

  @Prop({ required: true, type: Boolean })
  readonly admin: boolean;

  @Prop({ required: true, type: String })
  readonly image: string;

  @Prop({
    required: true,
    type: [{ type: Types.ObjectId, ref: SchedulesUsersEntity.name }],
  })
  readonly shedules: Array<SchedulesUsersEntity | string>; //schedules

  @Prop({ required: true, type: String })
  readonly phoneNumber: string;

  @Prop({ required: true, type: String })
  readonly dni: string;

  @Prop({ required: true, type: String })
  readonly direction: string;

  @Prop({ required: true, type: String })
  readonly country: string;

  @Prop({ required: true, type: String })
  readonly city: string;

  @Prop({ required: true, type: String })
  readonly houseNumber: string;
}

export const UsersSchema = SchemaFactory.createForClass(UsersEntity);
