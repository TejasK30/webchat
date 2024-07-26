import { checkUsernameController, registerController } from "../controllers/user"
import { Router } from "express"
const router = Router()

router.post("/register", registerController) 
router.post("/check-username", checkUsernameController) 

export default router