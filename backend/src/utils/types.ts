import { Types } from "mongoose"


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

export interface MessageType {
  _id: string
  senderId: string
  sender: string
  receiver: string
  receiverId: string
  text: string
  timestamp: Date
}

export interface MessageResponse {
  _id: string
  messages: MessageType[]
}
