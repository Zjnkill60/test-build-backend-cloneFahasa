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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.validateUser = async (username, password) => {
            let user = await this.usersService.findByEmail(username);
            let verifyPassword = this.usersService.verifyHashPassword(password, user.password);
            if (user && verifyPassword) {
                const { name, email, phoneNumber, role, _id, avatar } = user;
                return {
                    name, email, phoneNumber, role, _id, avatar
                };
            }
            else {
                return null;
            }
        };
        this.genarateRefreshToken = (payload) => {
            return this.jwtService.sign(payload, { secret: 'zjnkill18', expiresIn: '6000000s' });
        };
    }
    async login(user, response) {
        const payload = user;
        const refreshToken = this.genarateRefreshToken(payload);
        await this.usersService.updateRefreshTokenToDatabase(payload._id, refreshToken);
        response.cookie('refreshToken', refreshToken, {
            expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
            httpOnly: true,
            sameSite: "none",
            secure: "false",
        });
        return {
            message: "Login",
            access_token: this.jwtService.sign(payload),
            user
        };
    }
    async logout(dataJWT) {
        await this.usersService.deleteRefreshTokenToDatabase(dataJWT._id);
        return {
            message: 'log out success !'
        };
    }
    async googleLogin(dataUserGoogle, response) {
        let userExist = await this.usersService.registerUserGoogle(dataUserGoogle);
        let { avatar, _id, name, email, role } = userExist;
        let newPayload = { avatar, _id, name, email, role };
        const refreshToken = this.genarateRefreshToken(newPayload);
        await this.usersService.updateRefreshTokenToDatabase(newPayload._id, refreshToken);
        response.cookie('refreshToken', refreshToken, {
            expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
            httpOnly: true,
            sameSite: "none",
            secure: "false",
        });
        return {
            message: "Login by google",
            access_token: this.jwtService.sign(newPayload),
            newPayload
        };
    }
    async register(registerUserDTO) {
        return this.usersService.registerUser(registerUserDTO);
    }
    async refresh(refreshToken, response) {
        console.log('refreshToken', refreshToken);
        let userExist = await this.usersService.findByRefreshToken(refreshToken);
        if (userExist) {
            const { name, email, phoneNumber, role, _id, avatar } = userExist;
            const user = { name, email, phoneNumber, role, _id, avatar };
            const newRefreshToken = this.genarateRefreshToken(user);
            await this.usersService.updateRefreshTokenToDatabase(user._id, newRefreshToken);
            response.cookie('refreshToken', newRefreshToken, {
                expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
                httpOnly: true,
                sameSite: "none",
                secure: "false",
            });
            return {
                message: "Refresh AccessToken",
                access_token: this.jwtService.sign(user),
                user
            };
        }
        else {
            throw new common_1.BadRequestException("Phiên đăng nhập hết hạn , vui lòng đăng nhập lại !");
        }
    }
    async changePasswordUser(dataPassword, dataUser) {
        const { currentPassword, newPassword } = dataPassword;
        let user = await this.usersService.findByEmail(dataUser.email);
        let verifyPassword = this.usersService.verifyHashPassword(currentPassword, user.password);
        if (verifyPassword) {
            let newHashPassword = this.usersService.genarateHashPassword(newPassword);
            await this.usersService.update(dataUser._id, { password: newHashPassword });
            return {
                message: "Change password user",
                newHashPassword
            };
        }
        else {
            throw new common_1.BadRequestException("Password is correct ? ");
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map