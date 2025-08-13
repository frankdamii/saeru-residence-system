import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Módulos de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-habitation-dialog',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule ],
  templateUrl: './habitation-dialog.html',
})
export class HabitationDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HabitationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { residence_id: number }
  ) {
    this.form = this.fb.group({
      habitation_code: ['', Validators.required],
      floor: ['', [Validators.required, Validators.min(0)]],
      capacity: ['', [Validators.required, Validators.min(1), Validators.max(4)]]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.form.value,
        residence_id: this.data.residence_id
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
