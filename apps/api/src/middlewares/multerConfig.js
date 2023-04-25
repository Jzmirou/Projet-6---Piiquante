import multer from "multer"

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/png": "png",
    "image/webp": "webp",

}
/**
 * Prise en charge de l'upload de fichier image
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        const extension = MIME_TYPES[file.mimetype]
        const name = file.originalname.replace(`.${extension}`, '').split(' ').join('_')
        cb(null, `${name}_${Date.now()}.${extension}`)
    }
})
export const multerConfig = multer({storage: storage}).single("image")