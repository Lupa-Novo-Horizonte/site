export class BaseModel {
    id!: number;
    longitude!: string;
    latitude!: string;
    createdAt!: string;

    totalItems: number;
    totalPage: number;
    page: number;
    
    callbackSuccess!: boolean;
    callbackMessage!: string;
}
