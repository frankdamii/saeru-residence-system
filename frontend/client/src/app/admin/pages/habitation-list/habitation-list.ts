import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ResidenceDialogComponent } from '../../components/residence-dialog/residence-dialog';
import { HabitationDialogComponent } from '../../components/habitation-dialog/habitation-dialog';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-habitation-list',
  standalone: true,
  imports: [ CommonModule, MatDialogModule, MatSnackBarModule, MatExpansionModule, MatProgressSpinnerModule, MatListModule, MatIconModule, MatChipsModule, MatButtonModule ],
  templateUrl: './habitation-list.html',
  styleUrls: ['./habitation-list.scss']
})
export class HabitationListComponent implements OnInit {

  residences$!: Observable<any[]>;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadResidences();
  }

  loadResidences(): void {
    this.residences$ = this.adminService.getAllResidences();
  }

  openAddResidenceDialog(): void {
    const dialogRef = this.dialog.open(ResidenceDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.createResidence(result).subscribe(() => {
          this.snackBar.open('Residencia creada con éxito', 'Cerrar', { duration: 3000 });
          this.loadResidences();
        });
      }
    });
  }

  openAddHabitationDialog(residenceId: number): void {
    const dialogRef = this.dialog.open(HabitationDialogComponent, { data: { residence_id: residenceId } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.createHabitation(result).subscribe(() => {
          this.snackBar.open('Habitación creada con éxito', 'Cerrar', { duration: 3000 });
          this.loadResidences();
        });
      }
    });
  }

  deleteHabitation(id: number): void {
    if (confirm('¿Estás seguro de que quieres borrar esta habitación? Esta acción no se puede deshacer.')) {
      this.adminService.deleteHabitation(id).subscribe({
        next: () => {
          this.snackBar.open('Habitación borrada con éxito', 'Cerrar', { duration: 3000 });
          this.loadResidences();
        },
        error: (err) => this.snackBar.open(err.error.message, 'Cerrar', { duration: 4000 })
      });
    }
  }

  getOccupantName(habitation: any): string {
    if (habitation.Applications && habitation.Applications.length > 0 && habitation.Applications[0].StudentProfile) {
      const profile = habitation.Applications[0].StudentProfile;
      return `${profile.first_name} ${profile.last_name}`;
    }
    return 'N/A';
  }
}

