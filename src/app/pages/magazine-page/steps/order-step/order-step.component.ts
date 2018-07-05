import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoverStateService } from '../cover-step/services/cover-state.service';

@Component({
  selector: 'pb-order-step',
  templateUrl: './order-step.component.html',
  styleUrls: ['./order-step.component.scss']
})
export class OrderStepComponent implements OnInit {

  printText = "I have seen and I approve the preview of my photo book. Print my photo book like the preview";
  acceptText = "I accept the Terms and Conditions of OnsFotobook";
  deliverText = "I want the photo book to be delivered at:";

  constructor(
    public coverStateService: CoverStateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  orderStep() {
    
  }

  prevStep() {
    this.router.navigate(['/magazine/create/step5']);
  }

}
