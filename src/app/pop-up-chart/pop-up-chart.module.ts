import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpChartComponent } from "./pop-up-chart.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [PopUpChartComponent],
    exports: [PopUpChartComponent]
})
export class PopUpChartModule { }