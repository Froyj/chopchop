import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

interface Address {
  houseNumber: number;
  streetName: string;
  city: string;
  zipcode: number;
}

@Schema()
export class User {
  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ type: Object, required: true })
  address: Address;

  @Prop({ required: true })
  telephone: string;

  @Prop({ required: true })
  mail: string;

  @Prop({ required: true })
  hashedPassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
