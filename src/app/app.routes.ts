import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory/inventory.component';
import { FinanceComponent } from './finance/finance/finance.component';
import { InvoiceComponent } from './invoice/invoice/invoice.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { SalesTrackingComponent } from './sales-tracking/sales-tracking/sales-tracking.component';
import { MarketingComponent } from './marketing/marketing/marketing.component';
import { BusinessOverviewComponent } from './business-overview/business-overview.component';
import { AuthComponent } from './landing-page/auth/auth.component';
import { authGuard } from './guard/auth.guard';
import { BillingComponent } from './billing/billing.component';


export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'landing-page', component: LandingPageComponent },
    { path: 'auth', component:AuthComponent },
    { path: 'business-overview', component: BusinessOverviewComponent, canActivate : [authGuard] , children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'sales-tracking', component: SalesTrackingComponent },
        { path: 'customers', component: CustomerComponent },
        { path: 'inventory', component: InventoryComponent },
        { path: 'finance', component: FinanceComponent },
        { path: 'billing', component: BillingComponent },
    ]},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

