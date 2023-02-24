import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage'

@Injectable({providedIn:'root'})
export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get<Trip[]>(`${this.apiBaseUrl}trips`)
      .toPromise();
  }

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };
    return this.http
      .post<Trip>(this.tripUrl, formData, httpOptions)
      .toPromise();
  }

  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getdTrip');
    return this.http
      .get<Trip>(this.tripUrl + tripCode)
      .toPromise();
  }

  public updateTrip(formData: Trip): Promise<void> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      .put<void>(this.tripUrl + formData.code, formData)
      .toPromise();
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
 }

 public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
 }

 private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
  const url: string = `${this.apiBaseUrl}/${urlPath}`;
  return this.http
    .post(url, user)
    .toPromise()
    .then(response => response as AuthResponse)
    .catch(this.handleError);
}

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}