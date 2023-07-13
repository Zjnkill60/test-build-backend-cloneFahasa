import { MailerService } from '@nestjs-modules/mailer';
import { Model } from 'mongoose';
import { Order } from 'src/orders/schema/order.schema';
export declare class MailService {
    private readonly mailerService;
    private orderModel;
    constructor(mailerService: MailerService, orderModel: Model<Order>);
    handleSendEmail: (orderID: any, status: any) => Promise<void>;
}
