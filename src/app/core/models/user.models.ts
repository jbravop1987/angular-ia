export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  avatar?: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
}
