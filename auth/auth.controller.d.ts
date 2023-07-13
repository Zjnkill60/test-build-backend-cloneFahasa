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
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    Login(req: any, response: Response): Promise<{
        message: string;
        access_token: string;
        user: any;
    }>;
    Logout(response: Response, req: any): Promise<{
        message: string;
    }>;
    changePassword(data: any, req: any): Promise<{
        message: string;
        newHashPassword: any;
    }>;
    GoogleLogin(data: any, response: Response): Promise<{
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
    Register(registerUserDTO: RegisterUserDto): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").User> & Omit<import("../users/schema/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    getProfile(req: any): any;
    handleRefreshToken(req: any, response: Response): Promise<{
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
}
