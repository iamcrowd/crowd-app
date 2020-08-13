import { Component, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input() message = { body: '', type: '', timeout: null };

  setMessage(body, type, time = 3000): void {
    // console.log('setMessage', this);
    this.message.body = body;
    this.message.type = type;
    this.stopShowing(time)
  }

  stopShowing(time = 3000): void {
    $('.alert').css('opacity', 0.9);
    this.message.timeout = setTimeout(() => this.message.body = '', time);
    // console.log('stopShowing', this);
  }

  stayShowing(): void {
    $('.alert').css('opacity', 1);
    clearTimeout(this.message.timeout);
    // console.log('stayShowing', this);
  }
}
