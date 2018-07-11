import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SankeyComponent} from "./sankey.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      SankeyComponent,
  ],
  exports: [
      SankeyComponent,
  ]
})
export class SankeyModule { }
