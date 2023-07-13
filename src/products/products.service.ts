import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

  async create(CreateProductDto: CreateProductDto) {

    let product = await this.productModel.create({ ...CreateProductDto })
    return {
      message: "Create a product ! ",
      product
    }
  }


  async findAll(queryString) {
    if (queryString) {
      let { filter, sort } = aqp(queryString)
      let { current, pageSize } = queryString
      delete filter.current
      delete filter.pageSize

      let totalItem = (await this.productModel.find({})).length
      //@ts-ignore
      let listproduct = await this.productModel.find(filter).limit(pageSize).skip((current - 1) * pageSize).sort(sort).populate('comments')
      return {
        message: "Fetch list product paginate",
        listproduct,
        totalItem
      }
    } else {
      let listproduct = await this.productModel.find({}).populate('comments')
      return {
        message: "Fetch all product",
        listproduct,

      }
    }
  }

  async findById(id: string) {
    try {
      let user = await this.productModel.findOne({ _id: id }).populate('comments')
      return {
        message: "find an product by id",
        user
      }
    } catch (err) {
      throw new BadRequestException("id is correct ?")
    }
  }

  async update(id: string, UpdateProductDto: UpdateProductDto) {
    try {
      let product = await this.productModel.updateOne({ _id: id }, { $set: { ...UpdateProductDto } })
      return {
        message: "update an product by id",
        product
      }
    } catch (err) {
      throw new BadRequestException("Id is correct ?")
    }
  }

  async remove(id: string) {
    try {
      let product = await this.productModel.deleteOne({ _id: id })
      return {
        message: "delete a user by id",
        product
      }
    } catch (err) {
      throw new BadRequestException("Id is correct ?")
    }
  }

  async updateCommentToProduct(_id: string, commentID: any) {
    await this.productModel.updateOne({ _id }, { $push: { comments: commentID } })

  }

  async updateSoldProduct(item) {
    item?.map(async book => {
      let quantity = +book.quantity
      let prod = await this.productModel.findOne({ _id: book.id }).exec()
      await this.productModel.updateOne({ mainText: book.name }, { $set: { sold: prod.sold += (quantity) } })

    });

  }
}
