import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Product, ProductSchema } from 'src/products/entities/product.entity';
import { Order, OrderSchema } from 'src/orders/schema/order.schema';
import { Comment, CommentSchema } from 'src/comments/entities/comment.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Product.name, schema: ProductSchema },
    { name: Order.name, schema: OrderSchema },
    { name: Comment.name, schema: CommentSchema },
  ])],
  controllers: [DatabaseController],
  providers: [DatabaseService]
})
export class DatabaseModule { }
