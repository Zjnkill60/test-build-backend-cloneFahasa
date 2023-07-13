import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from 'src/comments/entities/comment.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {


    @Prop()
    author: String

    @Prop()
    mainText: String

    @Prop()
    category: String

    @Prop()
    price: Number

    @Prop()
    sold: number

    @Prop()
    quantity: Number

    @Prop()
    thumbnail: String

    @Prop()
    slider: String[]

    @Prop({ type: mongoose.Schema.Types.Array, ref: Comment.name })
    comments: mongoose.Schema.Types.ObjectId[]


}

export const ProductSchema = SchemaFactory.createForClass(Product);

