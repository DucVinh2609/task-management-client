import { Injectable } from '@angular/core';
import dummy from 'src/assets/data/project.json';
import { UsersService } from '@trungk18/project/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class UserProjectsService {

  constructor(private usersService: UsersService) { }

  addUserProjects(email: string, projectId: number) {
    let userId = this.usersService.getIdUserByEmail(email);
    let newUserProjects = {
      "userId": userId,
      "projectId": projectId
    }
    if (userId) {
      dummy.userProjects.push(newUserProjects);
    }
  }
}
