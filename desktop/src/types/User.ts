export interface UserType {
  SK_USUARIO: number;
  NM_USUARIO: string;
  EMAIL_USUARIO: string;
  DS_USUARIO: string;
  SENHA_USUARIO: string;
  CREATED_AT: string;
  UPDATE_AT: string;
  D_E_L_E_T: any;
  ds_politica?: string;
  POLITICA?: '1' | '2' | '3' | '4';
}
