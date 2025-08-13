const db = require('../models');
const sequelize = db.sequelize;

exports.createApplication = async (req, res) => {
  const t = await sequelize.transaction(); // Iniciar transacción

  try {
    // 1. Extraer datos del cuerpo de la petición
    const {
      firstName, lastName, dateOfBirth, idType, idNumber, phoneNumber, homeResidence,
      facultyId, majorId, academicLevelId, instagram, medical, habits, observations,
      academicYear,
      guardian1Type, guardian1Name, guardian1Phone,
      // ... otros campos de tutores si los hay
    } = req.body;

    // 2. Verificar que los archivos se han subido
    if (!req.files || !req.files.profileImage || !req.files.enrollmentProof || !req.files.entrySlip || !req.files.paymentReceipt) {
      throw new Error('Faltan archivos requeridos.');
    }

    // 3. Crear el perfil del estudiante
    const studentProfile = await db.StudentProfile.create({
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      identity_document_type: idType,
      identity_document_number: idNumber,
      phone_number: phoneNumber,
      home_residence: homeResidence,
      faculty_id: facultyId,
      major_id: majorId,
      academic_level_id: academicLevelId,
      profile_image_url: req.files.profileImage[0].path,
      instagram_handle: instagram,
      medical_issues: medical,
      harmful_habits: habits,
      observations: observations,
    }, { transaction: t });

    // 4. Crear la solicitud
    const application = await db.Application.create({
      student_profile_id: studentProfile.id,
      academic_year: academicYear,
      submission_date: new Date(),
    }, { transaction: t });

    // 5. Crear los documentos de entrada
    await db.EntryDocument.create({
        application_id: application.id,
        enrollment_proof_url: req.files.enrollmentProof[0].path,
        entry_slip_url: req.files.entrySlip[0].path,
        payment_receipt_url: req.files.paymentReceipt[0].path,
    }, { transaction: t });

    // 6. Crear el tutor principal
    await db.Guardian.create({
        student_profile_id: studentProfile.id,
        guardian_type: guardian1Type,
        full_name: guardian1Name,
        phone_number: guardian1Phone,
    }, { transaction: t });

    // Si todo ha ido bien, confirmar la transacción
    await t.commit();
    res.status(201).json({ message: 'Solicitud creada con éxito.', applicationId: application.id });

  } catch (error) {
    // Si algo falla, deshacer todos los cambios
    await t.rollback();
    console.error("Error al crear la solicitud:", error);
    res.status(500).json({ message: 'Error al crear la solicitud.', error: error.message });
  }
};