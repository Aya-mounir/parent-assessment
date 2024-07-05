import { Injectable, Injector } from '@angular/core';
import { BaseService } from '../global/base.service';
import { ApiUrls } from '../../config/api-urls';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  // get All Users
  getAllUsers(params: string) {
    return this.get(ApiUrls.users + params);
  }
}
