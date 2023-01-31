export class BaseModel {
    id!: number;
    title!: string;
    type!: string;
    longitude!: string;
    latitude!: string;
    createdAt!: string;

    totalItems: number;
    totalPage: number;
    page: number;
    
    callbackSuccess!: boolean;
    callbackMessage!: string;
}
