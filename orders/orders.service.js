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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_schema_1 = require("./schema/order.schema");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const api_query_params_1 = require("api-query-params");
const mail_service_1 = require("../mail/mail.service");
const products_service_1 = require("../products/products.service");
let OrdersService = exports.OrdersService = class OrdersService {
    constructor(orderModel, userService, mailService, productService) {
        this.orderModel = orderModel;
        this.userService = userService;
        this.mailService = mailService;
        this.productService = productService;
    }
    async create(createOrderDto) {
        let { email, item } = createOrderDto;
        let order = await this.orderModel.create({ ...createOrderDto, status: "PENDING" });
        await this.userService.updateOrderHistoryUser(email, order._id);
        await this.productService.updateSoldProduct(item);
        await this.mailService.handleSendEmail(order._id, "PENDING");
        return {
            message: "Create an order ! ",
            order
        };
    }
    async getLengthOrder() {
        let lengthAll = (await this.orderModel.find({})).length;
        let lengthPending = (await this.orderModel.find({ status: "PENDING" })).length;
        let lengthRunning = (await this.orderModel.find({ status: "RUNNING" })).length;
        let lengthDone = (await this.orderModel.find({ status: "DONE" })).length;
        return {
            message: "Length order by status",
            lengthOrder: {
                lengthAll,
                lengthPending,
                lengthRunning,
                lengthDone
            }
        };
    }
    async findAll(queryString) {
        if (queryString) {
            let { filter, sort } = (0, api_query_params_1.default)(queryString);
            let { current, pageSize } = queryString;
            delete filter.current;
            delete filter.pageSize;
            let listOrder = await this.orderModel.find(filter).limit(pageSize).skip((current - 1) * pageSize).sort(sort);
            return {
                message: "Fetch list order paginate",
                listOrder
            };
        }
        else {
            let listOrder = await this.orderModel.find({}).populate('orderHistory');
            return {
                message: "Fetch all order",
                listOrder
            };
        }
    }
    async findOne(id) {
        try {
            let user = await this.orderModel.findOne({ _id: id });
            return {
                message: "find an order by id",
                user
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("id is correct ?");
        }
    }
    async update(id, updateOrderDto) {
        try {
            let order = await this.orderModel.updateOne({ _id: id }, { $set: { ...updateOrderDto } });
            await this.mailService.handleSendEmail(id, updateOrderDto?.status);
            return {
                message: "update an order by id",
                order
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("Id is correct ?");
        }
    }
    async remove(id) {
        try {
            let order = await this.orderModel.deleteOne({ _id: id });
            return {
                message: "delete a user by id",
                order
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("Id is correct ?");
        }
    }
};
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        mail_service_1.MailService,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map