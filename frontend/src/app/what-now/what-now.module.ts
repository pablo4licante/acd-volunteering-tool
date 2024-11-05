import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatNowPageRoutingModule } from './what-now-routing.module';

import { WhatNowPage } from './what-now.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatNowPageRoutingModule
  ],
  declarations: [WhatNowPage]
})
export class WhatNowPageModule {}
