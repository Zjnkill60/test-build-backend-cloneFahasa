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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<Product>);
    create(CreateProductDto: CreateProductDto): Promise<{
        message: string;
        product: import("mongoose").Document<unknown, {}, Product> & Omit<Product & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    findAll(queryString: any): Promise<{
        message: string;
        listproduct: Omit<import("mongoose").Document<unknown, {}, Product> & Omit<Product & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
        totalItem: number;
    } | {
        message: string;
        listproduct: Omit<import("mongoose").Document<unknown, {}, Product> & Omit<Product & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
        totalItem?: undefined;
    }>;
    findById(id: string): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, Product> & Omit<Product & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    update(id: string, UpdateProductDto: UpdateProductDto): Promise<{
        message: string;
        product: import("mongoose").UpdateWriteOpResult;
    }>;
    remove(id: string): Promise<{
        message: string;
        product: import("mongodb").DeleteResult;
    }>;
    updateCommentToProduct(_id: string, commentID: any): Promise<void>;
    updateSoldProduct(item: any): Promise<void>;
}
