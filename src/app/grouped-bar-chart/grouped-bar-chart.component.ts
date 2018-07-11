import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Collection from 'd3-collection';
import { DisplayComponent } from '../dynamic-display/IDisplayComponent';
import { GroupedBuilder } from '../DataBuilders';
import * as _ from 'lodash';
@Component({
  selector: 'app-double-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.css']
})
export class GroupedBarChartComponent extends DisplayComponent<GroupedBuilder> {
  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };

  private x0: any;
  private x1: any;
  private y: any;
  private z: any;
  private svg: any;
  private g: any;
  private groups;
  
  constructor() {
    super();
  }

  protected postLoad(): void {
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawBars();
  }


  private initSvg() {
    this.svg = d3.select('#groupedChart>svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  
  private initAxis() {
    d3.selectAll('#groupedChart>svg').attr('width', '100%');
    const NOT_STACKED = ["total","x"];
    this.groups = [];
    // get a unique set of zvals
    for (var indx in this.data) {
        const obj = this.data[indx];
        // ignore the first 2 - total and xval
        for (var k of Object.getOwnPropertyNames(obj)) {
            if (NOT_STACKED.indexOf(k) < 0 && this.groups.indexOf(k) < 0) {
                this.groups.push(k);
            }
        }
    }    
    this.x0 = d3Scale.scaleBand().range([0, this.width]);
    this.x1 = d3Scale.scaleBand().padding(0.10);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.z = d3Scale.scaleOrdinal(d3Scale.schemeCategory10);
    this.x0.domain(this.data.map((d) => d.x));
    this.x1.domain(this.groups).rangeRound([0, this.x0.bandwidth()]);
    //this.y.domain([0, d3Array.max(this.data, (d) => d.total )] ).nice();
    this.y.domain([this.Source.YMin,this.Source.YMax ] ).nice();
  }

  private drawAxis() {

    this.g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x0));

    this.g.append('g')
      .attr('class', 'y axis')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', this.y(this.y.ticks().pop()) + 0.5)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Satisfaction %');
  }

  private drawBars() {
    this.g.selectAll('.bar')
      .data(this.data)
      .enter().append('g')
      .attr('class', 'rect')
      .attr('transform', (d) => 'translate(' + this.x0(d.x) + ',0)')
      .selectAll('rect')
      .data((d) => this.groups.map((key) => ({ key: key, value: d[key] ? d[key] : 0 })) )
      .enter().append('rect')
      .attr('width', this.x1.bandwidth())
      .attr('x', (d) => this.x1(d.key))
      .attr('y', (d) => this.y(d.value))
      .attr('height', (d) => this.height - this.y(d.value))
      .attr('fill', (d) => this.z(d.key));

    let legend = this.g.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(this.groups.slice().reverse())
      .enter().append('g')
      .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')');

    legend.append('rect')
      .attr('x', this.width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', this.z);

    legend.append('text')
      .attr('x', this.width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(d => d);
      
  }
}
