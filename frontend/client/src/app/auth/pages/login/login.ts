import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // <-- Importamos RouterModule
import { AuthService } from '../../services/auth';

// Módulos de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // <-- Importamos MatIconModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule, // <-- Añadido aquí
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule // <-- Añadido aquí
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) { return; }
    this.errorMessage = null;
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (response.user.role === 'student') {
          this.router.navigate(['/student']);
        } else {
          this.errorMessage = 'Rol de usuario no reconocido.';
        }
      },
      error: (err) => { this.errorMessage = err.error.message || 'No se pudo iniciar sesión.'; }
    });
  }
}