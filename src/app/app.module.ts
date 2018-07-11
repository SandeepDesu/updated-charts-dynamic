import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LinechartComponent } from './linechart/linechart.component';
import { BarChartComponent } from './barchart/barchart.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { AppRoutingModule } from './app.routing.module';
import { MultiLineChartComponent } from './multi-line-chart/multi-line-chart.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
import { DynamicDirective } from './dynamic-display/DynamicContent.directive';
import { PopUpComponent } from './pop-up/pop-up.component';
import { WaterfallChartComponent } from './waterfall-chart/waterfall-chart.component';
import { SankeyComponent } from './sankey/sankey.component';
import { DemoComponent } from './demo/demo.component';
import { TableComponent } from './table/table.component';
import { HistogramComponent } from './histogram-chart/histogram-chart.component';
import { PopUpChartComponent } from './pop-up-chart/pop-up-chart.component';
import { LinechartModule } from './linechart/linechart.module';
import {OnlineChartEditorComponent} from './online-chart-editor/online-chart-editor.component';
@NgModule({
  declarations: [
    AppComponent,
    LinechartComponent,
    BarChartComponent,
    DonutChartComponent,
    MultiLineChartComponent,
    StackedBarChartComponent,
    AreaChartComponent,
    GroupedBarChartComponent,
    PopUpComponent,
    DynamicDirective,
    WaterfallChartComponent,
    SankeyComponent,
    DemoComponent,
    TableComponent,
    HistogramComponent,
    PopUpChartComponent,
    OnlineChartEditorComponent
  ],
  entryComponents: [PopUpChartComponent, LinechartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
