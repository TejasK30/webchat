import { Router } from "express"
import { fetchFriendsForUser, loginController, logoutController, registerController, validateUserController, updateUserController } from "../controllers/userController"
const router = Router()

router.post("/register", registerController) 
router.post("/login", loginController) 
router.get('/verify-user', validateUserController)
router.get('/fetchfriends/:userId', fetchFriendsForUser)
router.post('/logout', logoutController)
router.post('/update/:userId', updateUserController)  
export default router
