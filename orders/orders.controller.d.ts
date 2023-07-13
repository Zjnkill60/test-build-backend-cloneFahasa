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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & Omit<import("./schema/order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    findAll(queryString: any): Promise<{
        message: string;
        listOrder: (import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & Omit<import("./schema/order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    getLengthOrderByStatus(): Promise<{
        message: string;
        lengthOrder: {
            lengthAll: number;
            lengthPending: number;
            lengthRunning: number;
            lengthDone: number;
        };
    }>;
    findOne(id: string): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & Omit<import("./schema/order.schema").Order & {
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
