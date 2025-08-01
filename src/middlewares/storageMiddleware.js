import multer from "multer"
import fs from "fs"
import { PROFILE_PICTURE_KEY } from "../utils/constants.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const user = req.currentUser
        // console.log(user);

        if (!user) return
        if(!fs.existsSync('files')) fs.mkdirSync('files')
        if (!fs.existsSync('files/' + user.id)) {
            fs.mkdirSync('files/' + user.id)
        }
        cb(null, 'files/' + user.id)
    },
    filename: function (req, file, cb) {
        console.log(file);
        const userId = file.userId;
        if(userId && !fs.existsSync('files/' + userId)) fs.mkdirSync('files/' + userId)
        const isProfilePicture = file.fieldname == PROFILE_PICTURE_KEY;
        const user = req.currentUser;

        if (isProfilePicture && user) {
            const dirPath = 'files/' + user.id;
            const ext = file.mimetype.split("/")[1];
            

            // Delete old profile picture if it exists
            const files = fs.readdirSync(dirPath);
            for (const f of files) {
                if (f.startsWith(PROFILE_PICTURE_KEY)) {
                    fs.unlinkSync(`${dirPath}/${f}`);
                }
            }
        }

        cb(null, isProfilePicture ? `${PROFILE_PICTURE_KEY}.${file.mimetype.split("/")[1]}` : file.originalname);
    }

})
const upload = multer({ storage: storage })

export default upload