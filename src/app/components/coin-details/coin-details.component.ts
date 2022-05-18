import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit {

  coinData: any;
  coinId !: string;
  days : number = 1;
  curremcy : string = "USD";

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Price Trends',
        backgroundColor: 'rgba(184,159,177,0.2)',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },
    scales: {
    },
    plugins: {
      legend: {display: true},
    }
  }

  // Define the type of chart
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(private api : ApiService, private acttivedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.acttivedRoute.params
    .subscribe(val =>{
      this.coinId = val['id'];
    });
    this.getCoinData();
  }

  getCoinData(){
    this.api.getCurrencyId(this.coinId)
    .subscribe(res => {
      this.coinData = res;
      console.log(this.coinData);
    })
  }

}
