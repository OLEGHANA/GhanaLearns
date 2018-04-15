import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { TranslateService } from 'ng2-translate/ng2-translate';
import PerfectScrollbar from 'perfect-scrollbar';
import { PerfectScrollbarConfigInterface,
PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
public name:string;
 public image:string;
 diveContainer_data = [
    {id:1,image:'cards/notes.svg',name:'Learner Register', addLink:'/maps/google',viewLink:'/gallery'},
    {id:2,image:'cards/clipboards.svg',name:'Assign Task', addLink:'/maps/google',viewLink:'/gallery'},
    {id:3,image:'cards/notepad.svg',name:'Lesson Plan', addLink:'/maps/google',viewLink:'/gallery'},
    {id:4,image:'cards/bookshelf.svg',name:'Resources', addLink:'/maps/google',viewLink:'/gallery'},
    {id:5,image:'cards/studying.svg',name:'Professional Studies', addLink:'/maps/google',viewLink:'/gallery'},
    {id:6,image:'cards/feedback.svg',name:'Feedback', addLink:'/maps/google',viewLink:'/gallery'},
    {id:7,image:'cards/school.svg',name:'Facility Management', addLink:'/maps/google',viewLink:'/gallery'},
    {id:8,image:'cards/settings.svg',name:'System Management', addLink:'/maps/google',viewLink:'/gallery'}
  ];
  
  /**
   * Added by Laxman for sample
   */
  sampleLinks = {1: '/maps/google', 2: '/gallery', 3: '/maps/google', 4: '/gallery', 5: '/maps/google', 6: '/gallery', 7: '/maps/google', 8: '/gallery'};

  private _router: Subscription;

  today: number = Date.now();
  url: string;
  showSettings = false;
  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;
  sidebarBg: boolean = true;
  currentLang = 'en';
  layoutDir = 'ltr';
  
  selectedSidebarImage : any = 'bg-1';
  selectedSidebarColor : any = 'sidebar-default';
  selectedHeaderColor  : any = 'header-default';
  collapsedClass       : any = 'side-panel-opened';

  @ViewChild('sidemenu') sidemenu;
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private router: Router, public menuItems: MenuItems, public translate: TranslateService ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar-container ');
    // const elemSidebar = <HTMLElement>document.querySelector('.app-inner > .sidebar-panel');
    // const elemContent = <HTMLElement>document.querySelector('.app-inner > .mat-sidenav-content');

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar) {
      // Ps.initialize(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
      // Ps.initialize(elemContent, { wheelSpeed: 2, suppressScrollX: true });
      const ps = new PerfectScrollbar(elemSidebar, {
                              wheelSpeed: 2,
                              suppressScrollX: true
                            });
    }

    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.url = event.url;
      if (this.isOver()) {
        this.sidemenu.close();
      }

      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar) {
        // Ps.update(elemContent);
      }
    });
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    // const elemSidebar = <HTMLElement>document.querySelector('.app-inner > .sidebar-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar-container ');
    setTimeout(() => {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar) {
        // Ps.update(elemSidebar);
        const ps = new PerfectScrollbar(elemSidebar, {
                              wheelSpeed: 2,
                              suppressScrollX: true
                            });
      }
    }, 350);
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  isOver(): boolean {
    if (this.url === '/apps/messages' || this.url === '/apps/calendar' || this.url === '/apps/media' || this.url === '/maps/leaflet') {
      return true;
    } else {
      return window.matchMedia(`(max-width: 960px)`).matches;
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  menuMouseOver(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'side';
    }
  }
  
  menuToggleFunc()
  {
    this.sidemenu.toggle();
    
    if(this.collapsedClass == 'side-panel-opened')
    {
        this.collapsedClass = 'side-panel-closed';
    }
    else
    {
        this.collapsedClass= 'side-panel-opened';
    }
  }
  
  onSelectSidebarImage(selectedClass, event)
  {
    this.selectedSidebarImage = selectedClass;
  }
  
  onSelectedSidebarColor(selectedClass)
  {
    this.selectedSidebarColor = selectedClass;
  }
  
  onSelectedHeaderColor(selectedClass)
  {
    this.selectedHeaderColor = selectedClass;
  }

  isBgActive(value)
  {
    if(value == this.selectedSidebarImage)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  isSidebarActive(value)
  {
    if(value == this.selectedSidebarColor)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  isHeaderActive(value)
  {
    if(value == this.selectedHeaderColor)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  addMenuItem(): void {
    this.menuItems.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'trending_flat',
      children: [
        {state: 'menu', name: 'MENU'},
        {state: 'timelmenuine', name: 'MENU'}
      ]
    });
  }
}
