import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/comments/entities/comment.entity';
import { Order } from 'src/orders/schema/order.schema';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/schema/user.schema';
import { PRODUCT_ARRAY, USER_ARRAY } from './constant';

@Injectable()
export class DatabaseService implements OnModuleInit {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(Comment.name) private commentModel: Model<Comment>
    ) { }

    async onModuleInit(): Promise<void> {
        let countUser = await this.userModel.find({}).count()
        if (countUser == 0) {
            await this.userModel.insertMany(USER_ARRAY)
        }

        let countProduct = await this.productModel.find({}).count()
        if (countProduct == 0) {
            await this.productModel.insertMany(PRODUCT_ARRAY)
        }

    }

}
