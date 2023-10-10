import multer from 'multer';

export const docMiddleware = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/docs');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
})

