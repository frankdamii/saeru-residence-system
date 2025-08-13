const db = require('../models');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
};

exports.getAllApplications = async (req, res) => {
    try {
        const applications = await db.Application.findAll({
            include: [{
                model: db.StudentProfile,
                attributes: ['first_name', 'last_name'],
                required: false // Usar LEFT JOIN para más seguridad
            }],
            order: [['submission_date', 'DESC']]
        });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las solicitudes.', error: error.message });
    }
};

exports.getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await db.Application.findByPk(id, {
            include: [
                {
                    model: db.StudentProfile,
                    include: [
                        { model: db.Guardian, as: 'guardians' },
                        { model: db.Faculty, attributes: ['name'] },
                        { model: db.Major, attributes: ['name'] },
                        { model: db.AcademicLevel, attributes: ['level_name'] }
                    ]
                },
                { model: db.EntryDocument }
            ]
        });
        if (!application) return res.status(404).json({ message: 'Solicitud no encontrada.' });
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los detalles de la solicitud.', error: error.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { id } = req.params;
        const { status, admin_notes, habitation_id } = req.body;

        if (!['approved', 'rejected', 'waitlist'].includes(status)) {
            return res.status(400).json({ message: 'Estado inválido.' });
        }

        const application = await db.Application.findByPk(id, { 
            include: [db.StudentProfile],
            transaction: t 
        });

        if (!application) {
            await t.rollback();
            return res.status(404).json({ message: 'Solicitud no encontrada.' });
        }
        
        let temporaryPassword = null;
        if (status === 'approved') {
            if (habitation_id) {
                const habitation = await db.Habitation.findByPk(habitation_id, { transaction: t });
                if (!habitation || habitation.status !== 'available') {
                    await t.rollback();
                    return res.status(400).json({ message: 'La habitación seleccionada no está disponible.' });
                }
                application.assigned_habitation_id = habitation_id;
                habitation.status = 'occupied';
                await habitation.save({ transaction: t });
            }

            if (!application.StudentProfile.user_id) {
                temporaryPassword = generateRandomPassword();
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(temporaryPassword, salt);

                const newUser = await db.User.create({
                    email: `${application.StudentProfile.identity_document_number}@aauca-residence.com`,
                    password_hash: passwordHash,
                    role: 'student',
                    is_active: true
                }, { transaction: t });

                application.StudentProfile.user_id = newUser.id;
                await application.StudentProfile.save({ transaction: t });
            }
        }

        application.status = status;
        if (admin_notes) {
            application.admin_notes = admin_notes;
        }

        await application.save({ transaction: t });
        await t.commit();

        let message = `Solicitud actualizada a '${status}' con éxito.`;
        if (temporaryPassword) {
            message += ` Contraseña temporal del estudiante: ${temporaryPassword}`;
        }

        res.status(200).json({ message });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Error al actualizar el estado de la solicitud.', error: error.message });
    }
};

exports.getAllResidents = async (req, res) => {
    try {
        const residents = await db.StudentProfile.findAll({
            where: { user_id: { [Op.ne]: null } },
            include: [
                { model: db.User, attributes: ['email', 'is_active'], required: false },
                {
                    model: db.Application,
                    attributes: ['assigned_habitation_id'],
                    required: false,
                    include: [{ model: db.Habitation, attributes: ['habitation_code'] }]
                }
            ]
        });
        res.status(200).json(residents);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los residentes.', error: error.message });
    }
};

exports.getResidentById = async (req, res) => {
    try {
        const { id } = req.params;
        const resident = await db.StudentProfile.findByPk(id, {
            include: [
                { model: db.User, attributes: ['email', 'is_active', 'created_at'] },
                { model: db.Guardian, as: 'guardians' },
                { model: db.Faculty, attributes: ['name'] },
                { model: db.Major, attributes: ['name'] },
                { model: db.AcademicLevel, attributes: ['level_name'] },
                { 
                    model: db.Application, 
                    include: [{
                        model: db.Habitation,
                        include: [db.Residence]
                    }] 
                }
            ]
        });
        if (!resident || !resident.user_id) return res.status(404).json({ message: 'Residente no encontrado.' });
        res.status(200).json(resident);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil del residente.', error: error.message });
    }
};

