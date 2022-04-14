import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Trip } from 'src/app/models/trip';
import { Observable } from 'rxjs';
import { FileDB } from 'src/app/models/fileDB';
import { User } from 'src/app/models/user';



const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  tripsUrl="http://localhost:8089/SpringMVC/Trip/get-trip";
  usersUrl="http://localhost:8089/SpringMVC/user/retrieveAllUsers"
  addtripsUrl="http://localhost:8089/SpringMVC/Trip/ajouttrip";
  deletetripsUrl="http://localhost:8089/SpringMVC/Trip/delete-trip";
  gettripsUrl="http://localhost:8089/SpringMVC/Trip/get-trip";
  updatetripsUrl="http://localhost:8089/SpringMVC/Trip/update-trip";
  pdfbytrip="http://localhost:8089/SpringMVC/Trip/trip-to-pdf";
  uploadfile="http://localhost:8089/SpringMVC/File/upload";
  getfile="http://localhost:8089/SpringMVC/File/files";
  affecterfile="http://localhost:8089/SpringMVC/Trip/affecter-fileToTrip";
  affecterusertrip="http://localhost:8089/SpringMVC/Trip/affecter-utilisateur";
  constructor(private http : HttpClient) { }
  
  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
    }
    getUserss() : Observable<User[]> {
      return this.http.get<User[]>(this.usersUrl);
      }
  ajoutTrip(trip :Trip,id:number): Observable<Trip>{
    return this.http.post<Trip>(`${this.addtripsUrl}/${id}`,trip);
  }
  deleteTrip(id:number): any{
    return this.http.delete(`${this.deletetripsUrl}/${id}`);
  }
  getTrip(id:number): Observable<Trip>{
    return this.http.get<Trip>(`${this.gettripsUrl}/${id}`);
  
  }
  updateTrip(id:number,trip :Trip): Observable<Trip>{
    return this.http.put<Trip>(`${this.updatetripsUrl}/${id}`,trip);
  }
  getpdfbytrip(id:number) :Observable<any> {
    return this.http.get(`${this.pdfbytrip}/${id}`);
    }
    upload(file: File): Observable<HttpEvent<any>> {
      const formData: FormData = new FormData();
      formData.append('file', file);
      const req = new HttpRequest('POST', `${this.uploadfile}`, formData, {
        reportProgress: true,
        responseType: 'json'
      });
      return this.http.request(req);
    }
    getFiles(): Observable<any> {
      return this.http.get(`${this.getfile}`);
    }
    
    affectusertrip(id:number,idu :number,trip :Trip): Observable<Trip>{
      return this.http.put<Trip>("http://localhost:8089/SpringMVC/Trip/affecter-utilisateur/"+id+"/"+idu,trip);
    }
    desaffeteraffectusertrip(id:number,idu :number,trip :Trip): Observable<Trip>{
      return this.http.put<Trip>("http://localhost:8089/SpringMVC/Trip/delete-user-from-trip/"+id+"/"+idu,trip);
    }
    
}
