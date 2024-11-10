import Lottie from 'lottie-react';
import loading from '@/assets/animations/loading.json';
export default function SplashLoading() {
  return (
    <div>
      <Lottie
        animationData={loading}
        loop={true}
        className="w-screen h-screen"
      />
    </div>
  );
}
