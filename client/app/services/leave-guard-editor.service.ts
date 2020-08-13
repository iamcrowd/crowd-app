import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditorComponent } from '../editor/editor.component';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaveGuardWarningComponent } from '../shared/leave-guard-warning/leave-guard-warning.component';

declare var $

@Injectable()
export class LeaveGuardEditor implements CanDeactivate<EditorComponent> {

  constructor(
    private modalService: NgbModal
  ) { }

  canDeactivate(editor: EditorComponent) {
    if (editor.hasChanges()) {
      const subject = new Subject<boolean>();

      const modal = this.modalService.open(LeaveGuardWarningComponent);
      modal.componentInstance.subject = subject;

      return subject.asObservable();
      // return window.confirm('Do you want to leave the website?\nChanges may not be saved.');
    }
    return true;
  }

}
