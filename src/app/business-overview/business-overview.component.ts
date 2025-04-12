import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-business-overview',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './business-overview.component.html',
  styleUrl: './business-overview.component.css'
})
export class BusinessOverviewComponent {

  router = inject(Router)

  onLogoff(){
    localStorage.removeItem("access_token");

    this.router.navigateByUrl("landing-page")
  }
}
