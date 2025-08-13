import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  getApplications(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/applications`); }
  getApplicationById(id: number): Observable<any> { return this.http.get<any>(`${this.apiUrl}/applications/${id}`); }
  getAnnouncements(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/announcements`);}
  updateApplicationStatus(id: number, status: string, notes: string, habitationId?: number): Observable<any> {
   
    const payload: any = {
      status: status,
      admin_notes: notes
    };
    if (habitationId) {
      payload.habitation_id = habitationId;
    }
    return this.http.put(`${this.apiUrl}/applications/${id}/status`, payload);
  }

  getResidents(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/residents`); }
  getResidentById(id: number): Observable<any> { return this.http.get<any>(`${this.apiUrl}/residents/${id}`); }
  updateResidentStatus(id: number, isActive: boolean): Observable<any> { return this.http.put(`${this.apiUrl}/residents/${id}/status`, { is_active: isActive }); }
  getAvailableHabitations(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/habitations/available`); }
  getAllResidences(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/residences`); }

  createResidence(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/residences`, { name });
  }
  createAnnouncement(title: string, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/announcements`, { title, content });
  }
  createHabitation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/habitations`, data);
  }

  deleteHabitation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/habitations/${id}`);
  }

    getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard-stats`);
  }
}