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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const passwordHash = require("password-hash");
const api_query_params_1 = require("api-query-params");
let UsersService = exports.UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.genarateHashPassword = (password) => {
            let passwordHashReturn = passwordHash.generate(password);
            return passwordHashReturn;
        };
        this.verifyHashPassword = (password, hashedPassword) => {
            return passwordHash.verify(password, hashedPassword);
        };
        this.updateRefreshTokenToDatabase = async (_id, refreshToken) => {
            await this.userModel.updateOne({ _id }, { $set: { refreshToken } });
        };
        this.deleteRefreshTokenToDatabase = async (_id) => {
            await this.userModel.updateOne({ _id }, { $set: { refreshToken: "" } });
        };
        this.registerUser = async (data) => {
            let { email, password } = data;
            let hashPass = this.genarateHashPassword(password);
            let userExist = await this.userModel.find({ email });
            if (!userExist?.length) {
                let user = await this.userModel.create({ ...data, password: hashPass, avatar: 'hoidanit-1688431246894.png', role: "USER" });
                return {
                    message: "Register user success !",
                    user
                };
            }
            else {
                throw new common_1.BadRequestException("Email đã tồn tại trong hệ thống !");
            }
        };
        this.registerUserGoogle = async (data) => {
            let { email } = data;
            let userExist = await this.userModel.findOne({ email: email }).exec();
            if (!userExist) {
                let user = await this.userModel.create({ ...data, role: "USER" });
                return user;
            }
            else {
                return userExist;
            }
        };
        this.updateOrderHistoryUser = async (email, _id) => {
            await this.userModel.updateOne({ email }, { $push: { orderHistory: _id } });
        };
    }
    async create(createUserDto) {
        let { email, password } = createUserDto;
        let hashPass = this.genarateHashPassword(password);
        let userExist = await this.userModel.find({ email });
        if (!userExist?.length) {
            let user = await this.userModel.create({ ...createUserDto, password: hashPass, avatar: 'http://localhost:8088/images/hoidanit-1688431246894.png' });
            return {
                message: "Create a new user",
                user
            };
        }
        else {
            throw new common_1.BadRequestException("Email đã tồn tại trong hệ thống !");
        }
    }
    async findAll(queryString) {
        if (queryString) {
            let { filter, sort } = (0, api_query_params_1.default)(queryString);
            let { current, pageSize } = queryString;
            delete filter.current;
            delete filter.pageSize;
            console.log(filter);
            let listUser = await this.userModel.find(filter).limit(+pageSize).skip((current - 1) * pageSize).sort(sort).populate('orderHistory');
            return {
                message: "Fetch list user paginate",
                listUser
            };
        }
        else {
            let listUser = await this.userModel.find({}).populate('orderHistory');
            return {
                message: "Fetch all user",
                listUser
            };
        }
    }
    async findOne(id) {
        try {
            let user = await this.userModel.findOne({ _id: id }).populate('orderHistory');
            return {
                message: "find a user by id",
                user
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("id is correct ?");
        }
    }
    async findByEmail(email) {
        try {
            let user = await this.userModel.findOne({ email });
            return user;
        }
        catch (err) {
            throw new common_1.BadRequestException("email is correct ?");
        }
    }
    async findByRefreshToken(refreshToken) {
        console.log(refreshToken);
        let user = await this.userModel.findOne({ refreshToken: refreshToken }).exec();
        console.log(user);
        return user;
    }
    async update(id, updateUserDto) {
        try {
            let { role, password } = updateUserDto;
            let user = await this.userModel.updateOne({ _id: id }, { $set: { role, password } });
            return {
                message: "update a user by id",
                user
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("Id is correct ?");
        }
    }
    async remove(id) {
        let userExist = await this.userModel.findOne({ _id: id });
        if (userExist.role == "ADMIN") {
            throw new common_1.BadRequestException("Không thể xoá tài khoản ADMIN !");
        }
        else {
            let user = await this.userModel.deleteOne({ _id: id });
            return {
                message: "delete a user by id",
                user
            };
        }
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map