import { Component, OnInit } from '@angular/core';
import { StandardBuilder } from '../DataBuilders';
@Component({
    selector: 'online-chart-editor',
    templateUrl: './online-chart-editor.component.html'
})

export class OnlineChartEditorComponent implements OnInit {
    private data: StandardBuilder;
    private displayLineChart = true;
    private displayBarChart = false;
    private table = [];
    private source = {
        'data': [
            {
                "Details": [

                ]
            }
        ]
    };


    ngOnInit() {
        this.updateChart();
    }

    changeChart(value) {
        if (value === 'line') {
            this.displayLineChart = true;
            this.displayBarChart = false;
        } else {
            this.displayLineChart = false;
            this.displayBarChart = true;
        }
    }

    onSubmitValue(x, y) {
        this.source.data[0].Details.push({ x: x, y: parseInt(y, 10) });
        this.table.push({ x: x, y: parseInt(y, 10) })
        this.updateChart();
    }


    updateChart() {
        this.data = new StandardBuilder(this.source, 'blah', 1);
    }
}