import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { BarChartComponent } from './barchart/barchart.component';
// import { LinechartComponent } from './linechart/linechart.component';
// import { DonutChartComponent } from './donut-chart/donut-chart.component';
// import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
// import { MultiLineChartComponent } from './multi-line-chart/multi-line-chart.component';
// import { AreaChartComponent } from './area-chart/area-chart.component';
// import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
// import { WaterfallChartComponent } from './waterfall-chart/waterfall-chart.component';
// import { BarChartComponent } from './barchart/barchart.component';
// import { LinechartComponent } from './linechart/linechart.component';
// import { DonutChartComponent } from './donut-chart/donut-chart.component';
// import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
// import { MultiLineChartComponent } from './multi-line-chart/multi-line-chart.component';
// import { AreaChartComponent } from './area-chart/area-chart.component';
// import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
import { SankeyComponent } from './sankey/sankey.component';
import {DemoComponent } from './demo/demo.component';

const appRoutes: Routes = <Routes>[
  {
    path: 'app-demo',
    component: DemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
