import { CommonModule } from '@angular/common';
import { Component  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthComponent } from "../auth/auth.component";

declare var bootstrap: any;

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, RouterLink, AuthComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})

export class LandingPageComponent {

  features = [
    {
      title: 'AI-Powered Insights',
      description: 'Get real-time analytics and reports to boost efficiency.',
      image: '../../../assets/ai_powered_dashboard_2.webp'
    },
    {
      title: 'Smart Inventory Management',
      description: 'Connect with your favorite business tools easily.',
      image: '../../../assets/inventory_management_2.jpg'
    },
    {
      title: 'Customer Relationship Building',
      description: 'Reduce manual tasks and increase productivity.',
      image: '../../../assets/customer_relation_building_2.jpg'
    },
    {
      title: 'Sales & Order Tracking',
      description: 'Keep track of all your sales and orders seamlessly.',
      image: '../../../assets/sales_tracking.png'
    },
    {
      title: 'Seamless Billing & Invoicing',
      description: 'Generate invoices and manage billing effortlessly.',
      image: '../../../assets/billing_image_2.avif'
    }
  ];




  // cityArray  =[
  //   {
  //     title:'skjns',
  //   },
  // ]

  

  growthStats = [
    { number: '1,000+', description: 'Retailers using our CRM daily' },
    { number: '30%', description: 'Increase in Sales' },
    { number: '95%', description: 'Customer Satisfaction' }
  ];
  reloadPage() {
    window.location.reload(); // Simple page refresh
  }
  
}
