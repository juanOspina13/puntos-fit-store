export interface LoginUser {
  username: string;
  password: string;
}

export interface UserProfile 
{
    id: number;
    username: string;
    username_canonical: string;
    email: string;
    email_canonical: string;
    enabled: boolean;
    password: string;
    last_login: string;
    groups: unknown[];
    nombre: string;
    telefono: string;
    direccion: string;
    player_id: string;
    genero: string;
    objetivo: string;
    fecha_nacimiento: string;
    como_llego: string;
    embajador: boolean;
    password_assigned: boolean;
    cedula: number;
    rolePermissions: unknown;
    userFeatures: unknown;
    expirationTime: number;
    timeRemaining: number;
    timerStarted: boolean;
    isLoggedIn: boolean;
    roles: string[];
    empresa: {
        enabled: boolean;
        id: number;
        nombre: string;
        razon_social: string;
    };
    billetera_id:{
        id: number;
        classes: string;
    }
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
