import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { environment } from 'src/environments/environment.development';
import { Item } from '../models/Items';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {

  constructor(private http: HttpClient) {}

  searchOrGetItems(searchWord: string, filters: any, pagination: Pagination): Observable<any> {
    if (searchWord) {
      return this.searchEquipment(searchWord, filters);
    } else {
      return this.getItems(pagination, filters);
    }
  }
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

    return this.http.get(environment.API_URL + '/api/equipment', { params }).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  
  searchEquipment(searchTerm: string, filters: any): Observable<any> {
    let params = new HttpParams().set('search', searchTerm);
  
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }
  
    return this.http.get<any>(environment.API_URL + "/api/equipment/search", { params }).pipe(catchError(this.handleError));
  }
  
  getEquipmentTypesWithPagination(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
  
    return this.http.get<any>(environment.API_URL + '/api/equipmenttype', { params }).pipe(
       tap(data => console.log('Equipment Types:', data)), // Debugging line
      catchError(this.handleError)
    );
  }
  
  addEquipment(item: Item): Observable<any> {
    return this.http.post<any>(environment.API_URL + '/api/equipment', item).pipe(
      tap(data => console.log('Equipment added:', data)),
      catchError(this.handleError)
    );
}
  getBrandListWithPagination(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
  
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbrandlist', { params }).pipe(catchError(this.handleError));
  }
  getEquipmentTypes(): Observable<any> {
    return this.http.get<any>(environment.API_URL + "/api/equipmenttype").pipe(catchError(this.handleError));;
  }
  getBrandList(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbrandlist').pipe(catchError(this.handleError));;
  }
  getMatterList(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getmatterlist').pipe(catchError(this.handleError));;
  }

  getInventoryTypeList(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getinventorytypelist').pipe(catchError(this.handleError));;
  }

  getItemStatusList(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getremarks').pipe(catchError(this.handleError));;
  }
  addEquipmentType(equipmentType: any): Observable<any> {
    return this.http.post<any>(environment.API_URL + '/api/equipmenttype', equipmentType).pipe(
      tap(data => console.log('Equipment added:', data)),
      catchError(this.handleError)
    );
  }



  
  updateItem(_id: string, item: Item): Observable<any> {
    return this.http.patch<any>(environment.API_URL + '/api/equipment/' + `${item._id}`, item);
  }
  equipmentNameAscending(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbynameasc').pipe(catchError(this.handleError));;
  }
  equipmentNameDescending(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbynamedesc').pipe(catchError(this.handleError));;
  }
  equipmentColorAscending(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbycolorasc').pipe(catchError(this.handleError));;
  }
  equipmentColorDescending(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbycolordesc').pipe(catchError(this.handleError));;
  }


  getUsers(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/users').pipe(catchError(this.handleError));;
  }
  getUserTypes(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/usertypes').pipe(catchError(this.handleError));;
  }
  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
