import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private apiUrl = `${environment.apiUrl}/applications`;

  constructor(private http: HttpClient) { }

  // Método para enviar el formulario con datos y archivos
  submitApplication(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
    // (Opcional) Podríamos añadir aquí métodos para obtener las listas de facultades, etc.
}