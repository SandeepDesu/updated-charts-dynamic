import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { StandardBuilder } from '../DataBuilders';
import { DisplayComponent } from '../dynamic-display/IDisplayComponent';
import { DynamicComponent } from '../dynamic-display/DynamicComponent';
import { LinechartComponent } from '../linechart/linechart.component';
import { BarChartComponent } from '../barchart/barchart.component';

@Component({
    selector: 'app-pop-up-chart',
    templateUrl: './pop-up-chart.component.html',
    styleUrls: ['./pop-up-chart.component.css']
})

export class PopUpChartComponent extends DisplayComponent<StandardBuilder> implements OnInit {
    lineChart: any;
    barChart: any;
    isLineChart: Boolean = false;

    constructor(private resolver: ComponentFactoryResolver, private selectedDirective: ViewContainerRef) {
        super();
    }

    ngOnInit() {
        this.loadComponents();
    }

    loadComponents() {
        this.lineChart = new DynamicComponent(LinechartComponent, this.Source, this.resolver);
        this.lineChart.CreateComponent(this.selectedDirective);
        this.barChart = new DynamicComponent(BarChartComponent, this.Source, this.resolver);
        this.barChart.CreateComponent(this.selectedDirective);
        this.barChart.Show();
    }

    showLineChart() {
        if (this.lineChart && !this.isLineChart) {
            this.isLineChart = true;
            this.barChart.Hide();
            this.lineChart.Show();
        } else {
            this.isLineChart = false;
            this.barChart.Show();
            this.lineChart.Hide();
        }
    }

    protected postLoad(): void {

    }

}