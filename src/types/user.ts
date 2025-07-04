export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  avatar?: string
}
