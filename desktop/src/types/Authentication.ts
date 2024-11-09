export interface Token {
  usuario: Usuario;
  token: string | null;
}

export interface Usuario {
  SK_USUARIO: number;
  NM_USUARIO: string;
  EMAIL_USUARIO: string;
  DS_USUARIO: string;
  POLITICA: string;
  SK_POLITICA: number;
}
