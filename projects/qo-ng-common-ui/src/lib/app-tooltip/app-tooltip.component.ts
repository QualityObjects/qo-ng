import { Component, OnInit, Input, Directive, HostListener, ComponentRef, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { OverlayRef, Overlay, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';


@Directive({ selector: '[appTooltip]' })
export class AppTooltipDirective implements OnInit, OnDestroy {

  private overlayRef: OverlayRef;

  /**
   * Texto a mostrar en el tooltip
   */
  @Input('appTooltip') text = '';
  @Input('ttDisabled') ttDisable = true;

  /**
   * Determina la orientación del tooltip respecto del elemento referenciado, por defecto 'top', 
   * El tooltip aparece encima del  elemento
   */
  @Input('ttOrientation') orientation : 'bottom' | 'top' | 'left' | 'right' = 'top';

  @HostListener('mouseenter')
  show() { 
  // Create tooltip portal
    if (!!this.text && !this.ttDisable) {
      const tooltipPortal = new ComponentPortal(AppTooltipComponent);

      // Attach tooltip portal to overlay
      const tooltipRef: ComponentRef<AppTooltipComponent> = this.overlayRef.attach(tooltipPortal);
        
      // Pass content to tooltip component instance
      tooltipRef.instance.text = this.text;   
      tooltipRef.instance.orientation = this.orientation;    
    }
  }

  @HostListener('mouseleave')
  hide() { 
    this.overlayRef.detach();
  }
  
  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private overlay: Overlay) {    
  }

  ngOnDestroy() : void {
    this.hide();
  }

  ngOnInit() : void {
    let position: ConnectedPosition = {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
    }
    
    if (this.orientation !== 'top') {
      if (this.orientation === 'bottom') {
        position.originY = 'top';
        position.overlayY = 'bottom';
      } else {
        position.originY = 'center';
        position.overlayY = 'center';
          if (this.orientation === 'right') {
          position.originX = 'end';
          position.overlayX = 'start';
        } else if (this.orientation === 'left') {
          position.originX = 'start';
          position.overlayX = 'end';
        } 
      }
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

@Component({
  selector: 'app-tooltip',
  templateUrl: './app-tooltip.component.html',
  styleUrls: ['./app-tooltip.component.scss']
})
export class AppTooltipComponent {
  @Input() text : string = '';
  public orientation = 'top';
  public showShadow : boolean = false;
  public showArrow : boolean = true;
  @Input() ttDisable = true;
}
