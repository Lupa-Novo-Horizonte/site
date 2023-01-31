import { BaseModel } from "./base-model";

export class WaterModel extends BaseModel {
    homeWithWater: boolean;
    waterMissedInAWeek: number;
    hasWell: boolean;
    hasSanitationProject: boolean;
}
