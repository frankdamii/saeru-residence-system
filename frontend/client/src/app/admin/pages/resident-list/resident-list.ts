import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// Módulos de Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-resident-list',
  standalone: true,
  imports: [ CommonModule, MatTableModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatChipsModule ],
  templateUrl: './resident-list.html',
  styleUrls: ['./resident-list.scss']
})
export class ResidentListComponent implements OnInit {
  
  residents$!: Observable<any[]>;
  displayedColumns: string[] = ['id', 'name', 'email', 'room', 'status', 'actions'];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.residents$ = this.adminService.getResidents();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/admin/students', id]);
  }
}
