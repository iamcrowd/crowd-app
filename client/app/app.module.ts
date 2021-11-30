// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer-scrolling';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ClipboardModule } from 'ngx-clipboard';
import { BrowserModule } from '@angular/platform-browser';
import { TippyModule, tooltipVariation, popperVariation } from '@ngneat/helipopper';
import { ngfModule, ngf } from "angular-file"
// Services
import { UserService } from './services/user.service';
import { DiagramService } from './services/diagram.service';
import { NamespaceService } from './services/namespace.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { LeaveGuardEditor } from './services/leave-guard-editor.service';
import { DarkmodeService } from './services/darkmode.service';
import { CookieService } from 'ngx-cookie-service';

import { HttpInterceptorService } from './services/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Components
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditorComponent } from './editor/editor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiComponent } from './api/api.component';
import { VarDirective } from './directives/var.directive';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    EditorComponent,
    ApiComponent,
    VarDirective
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (): string => localStorage.getItem('token'),
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    }),
    NgbModule,
    NgxJsonViewerModule,
    CodemirrorModule,
    ClipboardModule,
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: {
          theme: 'translucent',
          arrow: true,
          maxWidth: 200,
          animation: 'scale',
          trigger: 'mouseenter',
          offset: [0, 5]
        },
        popper: {
          theme: 'translucent',
          arrow: true,
          maxWidth: 200,
          animation: 'scale',
          trigger: 'click',
          offset: [0, 5]
        },
      }
    }),
    ngfModule
  ],
  exports: [
    ClipboardModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    LeaveGuardEditor,
    UserService,
    DiagramService,
    NamespaceService,
    CookieService,
    DarkmodeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
