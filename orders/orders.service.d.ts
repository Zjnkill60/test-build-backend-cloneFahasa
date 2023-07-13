/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schema/order.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { ProductsService } from 'src/products/products.service';
export declare class OrdersService {
    private orderModel;
    private userService;
    private mailService;
    private productService;
    constructor(orderModel: Model<Order>, userService: UsersService, mailService: MailService, productService: ProductsService);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, Order> & Omit<Order & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    getLengthOrder(): Promise<{
        message: string;
        lengthOrder: {
            lengthAll: number;
            lengthPending: number;
            lengthRunning: number;
            lengthDone: number;
        };
    }>;
    findAll(queryString: any): Promise<{
        message: string;
        listOrder: (import("mongoose").Document<unknown, {}, Order> & Omit<Order & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, Order> & Omit<Order & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
        order: import("mongoose").UpdateWriteOpResult;
    }>;
    remove(id: string): Promise<{
        message: string;
        order: import("mongodb").DeleteResult;
    }>;
}
