import { DatePipe } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { environment } from '../../environments/environment';

import { MapModel } from '../_models/map-model'
import { SearchModel } from '../_models/search-model';
import { ReportModel } from '../_models/report-model';

import { MapService } from '../_services/map.service';
import { ExportService } from '../_services/export.service';
import { ReportService } from '../_services/report.service';

@Component({
  selector: 'app-map',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {
  readonly env = environment;
  report: ReportModel;
  searchModel: SearchModel;
  ddlTypeIssue: number = -1;
  ddlView: number = 0;
  maps: MapModel[] = [];
  map: MapModel;

  @ViewChild('searchTable') searchTable: ElementRef;  
  
  constructor(private apiMap:MapService, private apiReport:ReportService, private apiExport:ExportService){ 
      this.report = new ReportModel();  
      this.searchModel = new SearchModel();
      this.map = new MapModel();
      this.map.zoom = environment.defaultLocation.zoom;
      this.map.latitude = environment.defaultLocation.latitude;
      this.map.longitude = environment.defaultLocation.longitude;
    }

  async ngOnInit(): Promise<void> {
    await this.apiGetAll('0','0');
    await this.apiGetAllMap('0','0', '-1');
  }
    


  btFilterDataEvent()
  {
    this.showAlert('');

    if(! this.validateDate(this.searchModel.startDate, this.searchModel.endDate))
    {
      this.showAlert('Data inválida. Favor revisar as informações inseridas.');
    }
    else
    {
      var ticksStartDate = ((new Date(this.searchModel.startDate).getTime() * 10000) + 621355968000000000);
      var ticksEndDate = ((new Date(this.searchModel.endDate).getTime() * 10000) + 621355968000000000);
      this.apiGetAll(ticksStartDate.toString(), ticksEndDate.toString());
      this.apiGetAllMap(ticksStartDate.toString(), ticksEndDate.toString(), this.ddlTypeIssue.toString());
    }
  }

  btGetAllEvent(){
    this.showAlert('');
    this.searchModel.startDate = '';
    this.searchModel.endDate = '';
    this.apiGetAll('0','0');
    this.apiGetAllMap('0','0','-1');
  } 

  btExportTableEvent(){
    if(confirm("Deseja exportar os dados?"))
      this.apiExport.exportTableElmToExcel(this.searchTable, 'Report-' + Date.now.toString());
  }

  ddlTypeIssueEvent(){
    var ticksStartDate = 0;
    var ticksEndDate = 0;

    if(this.validateDate(this.searchModel.startDate, this.searchModel.endDate))
    {
      ticksStartDate = ((new Date(this.searchModel.startDate).getTime() * 10000) + 621355968000000000);
      ticksEndDate = ((new Date(this.searchModel.endDate).getTime() * 10000) + 621355968000000000);  
    }
    
    this.apiGetAllMap(ticksStartDate.toString(), ticksEndDate.toString(), this.ddlTypeIssue.toString());
  }



  async apiGetAllMap(startDate: string, endDate: string, typeIssue: string)
  {
    this.searchModel.page = environment.pagination;
    this.searchModel.skip = 0;
    this.maps = [];

    (await this.apiMap.GetAll(startDate, endDate, typeIssue))
    .subscribe({
      next: (data:any) => {
        for(let item of data.regions)
        {
          let mp = new MapModel();
          mp.title = item.title;
          mp.type = item.type;
          mp.property01 = item.description.split('|')[0];
          mp.property02 = item.description.split('|')[1];
          mp.property03 = item.description.split('|')[2];
          mp.property04 = item.description.split('|')[3];
          mp.latitude = item.latitude;
          mp.longitude = item.longitude;
          mp.icon = this.convertIcon(item.type);
          this.maps.push(mp);
        }
      },
      error: error => {
        console.error(error);
        this.showAlert('Sistema apresentando falhas. Favor tentar novamente mais tarde :(');
        setTimeout(() => {
          this.showAlert('Sistema indisponível. Favor tentar novamente mais tarde :(');
        }, 30000);
      },
    });
  }

  async apiGetAll(startDate: string, endDate: string)
  {
    this.searchModel.page = environment.pagination;
    this.searchModel.skip = 0;

    (await this.apiReport.GetAll(startDate, endDate))
    .subscribe({
      next: (data:any) => {
        this.report.countWater = data.countWater;
        this.report.waterList = data.waterList;
        
        this.report.countLight = data.countLight;
        this.report.lightList = data.lightList;

        this.report.countAsphalt = data.countAsphalt;
        this.report.asphaltList = data.asphaltList;

        this.report.countCollect = data.countCollect;
        this.report.collectList = data.collectList;

        this.report.countSewer = data.countSewer;
        this.report.sewerList = data.sewerList;

        this.report.countTrash = data.countTrash;
        this.report.trashList = data.trashList;

        this.report.countPublicService = data.countPublicService;
        this.report.publicServiceList = data.publicServiceList;
      },
      error: error => {
        console.error(error);
        this.showAlert('Sistema apresentando falhas. Favor tentar novamente mais tarde :(');
        setTimeout(() => {
          this.showAlert('Sistema indisponível. Favor tentar novamente mais tarde :(');
        }, 30000);
      },
    });
  }



  convertBoolToPt(value: boolean){
    if(value)
      return "Sim";
    else
      return "Não";
  }

  convertDateToPt(value: string){
    var pipe = new DatePipe('en-US');
    return pipe.transform(value, 'mediumDate');
  }

  convertIcon(value: number){
    let icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"; // default icon
    
    switch (value){
      case 0:
        icon = environment.type.Asphalt.icon;
      break;
      case 1:
        icon = environment.type.Collect.icon;
      break;
      case 2:
        icon = environment.type.Light.icon;
      break;
      case 3:
        icon = environment.type.PublicService.icon;
      break;
      case 4:
        icon = environment.type.Sewer.icon;
      break;
      case 5:
        icon = environment.type.Trash.icon;
      break;
      case 6:
        icon = environment.type.Water.icon;
      break;
    }
    
    return icon;
  }

  validateDate(startDate: string, endDate: string){
    if(!startDate || !endDate)
      return false;
    else if(startDate > endDate)
      return false;
    else
      return true;
  }

  showAlert(message: string){
    if(! message)
    {
      this.report.alert = false;
      this.report.message = '';
    }
    else
    {
      this.report.alert = true;
      this.report.message = message;
    }
  }

  /*
  paginationData(page: number)
  {
    if(page >= 0 && page <= this.order.totalPage)
    {
      this.searchModel.skip = environment.pagination * page;
      this.searchModel.page = environment.pagination;

      this.apiOrder.Patch(this.searchModel)
      .subscribe({
        next: (data:any) => {
          if(data.total > 0)
            this.orders = data.orders;
          else
            this.orders = [];
          this.order.totalItems = data.total;
          this.order.totalPage = Math.floor(data.total / environment.pagination);
          this.order.page = data.page;
        },
        error: error => {
            this.order.callbackSuccess = false;
            this.order.callbackMessage = error;
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
            }, 5000);
            console.error(error);
        },
      });
    }
  }  
  */
}