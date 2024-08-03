import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  pieChartOptions!: Highcharts.Options;
  splineChartOptions!: Highcharts.Options;
  donutChartOptions!: Highcharts.Options;

  ngOnInit(): void {
    // Pie Chart Configuration: Book Genres Distribution
    this.pieChartOptions = {
      chart: {
        type: 'pie',
        animation: {
          duration: 1000, // Animation duration in milliseconds
          easing: 'easeOutBounce' // Animation easing function
        }
      },
      title: { text: 'Book Genre Distribution' },
      credits: { enabled: false },
      series: [{
        name: 'Genres',
        type: 'pie',
        data: [
          { name: 'Historical Fiction', y: 30 },
          { name: 'Science Fiction', y: 25 },
          { name: 'Fantasy', y: 20 },
          { name: 'Romance', y: 15 },
          { name: 'Mystery', y: 10 }
        ]
      }]
    };

    // Spline Chart Configuration: Book Prices Over Time
    this.splineChartOptions = {
      chart: {
        type: 'spline',
        animation: {
          duration: 1500, // Animation duration in milliseconds
          easing: 'easeInOutQuart' // Animation easing function
        }
      },
      title: { text: 'Average Book Prices Over Time' },
      credits: { enabled: false },
      xAxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
        title: { text: 'Quarters of the Year' }
      },
      yAxis: {
        title: { text: 'Average Price ($)' },
        min: 10
      },
      series: [{
        name: 'Average Price',
        type: 'spline',
        data: [12, 20, 10, 50, 25, 60],
        marker: { enabled: true }
      }]
    };

    // Donut Chart Configuration: Book Sales by Region
    this.donutChartOptions = {
      chart: {
        type: 'pie',
        animation: {
          duration: 1200, // Animation duration in milliseconds
          easing: 'easeOutExpo' // Animation easing function
        }
      },
      title: { text: 'Book Sales Distribution by Region' },
      credits: { enabled: false },
      plotOptions: { pie: { innerSize: '50%' } },
      series: [{
        name: 'Sales',
        type: 'pie',
        data: [
          { name: 'North America', y: 50 },
          { name: 'Europe', y: 30 },
          { name: 'Asia', y: 10 },
          { name: 'South America', y: 5 },
          { name: 'Africa', y: 5 }
        ]
      }]
    };
  }
}