import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginModel } from '../_models/login-model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

    constructor(private http:HttpClient) {
    }
 
    cache:string;

    async getToken() {
      let jwtToken = this.getTokenCached();

      if(this.isTokenExpired(jwtToken))
      {  
        let response = await this.authenticate(environment.token.login, environment.token.password);
        this.cache = response.token;
        return response.token;
      }
      else
      {
        return jwtToken;
      }
    }

    private getTokenCached() {
      if (this.cache) {
        //console.log('Returning cached value!')
      }
      return this.cache;
    }
 
    private getExpiryTime(jwtToken: string) {
      if(jwtToken){
        var decodedToken: { [key: string]: string };
        decodedToken = jwt_decode(jwtToken);
        return decodedToken ? decodedToken.exp : '';
      }
      else
      {
        return '';
      }
    }
 
    private isTokenExpired(jwtToken : string): boolean {
      let number = this.getExpiryTime(jwtToken)
      if(number)
      {
        const expiryTime: number = parseFloat(number);
        if (expiryTime) {
          return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
        } else {
          return false;
        }
      }
      else
        return true;
    }   

    private async authenticate(login: string, password: string) : Promise<LoginModel>
    {
      let model = {
        Username: login,
        Password: password,
      }      
      return await this.http.post<LoginModel>(environment.endpoints.login, model).toPromise<LoginModel>()
    }
}
