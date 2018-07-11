import { Input, OnInit, OnDestroy } from '@angular/core';
import { IbaseBuilder } from '../DataBuilders';
import { IchartSingleton } from '../chartSingleton';

/**
 * Base functionality for the display components
 * This is where you handle the specific of displaying the data which was formatted in the Source/builder
 */
export interface IDisplayComponent {

  /**
   * a builder class which handles the API return and builds out the correct data
   */
  Source: IbaseBuilder;

  /**
   * Data that has been returned from the API and formatted by the Source object
   */
  // data:IchartSingleton[];

  /**
   *  The display name of this instance of the component
   */
  getName(): string;

  /**
   * calling this will hide the component
   */
  Hide(): void;

  /**
   * calling this will show/unhide the component
   */
  Show(): void;

}

/**
 * Base implementation for custom components.  This class will handle the API source interaction and give 
 * the child class a fresh data object after init
 *
 * Do component specific tasks in the postLoad() function
 * 
 */
export abstract class DisplayComponent<T extends IbaseBuilder> implements IDisplayComponent, OnInit, OnDestroy {
  @Input() Source: T; // This must be an input because the HTML loads with inputs before constructors
  data: any;
  protected Hidden: boolean = true;

  constructor() { }

  ngOnInit() {
    this.loadData();
  }
  ngOnDestroy() {
    this.Source.cleanup();
  }

  /**
   * This funciton is called from ngOnInit.  it will call the API via Source.getData, set the data,
   * then call postLoad() - implement custom handling in the postLoad() function
   *
   */
  protected loadData(): void {
    this.Source.getData().then(() => {
      this.data = this.Source.formattedData;
      this.postLoad();
    });
  }

  /**
   * implement this to handle specific data loading in the component
   */
  protected abstract postLoad(): void;


  Hide(): void {
    this.Hidden = true;
  }
  Show(): void {
    this.Hidden = false;
  }

  getName(): string {
    return this.Source.getName();
  }

}
