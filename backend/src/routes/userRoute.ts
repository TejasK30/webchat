import { checkUsernameController, registerController, loginController } from "../controllers/userController"
import { Router } from "express"
const router = Router()

router.post("/register", registerController) 
router.post("/login", loginController) 
router.post("/check-username", checkUsernameController) 

export default router