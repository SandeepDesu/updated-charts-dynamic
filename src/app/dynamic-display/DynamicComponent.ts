import { Type, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { IbaseBuilder } from '../DataBuilders';
import { IDisplayComponent } from './IDisplayComponent';

/**
 * Wrapper for loading a component at runtime
 * give it a type and the builder, then call CreateComponent with your target element
 * 
 */
export class DynamicComponent implements IDisplayComponent {

  protected componentType: Type<IDisplayComponent>;
  Source: IbaseBuilder;
  component: IDisplayComponent;
  //data:IchartSingleton[];

  constructor(comptype: Type<IDisplayComponent>, source: IbaseBuilder, private componentFactoryResolver: ComponentFactoryResolver) {
    // this constructor looks goofy but the type has to come in because it doesn't exist until runtime...
    this.componentType = comptype;
    this.Source = source;
  }

  getName(): string {
    return this.Source.getName();
  }
  Hide(): void {
    this.component.Hide();
  }
  Show(): void {
    this.component.Show();
  }

  /**
   * Dynamically instantiates the component, gives it the builder object, then puts it in the DOM at your viewref
   */
  CreateComponent(viewref: ViewContainerRef): ComponentRef<IDisplayComponent> {
    // get a resolver to instantiate the component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
    // The viewref will create the component and append it to the DOM
    const componentRef = viewref.createComponent(componentFactory);

    // finish up by setting our local variable and return the completed component
    this.component = (<IDisplayComponent>componentRef.instance);
    this.component.Source = this.Source;

    return componentRef;

  }
}
