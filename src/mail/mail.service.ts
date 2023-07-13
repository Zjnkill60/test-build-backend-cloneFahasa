import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/orders/schema/order.schema';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService,
        @InjectModel(Order.name) private orderModel: Model<Order>
    ) { }

    handleSendEmail = async (orderID: any, status) => {
        let order = await this.orderModel.findById({ _id: orderID })
        if (status == "PENDING") {
            await this.mailerService.sendMail({
                to: `${order?.email}`,
                from: '"BOOKSTORE.COM" <noreply@example.com>', // override default from
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
            return
        }

        if (status == "RUNNING") {
            await this.mailerService.sendMail({
                to: `${order?.email}`,
                from: '"BOOKSTORE.COM" <noreply@example.com>', // override default from
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
            return
        }

        if (status == "DONE") {
            await this.mailerService.sendMail({
                to: `${order?.email}`,
                from: '"BOOKSTORE.COM" <noreply@example.com>', // override default from
                subject: `Thông báo đơn hàng đã được giao thành công`,
                html: '<b>Cảm ơn quý khách đã mua hàng tại BOOKSTORE , chúc quý khách có ngày mới tốt lành</b>',
            });
            return
        }




    }


}
