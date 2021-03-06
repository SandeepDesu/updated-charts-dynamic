import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { DisplayComponent } from '../dynamic-display/IDisplayComponent';
import { StandardBuilder } from '../DataBuilders';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent extends DisplayComponent<StandardBuilder> implements OnInit {

  private width: number;
  private height: number;
  private svg: any;     // TODO replace all `any` by the right type
  private radius: number;
  private arc: any;
  private pie: any;
  private color: any;
  
  constructor() {
    super();
  }


  protected postLoad():void {
      this.initSvg();
      this.drawChart();
    
  }

  private initSvg() {
    this.svg = d3.select('#donutChart>svg');
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.radius = Math.min(this.width, this.height) / 2;
    d3.selectAll('#donutChart>svg').attr('width', '100%');
    this.color = d3Scale.scaleOrdinal()
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(this.radius - 70);
    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.y);
    this.svg = d3.select('#donutChart>svg')
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private drawChart() {
    let g = this.svg.selectAll('.arc')
      .data(this.pie(this.data))
      .enter().append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', this.arc)
      .style('fill', d => this.color(d.data.c));
    g.append('text')
      .attr('transform', d => 'translate(' + this.arc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text(d => d.data.c);
  }
}
