import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../../auth/services/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // <-- Importamos tap
import { environment } from '../../../../environments/environment';
import { PdfGeneratorService } from '../../../core/services/pdf-generator';

// Módulos de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatToolbarModule, MatDividerModule, MatTabsModule, MatGridListModule ],
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.scss']
})
export class MyProfileComponent implements OnInit {

  profile$!: Observable<any>;
  announcements$!: Observable<any[]>;
  currentProfileData: any;
  baseUrl = environment.apiUrl.replace('/api', '');

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router,
    private pdfService: PdfGeneratorService
  ) {}

  ngOnInit(): void {
    this.profile$ = this.studentService.getMyProfile().pipe(
        tap(data => this.currentProfileData = data)
    );
    this.announcements$ = this.studentService.getAnnouncements();
  }

  downloadPdf(): void {
    if (this.currentProfileData) {
      this.pdfService.generateResidentCard(this.currentProfileData);
    }
  }

  calculateYearsInResidence(dateString: string): string {
    if (!dateString) return 'N/A';
    
    const admissionDate = new Date(dateString);
    const now = new Date();
    
    let years = now.getFullYear() - admissionDate.getFullYear();
    let months = now.getMonth() - admissionDate.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0 && months === 0) return "Recién admitido";
    
    const yearText = years > 0 ? `${years} año${years > 1 ? 's' : ''}` : '';
    const monthText = months > 0 ? `${months} mes${months > 1 ? 'es' : ''}` : '';

    return [yearText, monthText].filter(Boolean).join(' y ');
  }

  getFileUrl(filePath: string): string {
    return `${this.baseUrl}/${filePath}`;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
