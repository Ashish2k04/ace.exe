import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'profileImg' || file.fieldname === 'thumbnail') {
            if (!file.mimetype.startsWith('image/')) {
                return cb(new Error('Only image files are allowed for profile image and thumbnail.'));
            }
        }

        if (file.fieldname === 'resume' && file.mimetype !== 'application/pdf') {
            return cb(new Error('Only PDF files are allowed for resume.'));
        }
        

        if (!['profileImg', 'resume', 'thumbnail'].includes(file.fieldname)) {
            return cb(new Error('Unexpected file field.'));
        }

        cb(null, true);
    }
});

export default upload;