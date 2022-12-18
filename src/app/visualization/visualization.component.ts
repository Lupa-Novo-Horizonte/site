import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { MapService } from '../_services/map.service';
import { MapModel } from '../_models/map-model'
import { SearchModel } from '../_models/search-model';

@Component({
  selector: 'app-map',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {
  readonly env = environment;

  maps: MapModel[] = [];
  map: MapModel;
  searchModel: SearchModel;
  
  modal: boolean;
  readonly: boolean;
  alert: boolean;

  ddlOcorrencyIndex: number;

  constructor(private apiMap:MapService){ 
      this.searchModel = new SearchModel();
      this.modal = false;
      this.readonly = true;
      this.alert = false;

      this.map = new MapModel();
      this.map.zoom = environment.defaultLocation.zoom;
      this.map.latitude = environment.defaultLocation.latitude;
      this.map.longitude = environment.defaultLocation.longitude;
    }

  ngOnInit(): void {
    this.getAll();    
  }

  
  filterData()
  {
    this.apiMap.GetBy(this.searchModel.id)
      .subscribe({
        next: (data:any) => {
          console.log('Success');
          if(data.total > 0){
            this.maps = data.regions;
            //this.convertToMapsArray(data.orders);
          }
          else
          {
            this.maps = [];
          }
          /*
          this.map.totalItems = data.total;
          this.map.totalPage = Math.floor(data.total / environment.pagination);
          this.map.page = data.page;          
          this.map.callbackSuccess = true;
          this.map.callbackMessage = 'Success.';
          this.alert = true;
          */
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        },
        error: error => {
          /*
          this.map.callbackSuccess = false;
          this.map.callbackMessage = error;
          */
          console.log('Error');
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 5000);
          console.error(error);
        },
      });
    console.log('Fim');

    this.modal = false;
    this.readonly = true;
  }
  
  getAll()
  {
    this.searchModel.page = environment.pagination;
    this.searchModel.skip = 0;

    this.apiMap.GetAll()
    .subscribe({
      next: (data:any) => {
        console.info('Success');
        if(data.regions.length > 0){
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
            this.maps.push(mp);
          }
          console.info(this.maps);
        }
        else
        {
          this.maps = [];
        }
        /*
        this.order.totalItems = data.total;
        this.order.totalPage = Math.floor(data.total / environment.pagination);
        this.order.page = data.page;
        */
      },
      error: error => {
        console.info('Error');
        /*
        this.order.callbackSuccess = false;
        this.order.callbackMessage = error;
        */
        this.alert = true;
        console.error(error);
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      },
    });
    console.info('End');
  }

 /*
  getAllOcorrency()
  {
    this.apiOcorrency.GetAll()
    .subscribe({
      next: (data:any) => {
        this.ocorrencies = data.ocorrencies;
      },
      error: error => {
        this.alert = true;
        console.error(error);
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      },
    });
  }

  getAllOcorrencyDetail(ocorrencyId : number)
  {
    if(ocorrencyId > 0)
    {
      this.apiDetail.GetAll(ocorrencyId)
      .subscribe({
        next: (data:any) => {
          this.details = data.ocorrencyDetails;
        },
        error: error => {
          this.alert = true;
          console.error(error);
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        },
      });
    }
    else
      this.details = [];
  }

  getAllStatus()
  {
    this.apiStatus.GetAll()
    .subscribe({
      next: (data:any) => {
        this.statuses = data.orderStatus;
      },
      error: error => {
        this.alert = true;
        console.error(error);
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      },
    });
  }

  convertToMapsArray(orders: OrderModel[])
  {
    this.maps = [];
    for (let index = 0; index < orders.length; index++) {
      const element = orders[index];
      let mp = new VisualizationModel();
      mp.id = element.id.toString();
      mp.latitude = parseFloat(element.latitude);
      mp.longitude = parseFloat(element.longitude);
      mp.ocorrency = element.ocorrency.name;
      mp.ocorrencyDetail = element.ocorrencyDetail.description;
      mp.orderStatus = element.orderStatus.name;
      mp.createdAt = element.createdAt;
      this.maps.push(mp);
    }
  }

  editData(id: string)
  {
    var result = this.orders.find(x => x.id == parseInt(id));
    if(result != null)
    {
      this.order.id = result['id'];
      this.order.latitude = result['latitude'];
      this.order.longitude = result['longitude'];
      this.order.ocorrency = result['ocorrency'];
      this.order.ocorrencyDetail = result['ocorrencyDetail'];
      this.order.orderStatus = result['orderStatus'];
      this.order.createdAt = result['createdAt'];
      this.modal = true;
      this.readonly = false;

      this.ddlOcorrencyIndex = (this.ocorrencies.findIndex(c => c.id == this.order.ocorrency.id)) + 1;
      this.ddlStatusIndex = (this.statuses.findIndex(c => c.id == this.order.orderStatus.id)) + 1;
      this.getAllOcorrencyDetail(this.order.ocorrency.id);
      this.ddlDetailIndex = this.order.ocorrencyDetail.id;
    }
  }

  putData()
  {
    this.order.ocorrencyId = this.ocorrencies[this.ddlOcorrencyIndex -1].id;
    this.order.ocorrencyDetailId = this.ddlDetailIndex;
    this.order.orderStatusId = this.statuses[this.ddlStatusIndex -1].id;
        
    this.apiOrder.Put(this.order)
      .subscribe({
        next: (data:any) => {
          this.ngOnInit();
          this.order.callbackSuccess = true;
          this.order.callbackMessage = 'Success.';
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 5000);
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
    
    this.modal = false;
    this.readonly = true;
  }

  closeData()
  {
    this.modal = false;
    this.readonly = true;
  }
  */
}