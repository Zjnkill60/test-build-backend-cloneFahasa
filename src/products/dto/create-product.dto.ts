import { IsNotEmpty, IsNumberString } from "class-validator"

export class CreateProductDto {


    @IsNotEmpty()
    author: String

    @IsNotEmpty()
    mainText: String


    @IsNotEmpty()
    price: Number


    @IsNotEmpty()
    sold: Number


    @IsNotEmpty()
    quantity: Number

    @IsNotEmpty()
    thumbnail: String

    @IsNotEmpty()
    slider: String[]

}
