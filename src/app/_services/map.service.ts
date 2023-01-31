import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtService } from '../_services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http:HttpClient, private jwt: JwtService) { }

  GetAll(startDate: string, endDate: string, typeIssue: string)
  {
    /*
    let header = new HttpHeaders().set('Authorization', `bearer ` + this.jwt.jwtToken);

    console.log(this.jwt.jwtToken);
    */
    return this.http.get(environment.endpoints.map, 
    {
      //headers : header
      params: {
        longStartDate: startDate,
        longEndDate: endDate,
        typeIssue: typeIssue
      }
    })
  }

  GetBy(id: string)
  {
    /*
    let header = new HttpHeaders()
      .set('Authorization', `bearer ` + this.jwt.jwtToken);

    console.log(this.jwt.jwtToken);
    */

    return this.http.get(environment.endpoints.map, 
    {
      //headers : header
    })
  }
}
