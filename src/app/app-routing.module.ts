import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticesComponent } from './notices/notices.component';
import { NoticeDetailComponent } from './notice-detail/notice-detail.component';
import { NoticeAddComponent } from './notice-add/notice-add.component';
import { NoticeEditComponent } from './notice-edit/notice-edit.component';

const routes: Routes = [
  {
    path: 'notices',
    component: NoticesComponent,
    data: { title: 'Mural de Avisos' }
  },
  {
    path: 'notice-details/:id',
    component: NoticeDetailComponent,
    data: { title: 'Aviso' }
  },
  {
    path: 'notice-add',
    component: NoticeAddComponent,
    data: { title: 'Criar Aviso' }
  },
  {
    path: 'notice-edit/:id',
    component: NoticeEditComponent,
    data: { title: 'Editar Aviso' }
  },
  { path: '',
    redirectTo: '/notices',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
