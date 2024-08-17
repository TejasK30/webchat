import { Response, Request } from 'express'
import { requestUserId } from "utils/helpers"
import Friends from '../models/Friends'
import User from '../models/User'

export const addfriend = async(req: Request, res: Response) => {
  const token = req.cookies["auth_token"]
  const senderId = await requestUserId(token)

  const { email } = req.body

  const friend = await User.findOne({email: email})

  if(!friend){
    return res.status(400).json({message: "User does not exists"})
  }

  const friendId = friend._id
  
  await Friends.updateOne(
    {userId: senderId},
    {$addToSet: { friends: friendId }},
    {$upsert: true}
  )

  await Friends.updateOne(
    {userId: friendId},
    {$addToSet: { friends: senderId }},
    {$upsert: true}
  )

}