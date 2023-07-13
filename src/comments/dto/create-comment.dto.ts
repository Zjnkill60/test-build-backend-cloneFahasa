import { IsNotEmpty } from "class-validator"

export class CreateCommentDto {
    @IsNotEmpty()
    rate: Number

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    productID: string


}
