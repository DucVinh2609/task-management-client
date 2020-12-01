import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '@trungk18/project/pages/index/index.component';
import { ErrorComponent } from '@trungk18/project/pages/common/error/error.component';
import { LoginComponent } from '@trungk18/project/pages/common/login/login.component';
import { RegistrationComponent } from '@trungk18/project/pages/common/registration/registration.component';
import { BoardComponent } from '@trungk18/project/pages/board/board.component';
import { AccountSettingComponent } from '@trungk18/project/pages/common/account-setting/account-setting.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'account-setting',
    component: AccountSettingComponent
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule)
  },
  {
    path: 'project/board/:nameProject',
    component: BoardComponent
  },
  {
    path: 'wip',
    loadChildren: () =>
      import('./work-in-progress/work-in-progress.module').then(
        (m) => m.WorkInProgressModule
      )
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'error',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
