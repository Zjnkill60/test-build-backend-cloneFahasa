import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/order.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import aqp from 'api-query-params';
import { MailService } from 'src/mail/mail.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
    private userService: UsersService,
    private mailService: MailService,
    private productService: ProductsService

  ) { }


  async create(createOrderDto: CreateOrderDto) {
    let { email, item } = createOrderDto

    let order = await this.orderModel.create({ ...createOrderDto, status: "PENDING" })
    await this.userService.updateOrderHistoryUser(email, order._id)
    await this.productService.updateSoldProduct(item)
    await this.mailService.handleSendEmail(order._id, "PENDING")
    return {
      message: "Create an order ! ",
      order
    }
  }

  async getLengthOrder() {
    let lengthAll = (await this.orderModel.find({})).length
    let lengthPending = (await this.orderModel.find({ status: "PENDING" })).length
    let lengthRunning = (await this.orderModel.find({ status: "RUNNING" })).length
    let lengthDone = (await this.orderModel.find({ status: "DONE" })).length

    return {
      message: "Length order by status",
      lengthOrder: {
        lengthAll,
        lengthPending,
        lengthRunning,
        lengthDone
      }
    }
  }

  async findAll(queryString) {
    if (queryString) {
      let { filter, sort } = aqp(queryString)
      let { current, pageSize } = queryString
      delete filter.current
      delete filter.pageSize
      //@ts-ignore
      let listOrder = await this.orderModel.find(filter).limit(pageSize).skip((current - 1) * pageSize).sort(sort)
      return {
        message: "Fetch list order paginate",
        listOrder
      }
    } else {
      let listOrder = await this.orderModel.find({}).populate('orderHistory')
      return {
        message: "Fetch all order",
        listOrder
      }
    }
  }

  async findOne(id: string) {
    try {
      let user = await this.orderModel.findOne({ _id: id })
      return {
        message: "find an order by id",
        user
      }
    } catch (err) {
      throw new BadRequestException("id is correct ?")
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      let order = await this.orderModel.updateOne({ _id: id }, { $set: { ...updateOrderDto } })
      await this.mailService.handleSendEmail(id, updateOrderDto?.status)
      return {
        message: "update an order by id",
        order
      }
    } catch (err) {
      throw new BadRequestException("Id is correct ?")
    }
  }

  async remove(id: string) {
    try {
      let order = await this.orderModel.deleteOne({ _id: id })
      return {
        message: "delete a user by id",
        order
      }
    } catch (err) {
      throw new BadRequestException("Id is correct ?")
    }
  }
}
