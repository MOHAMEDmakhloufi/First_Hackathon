import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  public navigated: boolean=true;

  navigatedF(){
    if(this.navigated == true){
      this.navigated = false
    }else{
      this.navigated = true;
    }
  }  
}
