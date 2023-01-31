import { LightModel } from "./app/light-model";
import { WaterModel } from "./app/water-model";
import { AsphaltModel } from "./app/asphalt-model";
import { CollectModel } from "./app/collect-model";
import { TrashModel } from "./app/trash-model";
import { SewerModel } from "./app/sewer-model";
import { PublicServiceModel } from "./app/publicservice-model";

export class ReportModel {

    lightList: LightModel[] = [];
    waterList: WaterModel[] = [];
    asphaltList: AsphaltModel[] = [];
    collectList: CollectModel[] = [];
    trashList: TrashModel[] = [];
    sewerList: SewerModel[] = [];
    publicServiceList: PublicServiceModel[] = [];

    count: number;
    countAsphalt: number;
    countSewer: number;
    countCollect: number;
    countTrash: number;
    countLight: number;
    countWater: number;
    countPublicService: number;

    alert: boolean;
    message: string;
}
