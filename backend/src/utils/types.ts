import { Types } from "mongoose"

export interface MessageType {
  senderId: string
  sender: string
  receiver: string
  receiverId: string
  text: string
}

export interface FriendDetails {
  _id: Types.ObjectId
  username: string
  email: string
}

export interface FriendsResponse {
  userId: Types.ObjectId
  friends: FriendDetails[]
  createdAt: Date
  updatedAt: Date
}
