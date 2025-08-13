import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

// Módulos de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatCardModule, MatIconModule, MatTableModule, MatButtonModule, MatProgressSpinnerModule ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  
  stats$!: Observable<any>;
  displayedColumns: string[] = ['id', 'name', 'submission_date', 'status', 'actions'];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stats$ = this.adminService.getDashboardStats();
  }

  viewApplication(id: number): void {
    this.router.navigate(['/admin/applications', id]);
  }
}