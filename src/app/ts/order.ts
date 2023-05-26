export interface IOrder_Item {
    name: string,
    type: string,
    price: number,
    peace: number;
}
export interface IOrder {
    mail: string,
    sellproduct: IOrder_Item[];
}
export interface IOrder_List {
    id: number,
    mail: string,
    sellproduct: IOrder_Item[];
}