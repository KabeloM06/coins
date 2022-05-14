import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinDetailsComponent } from './components/coin-details/coin-details.component';
import { CoinsListComponent } from './components/coins-list/coins-list.component';

const routes: Routes = [
  {path:'', redirectTo: 'coins-list', pathMatch:'full'},
  {path: 'coins-list', component: CoinsListComponent},
  {path: 'coin-details', component: CoinDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
