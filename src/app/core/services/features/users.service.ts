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

  // get single user
  getUser(id: any) {
    return this.get(`${ApiUrls.users}/${id}`);
  }

  // Add user
  addUser(id: any, body: any) {
    return this.post(`${ApiUrls.users}/${id}`, body);
  }

  // Update  user
  updateUser(id: any, body: any) {
    return this.put(`${ApiUrls.users}/${id}`, body);
  }

  // Delete user
  deleteUser(id: any) {
    return this.delete(ApiUrls.users + '/' + id);
  }
}
