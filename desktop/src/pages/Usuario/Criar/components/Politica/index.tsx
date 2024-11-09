import React from 'react';
import { SchemaType } from '../..';
import { ControllerRenderProps } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useStore } from '@/store';

interface PoliticaProps {
  field: ControllerRenderProps<SchemaType>;
}

const Politica: React.FC<PoliticaProps> = ({ field }) => {
  const { SK_POLITICA } = useStore.use.usuario();

  const enableInput = [1, 2, 4].includes(SK_POLITICA);

  if (!enableInput) return;
  return (
    <FormItem>
      <FormLabel>Tipo de privilégios</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Privilégios" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Admin</SelectItem>
            <SelectItem value="2">Gerente</SelectItem>
            <SelectItem value="3">Vendedor</SelectItem>
            <SelectItem value="4">Caixa</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default Politica;
