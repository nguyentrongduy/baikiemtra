import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'logs',
    component: LogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
