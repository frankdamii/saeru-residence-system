import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  generateResidentCard(residentData: any): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let currentY = margin;

    // --- Cabecera ---
    const logoUrl = 'assets/images/AAUCA_LOGO-TR@2x_EP.png';
    doc.addImage(logoUrl, 'PNG', margin, currentY, 25, 25);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Universidad Afro-Americana de África Central', pageWidth / 2, currentY + 10, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Dirección de Residencias', pageWidth / 2, currentY + 18, { align: 'center' });
    
    currentY += 30;
    doc.setLineWidth(0.5);
    doc.line(margin, currentY, pageWidth - margin, currentY);

    // --- Título del Documento ---
    currentY += 15;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Ficha Informacional del Residente', pageWidth / 2, currentY, { align: 'center' });
    
    // --- Foto de Perfil y Datos Principales ---
    currentY += 10;
    const profileImageUrl = this.getBackendBaseUrl() + '/' + residentData.profile_image_url.replace(/\\/g, '/');
    doc.addImage(profileImageUrl, 'JPEG', margin, currentY, 40, 40);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Datos Personales', margin + 50, currentY + 5);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre Completo: ${residentData.first_name} ${residentData.last_name}`, margin + 50, currentY += 12);
    doc.text(`Fecha de Nacimiento: ${new Date(residentData.date_of_birth).toLocaleDateString('es-ES')}`, margin + 50, currentY += 7);
    doc.text(`Documento: ${residentData.identity_document_type} ${residentData.identity_document_number}`, margin + 50, currentY += 7);
    doc.text(`Teléfono: ${residentData.phone_number}`, margin + 50, currentY += 7);
    doc.text(`Residencia Habitual: ${residentData.home_residence}`, margin + 50, currentY += 7);
    
    currentY += 10;
    doc.line(margin, currentY, pageWidth - margin, currentY);

    // --- Información Académica y de Residencia ---
    currentY += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Información Académica y de Residencia', margin, currentY);
    
    currentY += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Facultad: ${residentData.Faculty?.name || 'N/A'}`, margin, currentY);
    doc.text(`Carrera: ${residentData.Major?.name || 'N/A'}`, margin + 90, currentY);
    currentY += 7;
    doc.text(`Curso: ${residentData.AcademicLevel?.level_name || 'N/A'}`, margin, currentY);
    doc.text(`Residencia: ${residentData.Application?.Habitation?.Residence?.name || 'N/A'}`, margin + 90, currentY);
    currentY += 7;
    doc.text(`Habitación: ${residentData.Application?.Habitation?.habitation_code || 'N/A'}`, margin, currentY);
    doc.text(`Piso: ${residentData.Application?.Habitation?.floor || 'N/A'}`, margin + 90, currentY);

    currentY += 10;
    doc.line(margin, currentY, pageWidth - margin, currentY);

    // --- Tutores ---
    currentY += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Tutores', margin, currentY);

    currentY += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    if (residentData.guardians && residentData.guardians.length > 0) {
        residentData.guardians.forEach((guardian: any) => {
            doc.text(`- ${guardian.full_name} (${guardian.guardian_type})`, margin, currentY);
            currentY += 5;
            doc.text(`  Tel: ${guardian.phone_number} | Ocupación: ${guardian.occupation || 'N/A'} | Residencia: ${guardian.residence || 'N/A'}`, margin, currentY);
            currentY += 7;
        });
    } else {
        doc.text('No hay tutores registrados.', margin, currentY);
        currentY += 7;
    }
    
    doc.line(margin, currentY, pageWidth - margin, currentY);

    // --- Información Adicional ---
    currentY += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Información Adicional', margin, currentY);

    currentY += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Problemas Médicos: ${residentData.medical_issues || 'Ninguno'}`, margin, currentY);
    currentY += 7;
    doc.text(`Hábitos Perjudiciales: ${residentData.harmful_habits || 'Ninguno'}`, margin, currentY);
    currentY += 7;
    doc.text(`Observaciones: ${residentData.observations || 'Ninguna'}`, margin, currentY);

    // --- Pie de Página ---
    const footerY = pageHeight - 20;
    doc.setLineWidth(0.5);
    doc.line(margin, footerY, pageWidth - margin, footerY);
    doc.setFontSize(8);
    doc.text('Generado por SAERU - Sistema de Admisión de Estudiantes en la Residencia Universitaria', pageWidth / 2, footerY + 8, { align: 'center' });
    doc.text(`Fecha de Impresión: ${new Date().toLocaleString('es-ES')}`, pageWidth / 2, footerY + 12, { align: 'center' });

    // --- Guardar el PDF ---
    doc.save(`ficha_residente_${residentData.last_name}.pdf`);
  }

  // Helper para obtener la URL base del backend
  private getBackendBaseUrl(): string {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:3000`; // Asume que el backend corre en el puerto 3000
  }
}