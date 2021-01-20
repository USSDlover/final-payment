import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {ToastComponent} from '../components';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
  }

  open(message: string, duration: number): void {
    this.appendToastComponentToBody(ToastComponent, duration, message);
  }

  private appendToastComponentToBody(component: any, duration: number, message: string): void {
    console.log('Going to open component');
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory<ToastComponent>(component)
      .create(this.injector);

    componentRef.instance.message = message;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, duration);
  }
}
