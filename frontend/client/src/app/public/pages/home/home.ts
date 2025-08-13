import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Importamos CommonModule
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  backgroundImages = [
    'assets/images/residencia3.jpg',
    'assets/images/residencia4.jpg',
    'assets/images/residencia6.jpg',
  ];

  currentImageIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    // Cambiar la imagen cada 5 segundos
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo para evitar fugas de memoria
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
