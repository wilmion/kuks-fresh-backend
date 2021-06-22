import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AuthEntity extends Document {
  @Prop({ required: true, type: String, unique: true })
  email: string;
  @Prop({ required: true, type: String })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthEntity);
