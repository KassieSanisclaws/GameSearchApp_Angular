import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomepageComponent } from './components/homepage/homepage.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'search/:game-search', component: HomepageComponent}, 
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
