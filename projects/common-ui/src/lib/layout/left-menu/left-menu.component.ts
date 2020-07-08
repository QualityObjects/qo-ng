import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';


export class MenuAction {
  icon?: string;
  label: string;
  link?: string[];
  show: boolean = true;
  items?: MenuAction[];

}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', 'overflow-y': 'hidden', display: 'none', opacity: 0})),
      state('expanded', style({height: 'auto', 'overflow-y': 'auto', display: 'block', opacity: 1})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
    trigger('iconExpansion', [
      state('collapsed', style({transform: 'rotate(180deg)'})),
      state('expanded', style({transform: 'rotate(0deg)'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ] 
})
export class LeftMenuComponent implements OnInit, OnDestroy {
  public currentMenu : string = undefined;  // para saber qué página se está mostrando
  public collapsedMenus : any = {}; //menú seleccionado
  @Input('initialAction') public initialAction : number;
  @Input('actions') public actions : MenuAction[];
  @Input('sidemenu') public sidemenu : MatSidenav;

  constructor(private location: Location, 
              private router: Router) {
  }
  private subscriptions : Subscription = new Subscription();
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
  
  ngOnInit() {
    this.subscriptions.add(this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.initSelectedMenuActionFromUrl();
      }
    }));
    this.initSelectedMenuActionFromUrl();
    if (this.currentMenu == null && this.initialAction != null) {
      this.currentMenu = this.actions[this.initialAction].link[0];
    }

  }
  
  private findActionByUrl(path: string, actions: MenuAction[]) : MenuAction {
    for(let action of actions) {
      if (action.link && action.link[0] === path) {
        return action;
      }
      if (action.items && action.items.length > 0) {
        let act = this.findActionByUrl(path, action.items);
        if (!!act) return act;
      }
    }
    return null;
  }

  private initSelectedMenuActionFromUrl() {
    let current = location.pathname;
    let action = this.findActionByUrl(current, this.actions);
    if (!!action) {
      this.currentMenu = action.link[0];
    }
  }
    
  closeIfMobile() : void {
    if (this.isMobile()) {
      this.sidemenu.close();
    }
  }

  isMobile() : boolean {
    return window.matchMedia(`(max-width: 800px)`).matches;
  }

  setMenu(menuLink:string[]) {
    this.currentMenu = menuLink[0];
    this.closeIfMobile();
  }
 
  toggleMenu(menuIndex) {
    this.collapsedMenus[menuIndex] = !this.collapsedMenus[menuIndex];
  }

}
