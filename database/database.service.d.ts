import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comment } from 'src/comments/entities/comment.entity';
import { Order } from 'src/orders/schema/order.schema';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/schema/user.schema';
export declare class DatabaseService implements OnModuleInit {
    private userModel;
    private productModel;
    private orderModel;
    private commentModel;
    constructor(userModel: Model<User>, productModel: Model<Product>, orderModel: Model<Order>, commentModel: Model<Comment>);
    onModuleInit(): Promise<void>;
}
