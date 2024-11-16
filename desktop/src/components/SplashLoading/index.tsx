import Lottie from 'lottie-react';
import loading from '@/assets/animations/loading.json';
import { cn } from '@/lib/utils';

export default function SplashLoading({ className }: { className?: string }) {
  return (
    <div>
      <Lottie
        animationData={loading}
        loop={true}
        className={cn('w-screen h-screen', className)}
      />
    </div>
  );
}
