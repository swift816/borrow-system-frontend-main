import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {

  constructor(private http: HttpClient) {}

  getItems(pagination: Pagination, filters: any): Observable<any> {
    console.log('Fetching items with params:', pagination, filters);
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());
  
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get(environment.API_URL + '/api/equipment', { params }).pipe(catchError(this.handleError));
  }
  
  getEquipmentTypes(): Observable<any> {
    return this.http.get<any>(environment.API_URL + "/api/equipmenttype").pipe(catchError(this.handleError));;
  }
  getBrandList(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbrandlist').pipe(catchError(this.handleError));;
  }
  addEquipment(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment').pipe(catchError(this.handleError));;
  }
  addEquipmentType(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipmenttype').pipe(catchError(this.handleError));;
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
