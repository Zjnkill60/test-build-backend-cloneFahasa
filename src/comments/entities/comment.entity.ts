import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {


    @Prop()
    rate: Number

    @Prop()
    description: String

    @Prop()
    image: String[]

    @Prop()
    email: String

    @Prop()
    avatar: String


}

export const CommentSchema = SchemaFactory.createForClass(Comment);

