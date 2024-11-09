import { toast } from 'sonner';

export const copyText = (texto: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(texto)
      .then(() => {
        toast.success('Texto copiado para a área de transferência!');
      })
      .catch((err) => {
        console.error('Falha ao copiar o texto: ', err);
      });
  }
};

export const radomText = () => {
  const character =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  const size = 5;

  for (let i = 0; i < size; i++) {
    const index = Math.floor(Math.random() * character.length);
    password += character[index];
  }
  return password;
};
