"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("./database.service");
const database_controller_1 = require("./database.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/schema/user.schema");
const product_entity_1 = require("../products/entities/product.entity");
const order_schema_1 = require("../orders/schema/order.schema");
const comment_entity_1 = require("../comments/entities/comment.entity");
let DatabaseModule = exports.DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: product_entity_1.Product.name, schema: product_entity_1.ProductSchema },
                { name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema },
                { name: comment_entity_1.Comment.name, schema: comment_entity_1.CommentSchema },
            ])],
        controllers: [database_controller_1.DatabaseController],
        providers: [database_service_1.DatabaseService]
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map