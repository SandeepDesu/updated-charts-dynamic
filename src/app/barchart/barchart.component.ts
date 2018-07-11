import { Component, OnInit, OnChanges } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { DisplayComponent } from '../dynamic-display/IDisplayComponent';
import { StandardBuilder } from '../DataBuilders';
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarChartComponent extends DisplayComponent<StandardBuilder> implements OnInit, OnChanges {

  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor() {
    super();
  }

  ngOnChanges(changes) {
    if (this.data && changes && changes.Source && changes.Source.currentValue && changes.Source.currentValue.apireturn && changes.Source.currentValue.apireturn.data && changes.Source.currentValue.apireturn.data.length) {
      this.data = changes.Source.currentValue.apireturn.data[0].Details;
      d3.selectAll(".bar").remove();
      d3.selectAll(".axis").remove();
      this.initAxis();
      this.drawAxis();
      this.drawBars();
    }
  }

  protected postLoad(): void {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  private initSvg() {
    this.svg = d3.select('#barchart > svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    d3.selectAll('#barchart>svg').attr('width', '100%');
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    const xdom = (this.data.map((d) => d.x));
    xdom.sort();
    this.x.domain(xdom);
    const ydom = [d3Array.min(this.data, (d) => d.y) * 0.8, d3Array.max(this.data, (d) => d.y)];
    this.y.domain(ydom);
  }

  private drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
    //.append('text')
    //.attr('class', 'axis-title')
    //.attr('transform', 'rotate(-90)')
    //.attr('y', 6)
    //.attr('dy', '0.71em')
    //.attr('text-anchor', 'end');
  }

  private drawBars() {
    this.g.selectAll('.bar')
      .remove()
      .exit()
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.x(d.x))
      .attr('y', (d) => this.y(d.y))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.y));
  }
}
