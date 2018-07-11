import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { DisplayComponent } from '../dynamic-display/IDisplayComponent';
import { StandardBuilder } from '../DataBuilders';
import * as _ from 'lodash';
@Component({
  selector: 'app-multi-line-chart',
  templateUrl: './multi-line-chart.component.html',
  styleUrls: ['./multi-line-chart.component.css']
})
export class MultiLineChartComponent extends DisplayComponent<StandardBuilder> implements OnInit {

  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private x: any;
  private y: any;
  private z: any;
  private g: any;
  private svg: any;
  private line: any;
  private options = [];
  private sample = 0;

  constructor() {
    super();
  }


  protected postLoad():void {
    // This should be moved to the builder class
    let newdata = [];
    
    this.data.forEach((res) => {
      if (this.options.indexOf(res.x) === -1) {
        this.options.push(res.x);
      }
      if (this.data.length > 0) {
        const index = _.findIndex(this.data, { id: res.c });
        if (index === -1) {
          let obj = {};
          obj['id'] = res.c;
          obj['value'] = [{ x: res.x, y: res.y }];
          newdata.push(obj);
        } else {
          let obj = newdata[index];
          obj.value.push({ x: res.x, y: res.y });
          newdata[index] = obj;
        }
      } else {
        let obj = {};
        obj['id'] = res.c;
        obj['value'] = [{ x: res.x, y: res.y }];
        newdata.push(obj);
      }
    });
    if (newdata.length) {
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawPath();
    }

  }

  private initSvg() {
    this.svg = d3.select('#multiLineChart>svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
  private initAxis() {
    this.x = d3Scale.scaleLinear().range([0, this.width]);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.z = d3Scale.scaleOrdinal(d3Scale.schemeCategory10);
    d3.selectAll('#multiLineChart>svg').attr('width', '100%');
    this.line = d3Shape.line()
      .curve(d3Shape.curveBasis)
      .x((d: any) => this.x(d.x))
      .y((d: any) => this.y(d.y));
    this.x.domain(d3Array.extent(this.options, (d) => { return d }));
    this.y.domain([
      d3Array.min(this.data, (c) => {
        return d3Array.min(c.value, (d) => { return d.y; });
      }),
      d3Array.max(this.data, (c) => { return d3Array.max(c.y, (d) => { return d.y; }); })
    ]);
    this.z.domain(this.data.map((c) => { return c.c; }));

  }

  private drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('fill', '#000');
  }

  private drawPath() {
    let city = this.g.selectAll('.city')
      .data(this.data)
      .enter().append('g')
      .attr('class', 'city');

    city.append('path')
      .attr('class', 'line')
      .attr('d', (d) => this.line(d.value))
      .style('stroke', (d) => this.z(d.id));

    city.append('text')
      .datum(function (d) { return { id: d.id, value: d.value[d.value.length - 1] }; })
      .attr('transform', (d) => 'translate(' + this.x(d.value.label) + ',' + this.y(d.value.value) + ')')
      .attr('x', 3)
      .attr('dy', '0.35em')
      .style('font', '10px sans-serif')
      .text(function (d) { return d.id; });
  }
}
