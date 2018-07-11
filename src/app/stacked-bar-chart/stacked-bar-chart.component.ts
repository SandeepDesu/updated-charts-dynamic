import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';
import { DisplayComponent } from '../dynamic-display/IDisplayComponent';
import { GroupedBuilder } from '../DataBuilders';

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent extends DisplayComponent<GroupedBuilder> implements OnInit {
  private margin: Margin;
  private width: number;
  private height: number;

  private svg: any;     // TODO replace all `any` by the right type
  private x: any;
  private y: any;
  private z: any;
  private g: any;

  constructor() {
    super();
  }

  protected postLoad(): void {
      this.initMargins();
      this.initSvg();
      this.drawChart();
  }

  private initMargins() {
    this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
  }

  private initSvg() {
    this.svg = d3.select('#stackedChart>svg');
    this.width = this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    this.x = d3Scale.scaleBand()
      .rangeRound([0, this.width])
      .paddingInner(0.05)
      .align(0.1);
    this.y = d3Scale.scaleLinear()
      .rangeRound([this.height, 0]);
    this.z = d3Scale.scaleOrdinal(d3Scale.schemeCategory10);
  }
  
  
  private drawChart() {    
    this.data.sort((a: any, b: any) => b.total - a.total);
    const NOT_STACKED = ["total","x"];
    const zdomain = [];
    // get a unique set of zvals
    for (var indx in this.data) {
        const obj = this.data[indx];        
        // ignore the non-stacked variables
        for (var k of Object.getOwnPropertyNames(obj)) {
            if (NOT_STACKED.indexOf(k) < 0 && zdomain.indexOf(k) < 0) {
                zdomain.push(k);
            }
        }
    }    
    this.x.domain(this.data.map((d) => d.x));
    //this.y.domain([0, d3Array.max(this.data, (d) => d.total )] ).nice();
    this.y.domain([this.Source.YTotalMin,this.Source.YTotalMax ] ).nice();
    this.z.domain(zdomain);

    this.g.append('g')
      .selectAll('g')
      .data(d3Shape.stack().keys(zdomain)(this.data))
      .enter().append('g')
      .attr('fill', d => this.z(d.key))
      .selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('x', d => this.x(d.data.x))
      .attr('y', d => this.y(isNaN(d[1]) ? d[1] : d[1]))
      .attr('height', (d) => {
                if (isNaN(d[1])) {
                    // bad things happen here when the data has missing pieces and d[0] is negative
                    return 0; 
                }                
                return Math.abs(this.y(d[0]) - this.y(d[1]));                
            })
      .attr('width', this.x.bandwidth());

    this.g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.g.append('g')
      .attr('class', 'axis')
      .call(d3Axis.axisLeft(this.y).ticks(null, 's'))
      .append('text')
      .attr('x', 2)
      .attr('y', this.y(this.y.ticks().pop()) + 0.5)

      //.attr('dy', '0.32em')
      //.attr('fill', '#000')
      //.attr('font-weight', 'bold')
      //.attr('text-anchor', 'start')
      //.text('Population');

    let legend = this.g.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(zdomain.slice().reverse())
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
