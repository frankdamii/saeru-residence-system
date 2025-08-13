import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [ CommonModule, RouterLink, FormsModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatGridListModule, MatChipsModule, MatSnackBarModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDividerModule ],
  templateUrl: './application-detail.html',
  styleUrls: ['./application-detail.scss']
})
export class ApplicationDetailComponent implements OnInit {

  application$!: Observable<any>;
  availableHabitations$!: Observable<any[]>;
  currentApplicationId!: number;
  adminNotes: string = '';
  selectedHabitationId?: number;
  baseUrl = environment.apiUrl.replace('/api', '');

  cols$: Observable<number>; // Solo la declaramos aquí

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // La inicializamos dentro del constructor
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
    this.application$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.currentApplicationId = Number(params.get('id'));
        return this.adminService.getApplicationById(this.currentApplicationId);
      })
    );
    this.availableHabitations$ = this.adminService.getAvailableHabitations();
  }
  updateStatus(status: 'approved' | 'rejected'): void {
    if (status === 'approved' && !this.selectedHabitationId) {
        this.snackBar.open('Por favor, selecciona una habitación para aprobar la solicitud.', 'Cerrar', { duration: 3000 });
        return;
    }
    this.adminService.updateApplicationStatus(this.currentApplicationId, status, this.adminNotes, this.selectedHabitationId)
      .subscribe({
        next: (response) => {
          this.snackBar.open(response.message, 'Cerrar', { duration: 15000 });
          this.router.navigate(['/admin/applications']);
        },
        error: (err) => {
          this.snackBar.open(err.error.message || 'Error al actualizar la solicitud.', 'Cerrar', { duration: 3000 });
        }
      });
  }
  getFileUrl(filePath: string): string {
    return `${this.baseUrl}/${filePath}`;
  }
}
