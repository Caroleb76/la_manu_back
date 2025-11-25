import multer from "multer"
import fs from "fs"
import { PROFILE_PICTURE_KEY } from "../utils/constants.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const user = req.currentUser
        const { extraCostId, interventionId } = req.body;
        const isIntervention = interventionId && extraCostId; // here I am checking if the user is uploading a file for an intervention
     

        if (!user) return // if the user is not authenticated then return
        if (!fs.existsSync('files')) fs.mkdirSync('files') // if the files directory does not exist then create it
        if (!fs.existsSync('files/' + user.id)) fs.mkdirSync('files/' + user.id)  // if the user directory does not exist then create it

        if (isIntervention && user) {

            const dirPath = 'files/' + user.id + '/interventions/' + interventionId + '/' + extraCostId; // here I am creating a directory for the extraCost (frais) of the intervention
            if (fs.existsSync(dirPath)) {
                fs.rmSync(dirPath, { recursive: true, force: true }); // if the directory already exists then delete it because it is only allowed one file per frais/extraCost
            }
         
            fs.mkdirSync(dirPath, { recursive: true });
            cb(null, dirPath)
        } else {

            cb(null, 'files/' + user.id)
        }
    },
    filename: function (req, file, cb) {
      
        const { extraCostId, interventionId } = req.body;
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