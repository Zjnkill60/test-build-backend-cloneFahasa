import mongoose, { HydratedDocument } from 'mongoose';
export type OrderDocument = HydratedDocument<Order>;
export declare class Order {
    name: String;
    email: String;
    phoneNumber: Number;
    status: String;
    totalPrice: Number;
    address: String;
    item: mongoose.Schema.Types.Array;
}
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, mongoose.Document<unknown, any, Order> & Omit<Order & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, mongoose.FlatRecord<Order>> & Omit<mongoose.FlatRecord<Order> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
