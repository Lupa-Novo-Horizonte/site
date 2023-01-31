import { BaseModel } from "./base-model";

export class AsphaltModel extends BaseModel {
    isPaved: boolean;
    hasHoles: boolean;
    hasPavedSidewalks: boolean;
    path: string;
}
