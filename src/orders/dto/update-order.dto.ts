import { IsNotEmpty, Length } from 'class-validator';

export class UpdateOrderDto {
    @IsNotEmpty()
    status: String

    @IsNotEmpty()
    name: String

    @IsNotEmpty()
    phoneNumber: number

    @IsNotEmpty()
    totalPrice: Number

    @IsNotEmpty()
    address: String

}
