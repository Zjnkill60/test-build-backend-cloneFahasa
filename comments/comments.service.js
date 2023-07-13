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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_entity_1 = require("./entities/comment.entity");
const api_query_params_1 = require("api-query-params");
const products_service_1 = require("../products/products.service");
let CommentsService = exports.CommentsService = class CommentsService {
    constructor(commentModel, productService) {
        this.commentModel = commentModel;
        this.productService = productService;
    }
    async create(CreateCommentDto, user) {
        let { productID, ...data } = CreateCommentDto;
        let comment = await this.commentModel.create({ ...data, avatar: user.avatar, email: user.email });
        await this.productService.updateCommentToProduct(productID, comment._id);
        return {
            message: "Create a comments ! ",
            comment
        };
    }
    async findAll(queryString) {
        if (queryString) {
            let { filter, sort } = (0, api_query_params_1.default)(queryString);
            let { current, pageSize } = queryString;
            delete filter.current;
            delete filter.pageSize;
            let listComment = await this.commentModel.find(filter).limit(pageSize).skip((current - 1) * pageSize).sort(sort);
            return {
                message: "Fetch list comment paginate",
                listComment
            };
        }
        else {
            let listComment = await this.commentModel.find({});
            return {
                message: "Fetch all comment",
                listComment
            };
        }
    }
    async findOne(id) {
        try {
            let user = await this.commentModel.findOne({ _id: id });
            return {
                message: "find an comment by id",
                user
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("id is correct ?");
        }
    }
    async update(id, UpdateCommentDto) {
        try {
            let comment = await this.commentModel.updateOne({ _id: id }, { $set: { ...UpdateCommentDto } });
            return {
                message: "update an comment by id",
                comment
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("Id is correct ?");
        }
    }
    async remove(id) {
        try {
            let comment = await this.commentModel.deleteOne({ _id: id });
            return {
                message: "delete a user by id",
                comment
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("Id is correct ?");
        }
    }
};
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_entity_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        products_service_1.ProductsService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map