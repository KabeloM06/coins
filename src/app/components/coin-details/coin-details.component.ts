import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit {
  currency : string = "USD";
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

  constructor(private api : ApiService, private acttivedRoute : ActivatedRoute, private currencyService : CurrencyService) { }

  ngOnInit(): void {
    this.acttivedRoute.params
    .subscribe(val =>{
      this.coinId = val['id'];
    });
    this.getCoinData();
    this.getGraphData();
    this.currencyService.getCurrency()
    .subscribe(res => {
      this.currency = res;
      this.getGraphData();
      this.getCoinData();
    })
  }

  getCoinData(){
    this.api.getCurrencyId(this.coinId)
    .subscribe(res => {
      this.coinData = res;
      console.log(this.coinData);

      if(this.currency === "ZAR"){
        res.market_data.current_price.usd = res.market_data.current_price.zar;
        res.market_data.market_cap.usd = res.market_data.market_cap.zar;
      }
      else if(this.currency === "GBP"){
        res.market_data.current_price.usd = res.market_data.current_price.gbp;
        res.market_data.market_cap.usd = res.market_data.market_cap.gbp;
      }
      res.market_data.current_price.usd = res.market_data.current_price.usd;
      res.market_data.market_cap.usd = res.market_data.market_cap.usd;
      this.coinData = res;
    })
  }

  getGraphData(){
    this.api.getCurrencyGraphData(this.coinId, this.currency, 1)
    .subscribe(res => {
      //Get chart to load automatically
      setTimeout(() => {
        this.myLineChart.chart?.update();
      }, 200);
      this.lineChartData.datasets[0].data= res.prices.map((a:any) =>{
        return a[1];
      });
      this.lineChartData.labels = res.prices.map((a:any) =>{
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` :
        `${date.getHours()}: ${date.getMinutes()} AM`
        return this.days === 1 ? time : date.toLocaleDateString();
      })
    })
  }

}
