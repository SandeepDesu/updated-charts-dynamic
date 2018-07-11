import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistogramComponent} from "./histogram-chart.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HistogramComponent],
  exports: [HistogramComponent]
})
export class HistogramChartModule { }
