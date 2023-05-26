export interface ILike_Item {
    name: string,
    type: string,
    price: number,
    information: string,
    color: string,
    url: string;
}
export interface ILike {
    mail: string,
    likeproduct: ILike_Item[];
}
export interface ILike_List {
    id: number,
    mail: string,
    likeproduct: ILike_Item[];
}
