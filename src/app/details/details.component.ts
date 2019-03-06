import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CsaDataService } from 'src/services';
import { EntryDetail, RegistryEntry, CaiqTemplate, CaiqAssessment, CaiqAssessmentDetail, Control } from 'src/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
 
  paramsSub: any; 

  cloudServiceEntry: EntryDetail;
  regEntryData: RegistryEntry[];
  singleEntryData: RegistryEntry;
  caiqTemplate: CaiqTemplate;
  caiqAssessment: CaiqAssessment;
  caiqAssessmentDetails: CaiqAssessmentDetail[];
  controlData: Control[];

  selectedId: number;
  selectedName: string;
  htmlStrDesc: string;
  htmlStrOrgDesc: string;
  displayedColumns: string[] = ['id', 'type', 'specification_name', 'specification_url', 'asset_url', 'created_at'];
  caiqDetailColumns: string[] = ['title', 'question_id', 'question', 'response', 'comment'];

  constructor(private activatedRoute: ActivatedRoute, private csaDataService: CsaDataService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.selectedId = parseInt(params['id']);
      this.selectedName = params['name'];

      this.getRegistryEntryDetail(this.selectedId); 
    });
  }

  getRegistryEntryDetail(selectedId: number) {
    console.log('Getting data for the CloudServiceId: ' + selectedId); 

    // TODO return the service call and other detail information
    this.csaDataService.getCloudServiceEntry(selectedId).subscribe(result => {
      this.cloudServiceEntry = result; 

      this.regEntryData = this.cloudServiceEntry.registry_entries;

      this.htmlStrDesc = this.cloudServiceEntry.description;
      this.htmlStrOrgDesc = this.cloudServiceEntry.organization_description;

      var filteredEntryData = this.regEntryData.filter(data => data.specification_name == environment.specificationFilter);

      this.singleEntryData = filteredEntryData[0];
      if (this.singleEntryData != null) {
        this.getCaiqTemplateInfo();
        this.getCaiqAssessmentInfo(this.singleEntryData.id);
      }

      console.log(this.cloudServiceEntry); 
    })
  }

  getCaiqTemplateInfo() {
    this.csaDataService.getCaiqTemplate().subscribe(result => {
      this.caiqTemplate = result;

      this.controlData = [];

      // Logging the CAIQ Template information
      const caiqDomains = this.caiqTemplate.domains;

      console.log(caiqDomains);

      caiqDomains.forEach(item => {
        for(var i = 0; i < item.controls.length; i++) {
          var tempControl = item.controls[i];

          this.controlData.push(tempControl); 
        }
      });
    });
  }

  getCaiqAssessmentInfo(id: number) {
    this.csaDataService.getCaiqAssessment(id).subscribe(result => {
      this.caiqAssessment = result;
    })
  }

  onTitleChanged(event) {
    if(event.isUserInput) {
      const selectedControlId = event.source.value;
      console.log(selectedControlId);

      var filteredControlData = this.controlData.filter(x => x.control_id == selectedControlId);
      var filteredQuestions = filteredControlData[0].questions;

      this.caiqAssessmentDetails = [];
       
      for (var k = 0; k < filteredQuestions.length; k++) {
        var newObject: any = {};

        var filteredResponse = this.caiqAssessment.responses.filter(x => x.question_id == filteredQuestions[k].question_id);

        newObject.title = filteredControlData[0].title;
        newObject.question = filteredQuestions[k].description;
        newObject.question_id = filteredQuestions[k].question_id;
        newObject.response = filteredResponse[0].answer;
        newObject.comment = filteredResponse[0].comment;

        this.caiqAssessmentDetails.push(newObject); 
      }

      console.log(this.caiqAssessmentDetails);
    }
  }
}
