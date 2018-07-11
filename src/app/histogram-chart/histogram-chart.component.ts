import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import { max } from 'd3-array';
import { DisplayComponent } from '../dynamic-display/IDisplayComponent';
import { StandardBuilder } from '../DataBuilders';

@Component({
  selector: 'app-histogram-chart',
  templateUrl: './histogram-chart.component.html',
  styleUrls: ['./histogram-chart.component.css']
})

export class HistogramComponent extends DisplayComponent<StandardBuilder> implements OnInit {
  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 80 };
  private svg: any;
  private g: any;
  private binsize = 2;
  private minbin = 0;
  private maxbin = 100;
  private numbins = (this.maxbin - this.minbin) / this.binsize;
  private xmin = this.minbin - 1;
  private xmax = this.maxbin + 1;
  private x: any;
  private y: any;
  private x2: any;
  private binmargin = .2;
  private histdata = new Array(this.numbins);
  private xAxis: any;
  private yAxis: any;
  constructor() {
    super();
  }

  protected postLoad(): void {
    this.initSvg();
    this.initAxis();
    this.drawBar();
  }

  initSvg() {
    this.svg = d3.select('#histogram-chart>svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis() {
    this.x = d3Scale.scaleLinear()
      .domain([0, (this.xmax - this.xmin)])
      .range([0, this.width]);
    this.x2 = d3Scale.scaleLinear()
      .domain([this.xmin, this.xmax])
      .range([0, this.width]);

    this.y = d3Scale.scaleLinear()
      .domain([0, max(this.data, function (d) {
        return d.y;
      })])
      .range([this.height, 0]);
  }
  drawBar() {
    let bar = this.svg.selectAll('.bar')
      .data(this.data)
      .enter().append('g')
      .attr('class', 'bar')
      .attr('transform', (d, i) => {
        return 'translate(' +
          this.x2(i * this.binsize + this.minbin) + ',' + this.y(d.y) + ')';
      });
    bar.append('rect')
      .attr('x', this.x(this.binmargin))
      .attr('width', this.x(this.binsize - 2 * this.binmargin))
      .attr('height', (d) => { return d.y > 0 ? this.height - this.y(d.y) : 0; })
      .attr('style', (d) => 'fill:' + d.c);
    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x2));
    this.svg.append('text')
      .attr('class', 'xlabel')
      .attr('text-anchor', 'middle')
      .attr('x', this.width / 2)
      .attr('y', this.height + this.margin.bottom);

    this.svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(0,0)')
      .call(d3Axis.axisLeft(this.y));

  }


}
