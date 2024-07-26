import { checkUsernameController, registerController, loginController, validateUserController } from "../controllers/userController"
import { Router } from "express"
const router = Router()

router.post("/register", registerController) 
router.post("/login", loginController) 
router.post("/check-username", checkUsernameController) 
router.get('/verify-user', validateUserController)

export default router