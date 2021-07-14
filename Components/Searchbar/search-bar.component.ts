import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

// the below onSubmit method is for accessing the form value. //
  onSubmit(form: NgForm){
// from the form we are extrtactingf the values taken from the form input by the user which is the (search(button)). //
   this.router.navigate(['serach', form.value.search]);
  }

}
