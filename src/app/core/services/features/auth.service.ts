import { Injectable, Injector } from '@angular/core';
import { BaseService } from '../global/base.service';
import { ApiUrls } from '../../config/api-urls';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends BaseService{

  constructor(injector: Injector) {
    super(injector);
  }

  login(body:any){
    return this.post(ApiUrls.auth.login, body);
  }


}
