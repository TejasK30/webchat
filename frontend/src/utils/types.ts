export type RegisterFormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface props {
  children: React.ReactNode
}

export interface userInfo {
  userId: string
  username: string
  email: string
}

export type User = {
  _id: string
  username: string
  email: string
}

export interface FriendDetails {
  _id: string
  username: string
  email: string
}

export interface Friend {
  _id: string
  userId: string
  friends: FriendDetails[]
  createdAt: string
  updatedAt: string
}

export interface FriendsResponse {
  friends: Friend[]
}


export interface MessageType {
  _id?: string
  senderId: string
  sender: string
  receiver: string
  receiverId: string
  text: string
  timestamp: Date
}

export interface MessageResponse {
  _id: string
  dateToFormat: Date
  messages: MessageType[]
}

export interface updateUserType {
  username: string
  email: string
  password: string
}
