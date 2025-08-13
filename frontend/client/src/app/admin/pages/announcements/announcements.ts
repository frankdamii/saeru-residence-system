import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Módulos de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatSnackBarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatIconModule, MatProgressSpinnerModule ],
  templateUrl: './announcements.html',
  styleUrls: ['./announcements.scss']
})
export class AnnouncementsComponent implements OnInit {
  
  announcementForm: FormGroup;
  announcements$!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcements$ = this.adminService.getAnnouncements();
  }

  onSubmit(): void {
    if (this.announcementForm.invalid) return;
    
    const { title, content } = this.announcementForm.value;
    this.adminService.createAnnouncement(title, content).subscribe({
      next: () => {
        this.snackBar.open('Anuncio publicado con éxito', 'Cerrar', { duration: 3000 });
        this.announcementForm.reset();
        this.loadAnnouncements();
      },
      error: () => this.snackBar.open('Error al publicar el anuncio', 'Cerrar', { duration: 3000 })
    });
  }
}