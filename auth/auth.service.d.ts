/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { JwtService } from '@nestjs/jwt';
import { RegisterGoogleUserDto, RegisterUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser: (username: string, password: string) => Promise<{
        name: String;
        email: String;
        phoneNumber: Number;
        role: String;
        _id: import("mongoose").Types.ObjectId;
        avatar: String;
    }>;
    login(user: any, response: any): Promise<{
        message: string;
        access_token: string;
        user: any;
    }>;
    logout(dataJWT: any): Promise<{
        message: string;
    }>;
    googleLogin(dataUserGoogle: RegisterGoogleUserDto, response: any): Promise<{
        message: string;
        access_token: string;
        newPayload: {
            avatar: String;
            _id: import("mongoose").Types.ObjectId;
            name: String;
            email: String;
            role: String;
        };
    }>;
    register(registerUserDTO: RegisterUserDto): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").User> & Omit<import("../users/schema/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    refresh(refreshToken: any, response: any): Promise<{
        message: string;
        access_token: string;
        user: {
            name: String;
            email: String;
            phoneNumber: Number;
            role: String;
            _id: import("mongoose").Types.ObjectId;
            avatar: String;
        };
    }>;
    changePasswordUser(dataPassword: any, dataUser: any): Promise<{
        message: string;
        newHashPassword: any;
    }>;
    genarateRefreshToken: (payload: any) => string;
}
