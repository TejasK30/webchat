import { fetchClickUsersDetails } from '../controllers/messageController'
import { Router } from 'express'

const router = Router()

router.get('/clicked-user/getMessages/:receiverId', fetchClickUsersDetails)

export default router