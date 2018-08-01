import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pb-status-delivery',
  templateUrl: './status-delivery.component.html',
  styleUrls: ['./status-delivery.component.scss']
})
export class StatusDeliveryComponent implements OnInit {
  @Input() status;
  @Input() paymentUrl;
  deliveryStatus;

  constructor() { }

  ngOnInit() {
    this.deliveryStatus = +this.status.upl_status > 5 ? 5 : +this.status.upl_status;
  }

}
