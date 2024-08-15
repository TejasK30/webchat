import { Router } from "express"
import { fetchFriendsForUser, loginController, registerController, validateUserController } from "../controllers/userController"
const router = Router()

router.post("/register", registerController) 
router.post("/login", loginController) 
// router.post("/check-username", checkUsernameController) 
router.get('/verify-user', validateUserController)
router.get('/fetchfriends/:userId', fetchFriendsForUser)

export default router