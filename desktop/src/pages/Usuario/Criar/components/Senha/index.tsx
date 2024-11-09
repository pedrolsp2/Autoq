import React from 'react';
import { SchemaType } from '../..';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, FileDigit } from 'lucide-react';
import { toast } from 'sonner';
import { copyText, radomText } from './utils';

interface SenhaProps {
  field: ControllerRenderProps<SchemaType>;
  form: UseFormReturn<SchemaType>;
}

const Senha: React.FC<SenhaProps> = ({ field, form }) => {
  const randomPassword = async () => {
    const password = radomText();

    toast.success(
      <div className="flex items-center justify-between w-full">
        <span> Senha gerada: {password}</span>
        <button
          className="p-2 rounded hover:bg-neutral-100"
          title="Copiar"
          onClick={() => copyText(password)}
        >
          <Copy size={18} />
        </button>
      </div>
    );
    form.setValue('SENHA_USUARIO', password);
  };

  return (
    <div className="flex items-end justify-start gap-2">
      <FormItem className="w-full">
        <FormLabel>Senha padrão do usuário</FormLabel>
        <FormControl>
          <Input type="password" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
      <Button
        type="button"
        variant="outline"
        title="Gerar senha aleatória"
        onClick={randomPassword}
      >
        <FileDigit />
      </Button>
    </div>
  );
};

export default Senha;
