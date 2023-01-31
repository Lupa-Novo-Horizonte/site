import { BaseModel } from "./base-model";

export class LightModel extends BaseModel {
    hasLight: boolean;
    isItWorking: boolean;
    hasLosesCable: boolean;
    path: string;
}