exports.updateResidentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_active } = req.body;
        if (typeof is_active !== 'boolean') return res.status(400).json({ message: 'El estado "is_active" debe ser un valor booleano.' });
        const residentProfile = await db.StudentProfile.findByPk(id);
        if (!residentProfile || !residentProfile.user_id) return res.status(404).json({ message: 'Residente no encontrado.' });
        const user = await db.User.findByPk(residentProfile.user_id);
        if (!user) return res.status(404).json({ message: 'Cuenta de usuario asociada no encontrada.' });
        user.is_active = is_active;
        await user.save();
        const statusText = is_active ? 'activada' : 'desactivada';
        res.status(200).json({ message: `La cuenta del residente ha sido ${statusText} con éxito.` });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado del residente.', error: error.message });
    }
};

exports.getAvailableHabitations = async (req, res) => {
    try {
        const habitations = await db.Habitation.findAll({
            where: { status: 'available' },
            include: [db.Residence]
        });
        res.status(200).json(habitations);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las habitaciones disponibles.', error: error.message });
    }
};

exports.getAllResidences = async (req, res) => {
    try {
        const residences = await db.Residence.findAll({
            include: [{
                model: db.Habitation,
                include: [{
                    model: db.Application,
                    required: false,
                    include: [{
                        model: db.StudentProfile,
                        attributes: ['id', 'first_name', 'last_name']
                    }]
                }]
            }],
            order: [
                ['name', 'ASC'],
                [db.Habitation, 'habitation_code', 'ASC']
            ]
        });
        res.status(200).json(residences);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las residencias.', error: error.message });
    }
};

exports.createResidence = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'El nombre es requerido.' });
        const newResidence = await db.Residence.create({ name });
        res.status(201).json(newResidence);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la residencia.', error: error.message });
    }
};

exports.createHabitation = async (req, res) => {
    try {
        const { residence_id, habitation_code, floor, capacity } = req.body;
        if (!residence_id || !habitation_code || !floor || !capacity) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }
        const newHabitation = await db.Habitation.create({ residence_id, habitation_code, floor, capacity });
        res.status(201).json(newHabitation);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la habitación.', error: error.message });
    }
};

exports.deleteHabitation = async (req, res) => {
    try {
        const { id } = req.params;
        const habitation = await db.Habitation.findByPk(id);
        if (!habitation) return res.status(404).json({ message: 'Habitación no encontrada.' });
        if (habitation.status === 'occupied') {
            return res.status(400).json({ message: 'No se puede borrar una habitación ocupada.' });
        }
        await habitation.destroy();
        res.status(200).json({ message: 'Habitación borrada con éxito.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al borrar la habitación.', error: error.message });
    }
};

// --- ¡NUEVA FUNCIÓN! ---
exports.getDashboardStats = async (req, res) => {
    try {
        const pendingApplications = await db.Application.count({
            where: { status: 'pending' }
        });

        const totalResidents = await db.StudentProfile.count({
            where: { user_id: { [Op.ne]: null } }
        });

        const availableHabitations = await db.Habitation.count({
            where: { status: 'available' }
        });

        const recentApplications = await db.Application.findAll({
            limit: 5,
            order: [['submission_date', 'DESC']],
            include: [{
                model: db.StudentProfile,
                attributes: ['first_name', 'last_name'],
                required: false
            }]
        });

        res.status(200).json({
            pendingApplications,
            totalResidents,
            availableHabitations,
            recentApplications
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las estadísticas del dashboard.', error: error.message });
    }
};

//Crear un nuevo anuncio
exports.createAnnouncement = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'El título y el contenido son requeridos.' });
        }
        const announcement = await db.Announcement.create({ title, content });
        res.status(201).json(announcement);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el anuncio.', error: error.message });
    }
};

// Obtener todos los anuncios (para el admin)
exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await db.Announcement.findAll({
            order: [['created_at', 'DESC']]
        });
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los anuncios.', error: error.message });
    }
};