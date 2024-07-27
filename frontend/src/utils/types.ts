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

export interface MessageTypes {
  text: string
  sender: string
  receiver: string
  timestamp: Date
}

export interface userInfo{
  userId: string
  username: string
  email: string
}
