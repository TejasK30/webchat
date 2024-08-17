import { Response, Request } from "express"
import { requestUserId, getFriendId } from "../utils/helpers"
import Friends from "../models/Friends"
import User from "../models/User"

export const addfriend = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["auth_token"]
    const senderId = await requestUserId(token)

    const { email } = req.body

    const friendId = await getFriendId(email)

    await Friends.updateOne(
      { userId: senderId },
      { $addToSet: { friends: friendId } },
      { $upsert: true }
    )

    await Friends.updateOne(
      { userId: friendId },
      { $addToSet: { friends: senderId } },
      { $upsert: true }
    )

    return res.status(200).json({ messages: "Friend added !" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" })
  }
}

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["auth_token"]
    const senderId = await requestUserId(token)
    const { email } = req.body
    const friendId = await getFriendId(email)

    await Friends.deleteOne(
      { userId: senderId },
      { $pull : { Friends: friendId } }
    )

    await Friends.deleteOne(
      { userId: friendId },
      { $pull : { Friends: senderId } }
    )

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" })
  }
}
