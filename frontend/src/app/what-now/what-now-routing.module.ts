import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatNowPage } from './what-now.page';

const routes: Routes = [
  {
    path: '',
    component: WhatNowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatNowPageRoutingModule {}
