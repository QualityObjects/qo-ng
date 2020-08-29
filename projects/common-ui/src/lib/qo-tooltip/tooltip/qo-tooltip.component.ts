import { Component, OnInit, Input, Directive, HostListener, ComponentRef, ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { OverlayRef, Overlay, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';


@Directive({ selector: '[appTooltip]' })
export class AppTooltipDirective implements OnInit, OnDestroy {

  private overlayRef: OverlayRef | null;
  private _portal: ComponentPortal<QOTooltipComponent> | null;
  private _tooltipInstance: QOTooltipComponent | null;
  /**
   * Texto a mostrar en el tooltip
   */
  @Input('appTooltip') text = '';

  /**
   * Determina la orientación del tooltip respecto del elemento referenciado, por defecto 'top', 
   * El tooltip aparece encima del  elemento
   */
  @Input('ttOrientation') orientation: 'bottom' | 'top' | 'left' | 'right' = 'top';

  @HostListener('mouseenter')
  show() {
    // Create tooltip portal
    if (!!this.text) {
      this.createIfNecessaryOverlayRef();
      this._portal = this._portal || new ComponentPortal(QOTooltipComponent, this.viewContainerRef);

      // Attach tooltip portal to overlay
      this.overlayRef.detach();
      const tooltipRef: ComponentRef<QOTooltipComponent> = this.overlayRef.attach(this._portal);
      this._tooltipInstance = tooltipRef.instance;
      // Pass content to tooltip component instance
      this._tooltipInstance.text = this.text;
      this._tooltipInstance.orientation = this.orientation;
      this._tooltipInstance.visible = true;
    }
  }

  @HostListener('mouseleave')
  hide() {
    this.overlayRef?.detach();
    if (!!this._tooltipInstance) {
      this._tooltipInstance.visible = false;
    }
  }

  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef<HTMLElement>,
    private overlay: Overlay) {
  }

  ngOnDestroy(): void {
    this.hide();
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  ngOnInit(): void {

  }

  private createIfNecessaryOverlayRef(): OverlayRef {
    if (!!this.overlayRef) {
      return this.overlayRef;
    }
    let position: ConnectedPosition = {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
    }
    if (this.orientation !== 'top') {
      if (this.orientation === 'bottom') {
        position.originY = 'bottom';
        position.overlayY = 'top';
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

    return this.overlayRef;
  }
}

@Component({
  selector: 'qo-tooltip',
  templateUrl: './qo-tooltip.component.html',
  styleUrls: ['./qo-tooltip.component.scss']
})
export class QOTooltipComponent {
  @Input() text: string = '';
  public orientation = 'top';
  public showShadow: boolean = false;
  public showArrow: boolean = true;

  public visible: boolean = false;
}
