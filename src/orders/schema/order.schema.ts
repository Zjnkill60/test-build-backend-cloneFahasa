import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
    @Prop()
    name: String

    @Prop()
    email: String

    @Prop()
    phoneNumber: Number

    @Prop()
    status: String

    @Prop()
    totalPrice: Number

    @Prop()
    address: String

    @Prop({ type: mongoose.Schema.Types.Array })
    item: mongoose.Schema.Types.Array


}

export const OrderSchema = SchemaFactory.createForClass(Order);

