import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
//import { CapitalizePipe } from '@core/pipes/capitalize-pipe';
//import { translate, TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';


@Component({
  selector: 'head-table',
  templateUrl: './head-table.component.html',
  styleUrls: ['./head-table.component.scss']
})
export class HeadTableComponent implements OnInit, OnDestroy {

  @Input('showFilter')
  public showFilter: boolean = true;

  @Input('tooltip')
  public tooltip: string;

  @Output('onFilter')
  public onFilter: EventEmitter<any> = new EventEmitter();

  @Input('formFilter')
  public formFilter: FormGroup;

  @Input('searchButtonTitle')
  public searchButtonTitle: string;

  @Input('headTitle')
  public headTitle: string;

  @Output()
  public onReset: EventEmitter<void> = new EventEmitter<void>();

  private translationSubscription: Subscription = new Subscription();

  public get hasFilter(): boolean {
    if (!this.formFilter) {
      return false;
    }
    return this.formFilter.touched;
  }

  private anyFilter: Boolean;

  constructor(
   // private translocoService: TranslocoService
  ) { }

  ngOnInit() {
   // this.loadTranslations();
  }

  ngOnDestroy(): void {
    this.translationSubscription.unsubscribe();
  }

  get showFilterButtons(): boolean {
    return this.onFilter.observers.length > 0;
  }

  applyFilter() {
    this.onFilter.emit();
    this.anyFilter = true;
  }

  resetFilter() {
    !!this.formFilter && this.formFilter.reset();
    this.anyFilter = false;
    setTimeout(() => {
      this.applyFilter();
    }, 0);
    this.onReset.emit();
  }

/*   private loadTranslations() {
    !!this.translationSubscription && this.translationSubscription.unsubscribe();
    this.translationSubscription = this.translocoService.selectTranslation()
      .subscribe(_ => {
        if (!this.headTitle) {
          this.headTitle = CapitalizePipe.capitalize(translate('filter.title')) || 'Filtrar';
        }
      });
  } */
}
