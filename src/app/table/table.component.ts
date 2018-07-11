import { Component, Input, OnInit } from '@angular/core';
import { DisplayComponent } from '../dynamic-display/IDisplayComponent';
import { TableBuilder } from '../DataBuilders';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent extends DisplayComponent<TableBuilder> {
  headers: any;
  protected postLoad(): void {
    this.headers = this.Source.getHeader();
  }
}
