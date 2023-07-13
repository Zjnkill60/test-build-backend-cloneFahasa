import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/orders/schema/order.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: String

    @Prop()
    email: String

    @Prop()
    password: String

    @Prop()
    phoneNumber: Number

    @Prop()
    role: String

    @Prop()
    avatar: String

    @Prop()
    refreshToken: String

    @Prop({ type: mongoose.Schema.Types.Array, ref: Order.name })
    orderHistory: mongoose.Schema.Types.ObjectId[]




}

export const UserSchema = SchemaFactory.createForClass(User);
