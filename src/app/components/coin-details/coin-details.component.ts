import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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
