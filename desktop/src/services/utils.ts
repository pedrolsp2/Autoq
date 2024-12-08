import { format } from 'date-fns';

export const deafultItens = {
  CREATED_AT: format(new Date(), 'dd/MM/yyyy'),
  UPDATE_AT: format(new Date(), 'dd/MM/yyyy'),
  D_E_L_E_T: null,
};
