import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Registry, Entry, RegistryEntry, EntryDetail, CaiqTemplate, CaiqAssessment } from 'src/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CsaDataService {

  constructor(private http: HttpClient) { }

  getApplications(): Observable<Entry[]> {
    return this.http.get<Registry>(environment.apiLink + 'cloud_services', { headers: { 'Authorization': 'Bearer ' + environment.apiToken}}).pipe(map(data => data.cloud_services)); 
  }

  getCloudServiceEntry(selectedId: number): Observable<EntryDetail> {
    return this.http.get<EntryDetail>(environment.apiLink + 'cloud_services/' + selectedId, { headers: { 'Authorization': 'Bearer ' + environment.apiToken}});
  }

  getCaiqTemplate(): Observable<CaiqTemplate> {
    return this.http.get<CaiqTemplate>(environment.apiLink + 'caiq_templates/1', { headers: {'Authorization': 'Bearer ' + environment.apiToken}});
  }

  getCaiqAssessment(id: number): Observable<CaiqAssessment> {
    return this.http.get<CaiqAssessment>(environment.apiLink + 'caiq_assessments/' + id.toString(), { headers: { 'Authorization': 'Bearer ' + environment.apiToken}});
  }
}
