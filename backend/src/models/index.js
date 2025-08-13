const sequelize = require('../config/sequelize');
const User = require('./user.model');
const StudentProfile = require('./studentProfile.model');
const Guardian = require('./guardian.model');
const Application = require('./application.model');
const EntryDocument = require('./entryDocument.model');
const Residence = require('./residence.model');
const Habitation = require('./habitation.model');
const Faculty = require('./faculty.model');
const Major = require('./major.model');
const AcademicLevel = require('./academicLevel.model');
const Announcement = require('./announcement.model');

const db = {};

db.sequelize = sequelize;

// Definición de modelos
db.User = User;
db.StudentProfile = StudentProfile;
db.Guardian = Guardian;
db.Application = Application;
db.EntryDocument = EntryDocument;
db.Residence = Residence;
db.Habitation = Habitation;
db.Faculty = Faculty;
db.Major = Major;
db.AcademicLevel = AcademicLevel;
db.Announcement = Announcement;

// --- Definición de Relaciones ---

// User <-> StudentProfile (One-to-One, opcional)
db.User.hasOne(db.StudentProfile, { foreignKey: 'user_id' });
db.StudentProfile.belongsTo(db.User, { foreignKey: 'user_id' });

// StudentProfile <-> Guardian (One-to-Many)
db.StudentProfile.hasMany(db.Guardian, { foreignKey: 'student_profile_id', as: 'guardians' });
db.Guardian.belongsTo(db.StudentProfile, { foreignKey: 'student_profile_id' });

// StudentProfile <-> Application (One-to-One)
db.StudentProfile.hasOne(db.Application, { foreignKey: 'student_profile_id' });
db.Application.belongsTo(db.StudentProfile, { foreignKey: 'student_profile_id' });

// Application <-> EntryDocument (One-to-One)
db.Application.hasOne(db.EntryDocument, { foreignKey: 'application_id' });
db.EntryDocument.belongsTo(db.Application, { foreignKey: 'application_id' });

// Residence <-> Habitation (One-to-Many)
db.Residence.hasMany(db.Habitation, { foreignKey: 'residence_id' });
db.Habitation.belongsTo(db.Residence, { foreignKey: 'residence_id' });

// Application <-> Habitation (Many-to-One, para asignación)
db.Habitation.hasMany(db.Application, { foreignKey: 'assigned_habitation_id' });
db.Application.belongsTo(db.Habitation, { foreignKey: 'assigned_habitation_id' });

// Faculty <-> Major (One-to-Many)
db.Faculty.hasMany(db.Major, { foreignKey: 'faculty_id' });
db.Major.belongsTo(db.Faculty, { foreignKey: 'faculty_id' });

// Relaciones con StudentProfile para las opciones
db.Faculty.hasMany(db.StudentProfile, { foreignKey: 'faculty_id' });
db.StudentProfile.belongsTo(db.Faculty, { foreignKey: 'faculty_id' });

db.Major.hasMany(db.StudentProfile, { foreignKey: 'major_id' });
db.StudentProfile.belongsTo(db.Major, { foreignKey: 'major_id' });

db.AcademicLevel.hasMany(db.StudentProfile, { foreignKey: 'academic_level_id' });
db.StudentProfile.belongsTo(db.AcademicLevel, { foreignKey: 'academic_level_id' });


module.exports = db;

