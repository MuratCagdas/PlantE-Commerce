import { HttpClient } from '@angular/common/http';
import { Directive, HostListener, Input } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  private url: string = 'http://localhost:3004/';
  constructor (
    private renderer: Renderer2,
    private element: ElementRef,
    private http: HttpClient,
    private alertify: AlertifyService
  ) {
    const icon = this.renderer.createElement('mat-icon');
    const text = this.renderer.createText('delete');
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer');
    this.renderer.addClass(icon, 'mat-icon');
    this.renderer.addClass(icon, 'material-icons');
    this.renderer.appendChild(icon, text);
    this.renderer.appendChild(this.element.nativeElement, icon);
  }
  @Input() id: any;
  @Input() controller: string;
  @Input() List: BehaviorSubject<any[]>;
  @HostListener("click")

  onclick() {
    const td: HTMLTableCellElement = this.element.nativeElement;
    //delete item in db
    this.http.delete(this.url + this.controller + '/' + this.id).subscribe(data => {
      this.alertify.message('Success Delete ', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
    });
    // Update List 
    this.List.value.forEach((item, index) => {
      if (item.id === this.id) {
        this.List.value.splice(index, 1);
      }
    });
    //  Alternative way,not update List. Only remove html element
    // this.renderer.removeChild(this.element.nativeElement, td.parentElement);
  }
}
