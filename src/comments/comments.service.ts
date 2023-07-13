import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';
import aqp from 'api-query-params';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>,
    private productService: ProductsService) { }

  async create(CreateCommentDto: CreateCommentDto, user) {
    let { productID, ...data } = CreateCommentDto

    let comment = await this.commentModel.create({ ...data, avatar: user.avatar, email: user.email })
    await this.productService.updateCommentToProduct(productID, comment._id)
    return {
      message: "Create a comments ! ",
      comment
    }
  }


  async findAll(queryString) {
    if (queryString) {
      let { filter, sort } = aqp(queryString)
      let { current, pageSize } = queryString
      delete filter.current
      delete filter.pageSize
      //@ts-ignore
      let listComment = await this.commentModel.find(filter).limit(pageSize).skip((current - 1) * pageSize).sort(sort)
      return {
        message: "Fetch list comment paginate",
        listComment
      }
    } else {
      let listComment = await this.commentModel.find({})
      return {
        message: "Fetch all comment",
        listComment
      }
    }
  }

  async findOne(id: string) {
    try {
      let user = await this.commentModel.findOne({ _id: id })
      return {
        message: "find an comment by id",
        user
      }
    } catch (err) {
      throw new BadRequestException("id is correct ?")
    }
  }

  async update(id: string, UpdateCommentDto: UpdateCommentDto) {
    try {
      let comment = await this.commentModel.updateOne({ _id: id }, { $set: { ...UpdateCommentDto } })
      return {
        message: "update an comment by id",
        comment
      }
    } catch (err) {
      throw new BadRequestException("Id is correct ?")
    }
  }

  async remove(id: string) {
    try {
      let comment = await this.commentModel.deleteOne({ _id: id })
      return {
        message: "delete a user by id",
        comment
      }
    } catch (err) {
      throw new BadRequestException("Id is correct ?")
    }
  }
}
