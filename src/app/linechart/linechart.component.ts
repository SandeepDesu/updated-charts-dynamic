import { Component, OnInit, OnChanges } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { DisplayComponent } from '../dynamic-display/IDisplayComponent';
import { StandardBuilder } from '../DataBuilders';
import * as _ from 'lodash';
@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})

export class LinechartComponent extends DisplayComponent<StandardBuilder> implements OnInit, OnChanges {
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private g: any;

  constructor() {
    super();
  }

  ngOnChanges(changes) {
    if (this.data && changes && changes.Source && changes.Source.currentValue && changes.Source.currentValue.apireturn && changes.Source.currentValue.apireturn.data && changes.Source.currentValue.apireturn.data.length) {
      this.data = changes.Source.currentValue.apireturn.data[0].Details;
      this.data = _.orderBy(this.data, ['x'], ['asc']);
      for (let i = 0; i < this.data.length; i++) {
        this.data[i]['xval'] = i + 1;
      }
      d3.selectAll(".line").remove();
      d3.selectAll(".axis").remove();
      this.initAxis();
      this.drawAxis();
      this.drawLine();
    }
  }

  protected postLoad(): void {
    this.data = _.orderBy(this.data, ['x'], ['asc']);
    for (let i = 0; i < this.data.length; i++) {
      this.data[i]['xval'] = i + 1;
    }
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
  }

  private initSvg() {
    this.svg = d3.select("#line-chart>svg").append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.width = 350 - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;
  }

  private initAxis() {
    d3.selectAll('#line-chart>svg').attr('width', '100%');
    this.x = d3Scale.scaleLinear().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.data, (d) => d.x));
    this.y.domain(d3Array.extent(this.data, (d) => d.y));
  }

  private drawAxis() {
    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x).ticks(this.data.length - 1).tickFormat((d) => Math.round(d)));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y).ticks(5))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');

  }

  private drawLine() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.x))
      .y((d: any) => this.y(d.y));

    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', this.line);
  }
}
