const db = require('../models');

exports.getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const studentProfile = await db.StudentProfile.findOne({
            where: { user_id: userId },
            include: [
                { model: db.User, attributes: ['email', 'is_active', 'created_at'], required: false },
                { model: db.Guardian, as: 'guardians', required: false },
                { model: db.Faculty, attributes: ['name'], required: false },
                { model: db.Major, attributes: ['name'], required: false },
                { model: db.AcademicLevel, attributes: ['level_name'], required: false },
                { 
                    model: db.Application,
                    required: false,
                    include: [{
                        model: db.Habitation,
                        required: false,
                        include: [{
                            model: db.Residence,
                            required: false
                        }]
                    }] 
                }
            ]
        });

        if (!studentProfile) {
            return res.status(404).json({ message: 'Perfil de estudiante no encontrado.' });
        }

        res.status(200).json(studentProfile);

    } catch (error) {
        console.error("Error en getMyProfile:", error); // Añadimos un log para ver errores en el servidor
        res.status(500).json({ message: 'Error al obtener el perfil.', error: error.message });
    }
};

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
