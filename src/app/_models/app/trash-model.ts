import { BaseModel } from "./base-model";

export class TrashModel extends BaseModel {
    hasRoadcleanUp: boolean;
    howManyTimes: number;
    hasAccumulatedTrash: boolean;
    hasLandWeeding: boolean;
}
