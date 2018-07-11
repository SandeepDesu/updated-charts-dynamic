import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Formate from 'd3-format';
import * as d3Scale from 'd3-scale';
import * as d3Sankey from 'd3-sankey';
import {DisplayComponent} from "../dynamic-display/IDisplayComponent";
import {SankeyBuilder} from "../DataBuilders";


@Component({
    selector: 'app-sankey',
    templateUrl: './sankey.component.html',
    styleUrls: ['./sankey.component.css']
})

export class SankeyComponent extends DisplayComponent<SankeyBuilder> implements OnInit {

  private width: number;
  private height: number;
  private margin = { top: 30, right: 20, bottom: 30, left: 40 };
  private svg: any;
  private g: any;
  private sankey: any;
  private format: any;
  private color: any;
  private link: any;
  private node: any;

  protected postLoad():void {
      this.initSvg();
      this.createGraph();
      this.useLink();
      this.useNode();
  }

  private initSvg() {
    this.svg = d3.select('#sanky-chart > svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    let formatNumber = d3Formate.format(',.0f');
    this.format = function (d) { return formatNumber(d) + ' Root Causes'; };
    this.color = d3Scale.scaleOrdinal(d3Scale.schemeCategory10);
  }

  private createGraph() {
    this.sankey = d3Sankey.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [this.width - 1, this.height - 6]]);
    this.link = this.svg.append('g')
      .attr('class', 'links')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('stroke-opacity', 0.2)
      .selectAll('path');
    this.node = this.svg.append('g')
      .attr('class', 'nodes')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .selectAll('g');
    this.sankey(this.data);
  }

  private useLink() {
    this.link = this.link
      .data(this.data.links)
      .enter().append('path')
      .attr('d', d3Sankey.sankeyLinkHorizontal())
      .attr('stroke-width', function (d) { return Math.max(1, d.width); });
    this.link.append('title')
      .text((d) => d.source.name + ' → ' + d.target.name + '\n' + this.format(d.value));
  }

  private useNode() {
    this.node = this.node
      .data(this.data.nodes)
      .enter().append('g');
    this.node.append('rect')
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('fill', (d) => this.color(d.name.replace(/ .*/, '')))
      .attr('stroke', '#040404');

    this.node.append('text')
      .attr('x', function (d) { return d.x0 - 6; })
      .attr('y', function (d) { return (d.y1 + d.y0) / 2; })
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .text(function (d) { return d.name; })
      .filter(function (d) { return d.x0 < 200; })
      .attr('x', function (d) { return d.x1 + 6; })
      .attr('text-anchor', 'start');

    this.node.append('title')
      .text((d) => { return d.name + '\n' + this.format(d.value); });
  }

}
