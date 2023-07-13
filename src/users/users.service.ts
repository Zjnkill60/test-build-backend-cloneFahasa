import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { CreateUserDto, RegisterGoogleUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as passwordHash from 'password-hash'
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }


  async create(createUserDto: CreateUserDto) {
    let { email, password } = createUserDto

    let hashPass = this.genarateHashPassword(password)
    let userExist = await this.userModel.find({ email })
    if (!userExist?.length) {
      let user = await this.userModel.create({ ...createUserDto, password: hashPass, avatar: 'http://localhost:8088/images/hoidanit-1688431246894.png' })
      return {
        message: "Create a new user",
        user
      }
    } else {
      throw new BadRequestException("Email đã tồn tại trong hệ thống !")
    }

  }

  async findAll(queryString) {
    if (queryString) {
      let { filter, sort } = aqp(queryString)
      let { current, pageSize } = queryString
      delete filter.current
      delete filter.pageSize

      console.log(filter)
      //@ts-ignore
      let listUser = await this.userModel.find(filter).limit(+pageSize).skip((current - 1) * pageSize).sort(sort).populate('orderHistory')
      return {
        message: "Fetch list user paginate",
        listUser
      }
    } else {
      let listUser = await this.userModel.find({}).populate('orderHistory')
      return {
        message: "Fetch all user",
        listUser
      }
    }
  }

  async findOne(id: string) {
    try {
      let user = await this.userModel.findOne({ _id: id }).populate('orderHistory')
      return {
        message: "find a user by id",
        user
      }
    } catch (err) {
      throw new BadRequestException("id is correct ?")
    }
  }

  async findByEmail(email: string) {
    try {
      let user = await this.userModel.findOne({ email })

      return user
    } catch (err) {
      throw new BadRequestException("email is correct ?")
    }
  }

  async findByRefreshToken(refreshToken: string) {
    console.log(refreshToken)
    let user = await this.userModel.findOne({ refreshToken: refreshToken }).exec()
    console.log(user)
    return user

  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let { role, password } = updateUserDto
      let user = await this.userModel.updateOne({ _id: id }, { $set: { role, password } })
      return {
        message: "update a user by id",
        user
      }
    } catch (err) {
      throw new BadRequestException("Id is correct ?")
    }
  }

  async remove(id: string) {

    let userExist = await this.userModel.findOne({ _id: id })
    if (userExist.role == "ADMIN") {
      throw new BadRequestException("Không thể xoá tài khoản ADMIN !")
    } else {
      let user = await this.userModel.deleteOne({ _id: id })
      return {
        message: "delete a user by id",
        user
      }
    }


  }

  genarateHashPassword = (password: String) => {
    let passwordHashReturn = passwordHash.generate(password)
    return passwordHashReturn
  }

  verifyHashPassword = (password: String, hashedPassword: String) => {
    return passwordHash.verify(password, hashedPassword)
  }

  updateRefreshTokenToDatabase = async (_id, refreshToken: string) => {
    await this.userModel.updateOne({ _id }, { $set: { refreshToken } })
  }

  deleteRefreshTokenToDatabase = async (_id: string) => {
    await this.userModel.updateOne({ _id }, { $set: { refreshToken: "" } })
  }

  registerUser = async (data: RegisterUserDto) => {
    let { email, password } = data
    let hashPass = this.genarateHashPassword(password)
    let userExist = await this.userModel.find({ email })
    if (!userExist?.length) {
      let user = await this.userModel.create({ ...data, password: hashPass, avatar: 'hoidanit-1688431246894.png', role: "USER" })
      return {
        message: "Register user success !",
        user
      }
    } else {
      throw new BadRequestException("Email đã tồn tại trong hệ thống !")
    }

  }

  registerUserGoogle = async (data: RegisterGoogleUserDto) => {
    let { email } = data
    let userExist = await this.userModel.findOne({ email: email }).exec()
    if (!userExist) {
      let user = await this.userModel.create({ ...data, role: "USER" })
      return user

    } else {
      return userExist
    }


  }

  updateOrderHistoryUser = async (email: any, _id: any) => {
    await this.userModel.updateOne({ email }, { $push: { orderHistory: _id } })
  }
}
