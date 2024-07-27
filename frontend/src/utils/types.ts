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