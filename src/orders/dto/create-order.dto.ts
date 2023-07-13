import { IsNotEmpty, IsNumberString, ValidateNested } from "class-validator"

class Item {
    @IsNotEmpty()
    name: String


    @IsNotEmpty()
    thumbnail: String

    @IsNotEmpty()
    quantity: Number

}
export class CreateOrderDto {
    @IsNotEmpty()
    name: String

    @IsNotEmpty()
    email: String


    @IsNotEmpty()
    @IsNumberString()
    phoneNumber: Number

    @IsNotEmpty()
    totalPrice: Number

    @IsNotEmpty()
    address: String

    @ValidateNested()
    @IsNotEmpty()
    item: Item


    status: String

}
