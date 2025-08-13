import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // <-- Importamos Router

// Módulos de Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [ CommonModule, MatTableModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule ],
  templateUrl: './application-list.html',
  styleUrls: ['./application-list.scss']
})
export class ApplicationListComponent implements OnInit {
  
  applications$!: Observable<any[]>;
  displayedColumns: string[] = ['id', 'name', 'submission_date', 'status', 'actions'];

  constructor(
    private adminService: AdminService,
    private router: Router // <-- Inyectamos Router
  ) {}

  ngOnInit(): void {
    this.applications$ = this.adminService.getApplications();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/admin/applications', id]); // <-- Navegamos a la ruta de detalles
  }
}
