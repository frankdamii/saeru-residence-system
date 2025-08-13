import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicService } from '../../services/public.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Módulos de Angular Material
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider'; // <-- Importamos MatDividerModule

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatSnackBarModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatProgressSpinnerModule, MatDividerModule ], // <-- Añadido aquí
  templateUrl: './application-form.html',
  styleUrls: ['./application-form.scss']
})
export class ApplicationFormComponent implements OnInit {
  isLinear = true;
  personalInfoForm!: FormGroup;
  academicInfoForm!: FormGroup;
  documentsForm!: FormGroup;
  guardianInfoForm!: FormGroup;

  profileImagePreview: string | ArrayBuffer | null = null;
  isLoading = false;

  countryCodes = [
    { name: 'Guinea Ecuatorial', code: '+240', example: '222 123 456' },
    { name: 'España', code: '+34', example: '612 345 678' },
    { name: 'Camerún', code: '+237', example: '6 12 34 56 78' },
    { name: 'Gabón', code: '+241', example: '01 23 45 67' },
    { name: 'Nigeria', code: '+234', example: '801 234 5678' },
    { name: 'Francia', code: '+33', example: '6 12 34 56 78' },
    { name: 'Portugal', code: '+351', example: '912 345 678' },
  ];

  faculties = [
    { id: 1, name: 'Facultad de Ingeniería y Tecnología' },
    { id: 2, name: 'Facultad de Ciencias Sociales y Humanidades' },
    { id: 3, name: 'Facultad de Ciencias de la Salud' },
    { id: 4, name: 'Facultad de Ciencias Económicas y Empresariales' }
  ];
  
  allMajors = [
    { id: 1, faculty_id: 1, name: 'Ingeniería Informática' }, { id: 2, faculty_id: 1, name: 'Ingeniería Civil' },
    { id: 3, faculty_id: 1, name: 'Ingeniería en Telecomunicaciones' }, { id: 4, faculty_id: 2, name: 'Derecho' },
    { id: 5, faculty_id: 2, name: 'Ciencias Políticas' }, { id: 6, faculty_id: 2, name: 'Traducción e Interpretación' },
    { id: 7, faculty_id: 2, name: 'Periodismo' }, { id: 8, faculty_id: 3, name: 'Medicina' },
    { id: 9, faculty_id: 3, name: 'Enfermería' }, { id: 10, faculty_id: 3, name: 'Farmacia' },
    { id: 11, faculty_id: 4, name: 'Economía' }, { id: 12, faculty_id: 4, name: 'Administración y Dirección de Empresas' },
    { id: 13, faculty_id: 4, name: 'Marketing' }
  ];

  filteredMajors: any[] = [];

  academicLevels = [
    { id: 1, name: 'Primer Año' }, { id: 2, name: 'Segundo Año' },
    { id: 3, name: 'Tercer Año' }, { id: 4, name: 'Cuarto Año' },
    { id: 5, name: 'Quinto Año' }, { id: 6, name: 'Máster' }
  ];

  constructor(
    private fb: FormBuilder,
    private publicService: PublicService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required], lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required], idType: ['', Validators.required],
      idNumber: ['', Validators.required], 
      phoneCode: ['', Validators.required],
      phoneNumber: ['', Validators.required], 
      homeResidence: ['', Validators.required], instagram: [''],
    });

    this.academicInfoForm = this.fb.group({
      facultyId: ['', Validators.required], majorId: [{value: '', disabled: true}, Validators.required],
      academicLevelId: ['', Validators.required], academicYear: ['2024/2025', Validators.required],
    });

    this.documentsForm = this.fb.group({
      profileImage: [null, Validators.required], enrollmentProof: [null, Validators.required],
      entrySlip: [null, Validators.required], paymentReceipt: [null, Validators.required]
    });

    this.guardianInfoForm = this.fb.group({
      guardian1Type: ['', Validators.required], guardian1Name: ['', Validators.required],
      guardian1Phone: ['', Validators.required],
      guardian1Occupation: [''],
      guardian1Residence: [''],
      guardian1Relationship: [''],
      medical: [''], habits: [''], observations: ['']
    });
  }

  getPhoneExample(): string {
    const selectedCode = this.personalInfoForm.get('phoneCode')?.value;
    const country = this.countryCodes.find(c => c.code === selectedCode);
    return country ? `Ej: ${country.example}` : 'XXX XXX XXX';
  }

  onFacultyChange(facultyId: number): void {
    this.filteredMajors = this.allMajors.filter(m => m.faculty_id === facultyId);
    this.academicInfoForm.get('majorId')?.enable();
    this.academicInfoForm.get('majorId')?.setValue('');
  }

  onFileSelected(event: Event, controlName: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.documentsForm.get(controlName)?.setValue(file);
      
      if (controlName === 'profileImage') {
        const reader = new FileReader();
        reader.onload = () => { this.profileImagePreview = reader.result; };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit(): void {
    if (this.personalInfoForm.invalid || this.academicInfoForm.invalid || this.documentsForm.invalid || this.guardianInfoForm.invalid) {
      this.snackBar.open('Por favor, completa todos los campos requeridos en todos los pasos.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    const formData = new FormData();

    const personalInfo = this.personalInfoForm.value;
    const fullPhoneNumber = `${personalInfo.phoneCode} ${personalInfo.phoneNumber}`;

    const allValues = {
      ...this.personalInfoForm.value,
      ...this.academicInfoForm.getRawValue(),
      ...this.guardianInfoForm.value,
      phoneNumber: fullPhoneNumber
    };
    
    delete allValues.phoneCode;

    const dob: Date = allValues.dateOfBirth;
    if (dob) {
        const offset = dob.getTimezoneOffset();
        const adjustedDob = new Date(dob.getTime() - (offset*60*1000));
        allValues.dateOfBirth = adjustedDob.toISOString().split('T')[0];
    }
    
    for (const key in allValues) {
      if (allValues[key]) {
        formData.append(key, allValues[key]);
      }
    }
    
    for (const key in this.documentsForm.value) {
      formData.append(key, this.documentsForm.get(key)?.value);
    }

    this.publicService.submitApplication(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('¡Solicitud enviada con éxito! Recibirás una notificación cuando sea revisada.', 'Cerrar', {
          duration: 10000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open(err.error.message || 'Error al enviar la solicitud.', 'Cerrar', { 
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}

