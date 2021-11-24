import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { Router, NavigationEnd } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CookieService } from 'ngx-cookie-service';
import { DarkmodeService } from './services/darkmode.service';
import * as CodeMirror from 'codemirror';

declare var iziToast;
declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {

  constructor(
    public router: Router,
    public auth: AuthService,
    public darkmodeService: DarkmodeService,
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    iziToast.settings({
      position: 'topCenter',
      maxWidth: '30%',
      timeout: false
    });

    this.darkmodeService.initDarkMode();

    CodeMirror.defineInitHook(function (editor) {
      var charWidth = editor.defaultCharWidth(), basePadding = 4;
      editor.on("renderLine", function (cm, line, elt) {
        var off = CodeMirror.countColumn(line.text, null, cm.getOption("tabSize")) * charWidth;
        elt.style.textIndent = "-" + off + "px";
        elt.style.paddingLeft = (basePadding + off) + "px";
      });
      editor.refresh();
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  openLogin() {
    this.modalService.open(LoginComponent);
  }

  openRegister() {
    this.modalService.open(RegisterComponent);
  }

  logout() {
    var self = this;
    iziToast.question({
      timeout: false,
      close: false,
      overlay: true,
      displayMode: 'replace',
      zindex: 1051,
      theme: 'dark',
      icon: 'fa fa-user',
      color: 'grey',
      message: 'Are you sure want to logout?',
      position: 'topCenter',
      buttons: [
        ['<button>Cancel</button>', function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }, true],
        ['<button><b>Proceed</b></button>', function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          self.auth.logout();
        }]
      ]
    });
  }

  isActive(url: string): boolean {
    return this.router.isActive(url, false);
  }
}
