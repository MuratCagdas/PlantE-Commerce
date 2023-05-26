export interface IProductType {
    name: string;
}
export interface IProduct {
    name: string,
    type: IProductType,
    price: string,
    url: string,
    information: string;
}
export interface IList_Product {
    id?: number,
    name: string,
    type: string,
    price: number,
    url: string,
    information: string;
}
