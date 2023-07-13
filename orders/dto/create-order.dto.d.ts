declare class Item {
    name: String;
    thumbnail: String;
    quantity: Number;
}
export declare class CreateOrderDto {
    name: String;
    email: String;
    phoneNumber: Number;
    totalPrice: Number;
    address: String;
    item: Item;
    status: String;
}
export {};
