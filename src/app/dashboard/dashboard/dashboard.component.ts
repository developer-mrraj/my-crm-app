import { Component} from '@angular/core';
import { TotalSalesKPIComponent } from "../../charts/total-sales-kpi/total-sales-kpi.component";
import { TotalRevenueKPIComponent } from "../../charts/total-revenue-kpi/total-revenue-kpi.component";
import { NewVsRepeatedKpiComponent } from "../../charts/new-vs-repeated-kpi/new-vs-repeated-kpi.component";
import { CustomerSegmentationKpiComponent } from "../../charts/customer-segmentation-kpi/customer-segmentation-kpi.component";
import { TopSellingItemsComponent } from "../../charts/top-selling-items/top-selling-items.component";

// Defines the structure of a bill object with three properties
interface Bill {
  bill_id: string;
  current_date: string;
  payment_method: string;
}

interface Customer{
  name : string;
  mobile_number : number;
  email : string;
  address : string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TotalSalesKPIComponent, TotalRevenueKPIComponent, NewVsRepeatedKpiComponent, CustomerSegmentationKpiComponent, TopSellingItemsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // Corrected styleUrls (plural)
})
export class DashboardComponent  {

}
