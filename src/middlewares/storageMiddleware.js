import multer from "multer"
import fs from "fs"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const user = req.currentUser
        console.log(user);
        
        if(!user) return
        if(!fs.existsSync('files/' + user.id)) {
            fs.mkdirSync('files/' + user.id)
        }
        cb(null,  'files/' + user.id)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname == "profilePicture" ? "profilePicture" + "." + file.mimetype.split("/")[1] : Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage })

export default upload