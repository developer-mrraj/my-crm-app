import { Component, ViewChild } from "@angular/core";
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis?: ApexYAxis;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
  legend?: ApexLegend;
};

@Component({
  selector: "app-total-revenue-kpi",
  imports:[NgApexchartsModule],
  templateUrl: "./total-revenue-kpi.component.html",
  styleUrls: ["./total-revenue-kpi.component.css"]
})
export class TotalRevenueKPIComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Sales",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148] // Hardcoded sales data
        }
      ],
      chart: {
        height: 350,
        type: "area", // ✅ Changed from 'line' to 'area'
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth" // ✅ Changed to smooth for better area chart look
      },
      title: {
        text: "Total Sales by Month",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // Alternating row colors
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    };
  }
}
