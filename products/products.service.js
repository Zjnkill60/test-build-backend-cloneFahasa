"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_entity_1 = require("./entities/product.entity");
const mongoose_2 = require("mongoose");
const api_query_params_1 = require("api-query-params");
let ProductsService = exports.ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(CreateProductDto) {
        let product = await this.productModel.create({ ...CreateProductDto });
        return {
            message: "Create a product ! ",
            product
        };
    }
    async findAll(queryString) {
        if (queryString) {
            let { filter, sort } = (0, api_query_params_1.default)(queryString);
            let { current, pageSize } = queryString;
            delete filter.current;
            delete filter.pageSize;
            let totalItem = (await this.productModel.find({})).length;
            let listproduct = await this.productModel.find(filter).limit(pageSize).skip((current - 1) * pageSize).sort(sort).populate('comments');
            return {
                message: "Fetch list product paginate",
                listproduct,
                totalItem
            };
        }
        else {
            let listproduct = await this.productModel.find({}).populate('comments');
            return {
                message: "Fetch all product",
                listproduct,
            };
        }
    }
    async findById(id) {
        try {
            let user = await this.productModel.findOne({ _id: id }).populate('comments');
            return {
                message: "find an product by id",
                user
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("id is correct ?");
        }
    }
    async update(id, UpdateProductDto) {
        try {
            let product = await this.productModel.updateOne({ _id: id }, { $set: { ...UpdateProductDto } });
            return {
                message: "update an product by id",
                product
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("Id is correct ?");
        }
    }
    async remove(id) {
        try {
            let product = await this.productModel.deleteOne({ _id: id });
            return {
                message: "delete a user by id",
                product
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("Id is correct ?");
        }
    }
    async updateCommentToProduct(_id, commentID) {
        await this.productModel.updateOne({ _id }, { $push: { comments: commentID } });
    }
    async updateSoldProduct(item) {
        item?.map(async (book) => {
            let quantity = +book.quantity;
            let prod = await this.productModel.findOne({ _id: book.id }).exec();
            await this.productModel.updateOne({ mainText: book.name }, { $set: { sold: prod.sold += (quantity) } });
        });
    }
};
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map