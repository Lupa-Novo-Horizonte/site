import { BaseModel } from "./base-model";

export class SewerModel extends BaseModel{
    hasHomeSewer: boolean;
    hasHomeCesspool: boolean;
    hasSanitationProject: boolean;
}
