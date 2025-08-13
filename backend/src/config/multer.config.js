const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Asegurarse de que los directorios de subida existan
const profileImageDir = 'public/uploads/profile_images';
const documentsDir = 'public/uploads/documents';

fs.mkdirSync(profileImageDir, { recursive: true });
fs.mkdirSync(documentsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest;
    if (file.fieldname === 'profileImage') {
      dest = profileImageDir;
    } else {
      dest = documentsDir;
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Aceptar imágenes y PDFs
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no soportado. Solo se permiten imágenes y PDF.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Límite de 5MB por archivo
});

module.exports = upload;
