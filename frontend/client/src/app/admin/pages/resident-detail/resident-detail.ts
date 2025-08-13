import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators'; // <-- Importamos tap
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin';
import { environment } from '../../../../environments/environment';
import { PdfGeneratorService } from '../../../core/services/pdf-generator';

// Módulos de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resident-detail',
  standalone: true,
  imports: [ CommonModule, RouterLink, MatCardModule, MatListModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatGridListModule, MatChipsModule, MatDividerModule, MatSnackBarModule ],
  templateUrl: './resident-detail.html',
  styleUrls: ['./resident-detail.scss']
})
export class ResidentDetailComponent implements OnInit {

  resident$!: Observable<any>;
  currentResidentData: any;
  baseUrl = environment.apiUrl.replace('/api', '');
  cols$: Observable<number>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar,
    private pdfService: PdfGeneratorService
  ) {
    this.cols$ = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(
        map(result => {
          if (result.breakpoints[Breakpoints.Handset]) return 1;
          if (result.breakpoints[Breakpoints.Tablet]) return 2;
          return 3;
        }),
        shareReplay()
      );
  }

  ngOnInit(): void {
    this.loadResidentData();
  }

  loadResidentData(): void {
    this.resident$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.adminService.getResidentById(id);
      }),
      tap(data => this.currentResidentData = data)
    );
  }

  downloadPdf(): void {
    if (this.currentResidentData) {
      this.pdfService.generateResidentCard(this.currentResidentData);
    }
  }
  
  updateStatus(residentId: number, currentStatus: boolean): void {
    const newStatus = !currentStatus;
    const actionText = newStatus ? 'activar' : 'desactivar';
    if (confirm(`¿Estás seguro de que quieres ${actionText} la cuenta de este residente?`)) {
      this.adminService.updateResidentStatus(residentId, newStatus).subscribe({
        next: (response) => {
          this.snackBar.open(response.message, 'Cerrar', { duration: 3000 });
          this.loadResidentData();
        },
        error: (err) => {
          this.snackBar.open('Error al actualizar el estado.', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  getFileUrl(filePath: string): string {
    return `${this.baseUrl}/${filePath}`;
  }
}
