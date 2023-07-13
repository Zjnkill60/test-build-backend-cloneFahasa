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
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("../orders/schema/order.schema");
let MailService = exports.MailService = class MailService {
    constructor(mailerService, orderModel) {
        this.mailerService = mailerService;
        this.orderModel = orderModel;
        this.handleSendEmail = async (orderID, status) => {
            let order = await this.orderModel.findById({ _id: orderID });
            if (status == "PENDING") {
                await this.mailerService.sendMail({
                    to: `${order?.email}`,
                    from: '"BOOKSTORE.COM" <noreply@example.com>',
                    subject: `Thông báo xác nhận đơn hàng #${order._id}`,
                    template: 'view',
                    context: {
                        orderName: order.name,
                        orderID: order._id,
                        orderAddress: order.address,
                        orderPhoneNumber: order.phoneNumber,
                        orderItem: order.item,
                        orderPrice: order.totalPrice
                    }
                });
                return;
            }
            if (status == "RUNNING") {
                await this.mailerService.sendMail({
                    to: `${order?.email}`,
                    from: '"BOOKSTORE.COM" <noreply@example.com>',
                    subject: `Xác nhận đơn hàng thành công #${order._id}`,
                    template: 'view',
                    context: {
                        orderName: order.name,
                        orderID: order._id,
                        orderAddress: order.address,
                        orderPhoneNumber: order.phoneNumber,
                        orderItem: order.item,
                        orderPrice: order.totalPrice
                    }
                });
                return;
            }
            if (status == "DONE") {
                await this.mailerService.sendMail({
                    to: `${order?.email}`,
                    from: '"BOOKSTORE.COM" <noreply@example.com>',
                    subject: `Thông báo đơn hàng đã được giao thành công`,
                    html: '<b>Cảm ơn quý khách đã mua hàng tại BOOKSTORE , chúc quý khách có ngày mới tốt lành</b>',
                });
                return;
            }
        };
    }
};
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        mongoose_2.Model])
], MailService);
//# sourceMappingURL=mail.service.js.map