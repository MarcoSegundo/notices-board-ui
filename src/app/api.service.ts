import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Notice } from './notice';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "http://localhost:8080/notices";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      // log to console instead
      console.error(error);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getNotices (): Observable<Notice[]> {
    return this.http.get<Notice[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched notices')),
        catchError(this.handleError('getNotices', []))
      );
  }
  
  getNotice(id: number): Observable<Notice> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Notice>(url).pipe(
      tap(_ => console.log(`fetched notice id=${id}`)),
      catchError(this.handleError<Notice>(`getNotice id=${id}`))
    );
  }
  
  addNotice (notice): Observable<Notice> {
    return this.http.post<Notice>(apiUrl, notice, httpOptions).pipe(
      tap((notice: Notice) => console.log(`added notice w/ id=${notice.id}`)),
      catchError(this.handleError<Notice>('addNotice'))
    );
  }
  
  updateNotice (id, notice): Observable<any> {    
    return this.http.put(apiUrl, notice, httpOptions).pipe(
      tap(_ => console.log(`updated notice id=${id}`)),
      catchError(this.handleError<any>('updateNotice'))
    );
  }
  
  deleteNotice (id): Observable<Notice> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Notice>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted notice id=${id}`)),
      catchError(this.handleError<Notice>('deleteNotice'))
    );
  }
}
