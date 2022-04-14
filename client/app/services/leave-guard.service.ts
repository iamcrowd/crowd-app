import { Component, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaveGuardWarningComponent } from '../shared/leave-guard-warning/leave-guard-warning.component';

declare var $

@Injectable()
export class LeaveGuard implements CanDeactivate<Component> {

  constructor(
    private modalService: NgbModal
  ) { }

  canDeactivate(component: Component) {
    if (component["hasChanges"] == null || component["hasChanges"]()) {
      const subject = new Subject<boolean>();

      const modal = this.modalService.open(LeaveGuardWarningComponent);
      modal.componentInstance.subject = subject;

      return subject.asObservable();
      // return window.confirm('Do you want to leave the website?\nChanges may not be saved.');
    }
    return true;
  }

}
