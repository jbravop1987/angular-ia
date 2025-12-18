export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
}

export interface CreateUserDto {
  email: string;
  name: string;
  role: string;
  phone?: string;
  password?: string;
}

// ✅ Nuevo: Modelo para paginación
export interface PaginationMeta {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

// ✅ Nuevo: Respuesta de usuarios
export interface UsersResponse {
  success: boolean;
  message: string;
  data: {
    data: User[];
    meta: PaginationMeta;
  };
}