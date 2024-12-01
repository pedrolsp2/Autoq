import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader, Trash } from 'lucide-react';
import { useStore } from '@/store';
import { usePolicy } from '@/utils/Politica/politica';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { deletePecas } from '@/api/business/pecas';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { PecasType } from '@/types/Pecas';

interface ApagarProps extends PecasType {
  refetch: () => void;
}

const Apagar: React.FC<ApagarProps> = ({
  SK_PECAS,
  D_E_L_E_T,
  NM_PECAS,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const { SK_POLITICA } = useStore.use.usuario();

  const disabled = !usePolicy(SK_POLITICA) || D_E_L_E_T;

  const { mutate, isPending } = useMutation({
    mutationFn: deletePecas,
    onSuccess(data) {
      toast(data.message, {
        style: { background: '#16a34a', color: '#fff' },
      });
      setOpen(false);
      refetch();
    },

    onError(error: AxiosError<{ message: string }>) {
      toast(error.response?.data?.message, {
        style: { background: '#ca3333', color: '#fff' },
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(disabled ? 'text-red-200' : 'text-red-500')}
        disabled={disabled}
      >
        <Trash size={18} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja mesmo desativar essa peça?</DialogTitle>
          <DialogDescription>
            Ao confirmar, a peças {NM_PECAS} ficará inativa.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button onClick={() => mutate(SK_PECAS)} className="w-24">
            {isPending ? <Loader className="animate-spin" /> : 'Apagar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Apagar;
