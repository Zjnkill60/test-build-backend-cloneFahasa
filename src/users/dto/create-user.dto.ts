import { IsEmail, IsNotEmpty, IsNumberString, Length } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: String

    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: String

    @IsNotEmpty()
    password: String

    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 10, { message: 'Số điện thoại chỉ có thể là 10 số ' })
    phoneNumber: Number

    @IsNotEmpty()
    role: String




}

export class RegisterUserDto {
    @IsNotEmpty()
    name: String

    @IsNotEmpty()
    @IsEmail({}, { message: 'Email không đúng định dạng !' })
    email: String

    @IsNotEmpty()
    password: String

}

export class RegisterGoogleUserDto {
    @IsNotEmpty()
    name: String

    @IsNotEmpty()
    @IsEmail({}, { message: 'Email không đúng định dạng !' })
    email: String

    @IsNotEmpty()
    avatar: String

}