import { Component, OnInit, ViewChild } from '@angular/core';
import { CsaDataService } from 'src/services';
import { Entry } from 'src/models';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home'
  cloudServiceEntries: Entry[];
  cloudServiceColumns: string[] = ['id', 'name', 'url', 'created_at', 'updated_at'];
  resultsLength: number;
  
  constructor(private csaDataService: CsaDataService) { }

  ngOnInit() {
    this.getApplicationData();
  }

  getApplicationData() {
    this.cloudServiceEntries = []; 

    // TODO: Make the service call to get all of the 
    // partner/publisher data
    this.csaDataService.getApplications().subscribe(result => {
      this.cloudServiceEntries = result;
      this.resultsLength = this.cloudServiceEntries.length;
    })
  
    // For now writing down a simple indicator in the console.
    console.log('Getting the publisher data');
  }

}
