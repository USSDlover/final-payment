import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cs-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
