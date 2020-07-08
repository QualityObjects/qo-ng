import { OnInit, Directive, HostListener, ComponentRef, ElementRef } from '@angular/core';
import { OverlayRef, Overlay, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { QOTooltipComponent } from './qo-tooltip.component';


@Directive({ selector: '[ttEllipsis]',
host: {
  '[style.white-space]': '"nowrap"',
  '[style.overflow]': '"hidden"',
  '[style.display]': '"block"',
  '[style.text-overflow]': '"ellipsis"',
} })
export class AppTooltipEllipsisDirective implements OnInit {

  private overlayRef: OverlayRef;

  
  @HostListener('mouseenter')
  show() { 
    const element = this.elementRef?.nativeElement;
    if(element.offsetWidth < element.scrollWidth){
      let text = element.innerHTML;
    // Create tooltip portal
      const tooltipPortal = new ComponentPortal(QOTooltipComponent);

      // Attach tooltip portal to overlay
      const tooltipRef: ComponentRef<QOTooltipComponent> = this.overlayRef.attach(tooltipPortal);
        
      // Pass content to tooltip component instance
      tooltipRef.instance.text = text;   
      tooltipRef.instance.showArrow = false;
    }
  }

  @HostListener('mouseout')
  hide() { 
    this.overlayRef.detach();
  }
  
  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private overlay: Overlay) {    
  }

  ngOnInit() : void {

    let position: ConnectedPosition = {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
    }
    
    const positionStrategy = this.overlayPositionBuilder
      // Create position attached to the elementRef
      .flexibleConnectedTo(this.elementRef)
      // Describe how to connect overlay to the elementRef
      // Means, attach overlay's center bottom point to the         
      // top center point of the elementRef.
      .withPositions([position]);
      this.overlayRef = this.overlay.create({ positionStrategy });
  }

}