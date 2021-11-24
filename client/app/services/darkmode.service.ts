import { Injectable } from '@angular/core';

declare var $;

@Injectable()
export class DarkmodeService {

  constructor() { }

  initDarkMode() {
    // var darkmode = this.cookieService.get('crowd-darkmode') == 'true';
    var darkmode = localStorage.getItem('crowd-darkmode') == 'true';
    if (!darkmode) $('body').removeClass('bootstrap-dark');
    else $('body').addClass('bootstrap-dark');
  }

  toggleDarkMode() {
    $('body').toggleClass('bootstrap-dark');
    // this.cookieService.set('crowd-darkmode', $('body').hasClass('bootstrap-dark'), 365);
    localStorage.setItem('crowd-darkmode', $('body').hasClass('bootstrap-dark'));
  }

  isDarkMode() {
    return $('body').hasClass('bootstrap-dark');
  }
}
